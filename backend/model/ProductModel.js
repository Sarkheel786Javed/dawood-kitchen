const mongoose = require("mongoose");
const Category = require("./ProductCategoryModel");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDiscount: {
      type: Number,
    },
    productCategory: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    productSize: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },

    productImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
