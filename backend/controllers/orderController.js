const CheckOutModel = require("../model/orderModel");

//Create order
const CheckOutController = async (req, res) => {
  try {
    // Retrieve the cart item details from the request body
    const {
      userId,
      roleOfUser,
      email,
      subTotalprice,
      items,
      cardNumber,
      cardExpiryDate,
      cardCVV,
      Status
    } = req.body;

    if (!userId) {
      return res.send({ error: "userId  is Required" });
    }

    if (!email) {
      return res.send({ error: "email  is Required" });
    }

    if (!subTotalprice) {
      return res.send({ error: "subTotalprice is Required" });
    }

    if (!items) {
      return res.send({ error: "items is Required" });
    }

    if (!cardNumber) {
      return res.send({ error: "Card Number is Required" });
    }
    if (!cardExpiryDate) {
      return res.send({ error: "Card Expiry Date is Required" });
    }
    if (!cardCVV) {
      return res.send({ error: "Card CVV is Required" });
    }

    // Create a new cart item
    const Checkout = new CheckOutModel({
      roleOfUser,
      userId,
      email,
      subTotalprice,
      items,
      cardNumber,
      cardExpiryDate,
      cardCVV,
      Status
    });

    // Save the cart item to your database (or handle the logic to add it to the cart)
    await Checkout.save();

    // Respond with a success message or the updated cart
    res.status(201).json({
      success: true,
      message: "Payment Successfull",
      Checkout,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed Payment",
      error: error.message,
    });
  }
};
///////////////////////////
// get all orders
const GetAllOrders = async (req, res) => {
  try {
    const order = await CheckOutModel.find({})
      .populate("Status")
      .select("-Status")
      // .limit(16)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      counTorders: order.length,
      message: "ALlProducts ",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};
//////////////////////////
//////////////////////////
const UpdateStatusController = async (req, res) => {
  try {
    const { orderId, Status } = req.body;

    // Validate input parameters

    // Find the order by ID and update the status
    const updatedOrder = await CheckOutModel.findByIdAndUpdate(
      orderId,
      { $set: { Status } },
      { new: true }
    );

    // Respond with a success message or the updated order
    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};
///////////get all order by user id and update status///////////////
const GetAllProductbyUserId = async (req, res)=>{
  try{
    const userId = req.params.userId;
    const order = await CheckOutModel
    .find({userId})
     .populate("Status")
    .limit(12)
    .sort({ createdAt: -1 });
  res.status(201).send({
    success: true,
    counTotal: order.length,
    message: "Get ALL Orders  by User successfully",
    order,
  });
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error in getting ALL Orders  by User",
    error: error.message,
  });
}
}
module.exports = {
  CheckOutController,
  GetAllOrders,
  UpdateStatusController,
  GetAllProductbyUserId
};
