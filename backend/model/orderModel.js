const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    cardCVV: {
      type: String,
      required: true,
    },
    cardExpiryDate: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      default: "Order Received",
    },
    email: {
      type: String,
      required: true,
    },
    items: [itemSchema], // Array of items
    subTotalprice: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    roleOfUser: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model for the order collection
 

module.exports = mongoose.model("Order", orderSchema);
