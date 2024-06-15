const MessageModel = require("../model/Messagemodel.js");
const MessagesController = async (req, res) => {
  try {
    // Retrieve the cart item details from the request body
    const {
        userId,
        name,
        email,
        phoneNo,
        message,
    } = req.body;

    if (!userId) {
      return res.send({ error: "userId  is Required" });
    }

    if (!name) {
      return res.send({ error: "Name  is Required" });
    }

    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!phoneNo) {
      return res.send({ error: "Phone No is Required" });
    }


    // Create a new cart item
    const messages = new MessageModel({
        userId,
        name,
        email,
        phoneNo,
        message,
    });

    // Save the cart item to your database (or handle the logic to add it to the cart)
    await messages.save();

    // Respond with a success message or the updated cart
    res.status(200).json({
      success: true,
      message: "Message sent successfuly",
      messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to sent message",
      error: error.message,
    });
  }
};

const GetAllMessagesController  = async (req, res)=>{
    try{
      const userId = req.params.userId;
      const message = await MessageModel
      .find({userId})
      .populate("email")
      .select("-email")
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      counTotal: message.length,
      message: "gett all messages ",
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting messages",
      error: error.message,
    });
  }
  }
module.exports = {
    MessagesController,
    GetAllMessagesController
  };