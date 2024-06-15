const userModel = require("../model/userModel");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const registerController = async (req, res) => {
  try {
    const { fullName, phoneNo, answer, email, password } = req.body;
    //validations
    if (!fullName) {
      return res.send({ error: "Full Name is Required" });
    }

    if (!phoneNo) {
      return res.send({ error: "Phone No is Required" });
    }

    if (!answer) {
      return res.send({ error: "Answer is Required" });
    }

    if (!email) {
      return res.send({ error: "Email is Required" });
    }

    if (!password) {
      return res.send({ error: "Password is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      fullName,
      phoneNo,
      answer,
      email,
      password: hashedPassword,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        phoneNo: user.phoneNo,
        answer: user.answer,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

const forgotPasswordController = async (req, res) => {
  try {
    const { answer, email, password } = req.body;
    if (!email) {
      res.status(400).send({ message: "email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Father Name  is required" });
    }
    if (!password) {
      res.status(400).send({ message: "New Password is required" });
    }

    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    const F_name = answer;
    if (F_name !== answer) {
      return res.status(404).send({
        success: false,
        message: "Father Name is not same ",
      });
    }
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or FatherName",
      });
    }
    const hashed = await hashPassword(password);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
//get all users
const getAllUser = async (req, res) => {
  try {
    const user = await userModel
      .find({})
      .populate("fullName")
      .select("-timestamps")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: user.length,
      message: " Get all User Details successfull",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting All User",
      error: error.message,
    });
  }
};


// get single user
const getSingleuser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Decrypt the password (replace this with your decryption logic)
    const decryptedPassword = user.password;

    res.status(200).json({
      success: true,
      message: "Get user data successfully",
      user: {
        ...user._doc,
        password: decryptedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get user data",
      error: error.message,
    });
  }
};

const updateRegisterController = async (req, res) => {
  try {
    const { fullName, phoneNo, answer, email, password } = req.body;
    const userId = req.params.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Password validation
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password is required and must be at least 6 characters long",
      });
    }

    // Validate and hash the password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Handle profile picture update
    let newProfileImage = null;

    if (req.file) {
      newProfileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Update user data
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      {
        fullName: fullName || user.fullName,
        phoneNo: phoneNo || user.phoneNo,
        answer: answer || user.answer,
        email: email || user.email,
        password: hashedPassword || user.password,
        authImage: newProfileImage || user.authImage,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(500).json({
        success: false,
        message: "Error in updating user",
      });
    }

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating user",
      error,
    });
  }
};

// get photo
const userPhotoController = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.pid)
      .select("authImage");
    if (user.authImage.data) {
      res.set("Content-type", user.authImage.contentType);
      return res.status(201).send(user.authImage.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

module.exports = {
  getAllUser,
  loginController,
  registerController,
  forgotPasswordController,
  testController,
  getSingleuser,
  updateRegisterController,
  userPhotoController
  // userProfileController,
  // getUserProfileController,
  // deleteUserProfileController,
};
// const userProfileController = async (req, res) => {
//   try {
//     const user = await userModel.create({authImage:req.file.filename})

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Save the updated user
//     await user.save();

//     res.status(200).send({
//       success: true,
//       message: "User profile updated successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in updating user profile",
//     });
//   }
// };

// const getUserProfileController = async (req, res) => {
//   try {
//     const userId = req.params.id; // Extract user ID from URL parameters

//     // Check if the user exists
//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).send({
//       success: true,
//       message: "User profile retrieved successfully",
//       user: {
//         _id: user._id,
//         fullName: user.fullName,
//         phoneNo: user.phoneNo,
//         answer: user.answer,
//         email: user.email,
//         role: user.role,
//         authImage: user.authImage,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in retrieving user profile",
//     });
//   }
// };

// const deleteUserProfileController = async (req, res) => {
//   try {
//     const userId = req.params.id; // Extract user ID from URL parameters

//     // Check if the user exists
//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Delete user profile image
//     user.authImage = undefined;

//     // Save the user without the profile image
//     await user.save();

//     res.status(200).send({
//       success: true,
//       message: "User profile image deleted successfully",
//       user: {
//         _id: user._id,
//         fullName: user.fullName,
//         phoneNo: user.phoneNo,
//         answer: user.answer,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in deleting user profile image",
//     });
//   }
// };
////////////////////////////////////////////////////////
