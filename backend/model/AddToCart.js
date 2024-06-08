const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
  },
  productId:{
    type:String,
    required:true,
  },
  productName:{
    type:String,
    required:true,
  },
  productCategory:{
    type:String,
    required:true,
  },
  productDescription:{
    type:String,
    required:true,
  },
  productDiscount:{
    type:String,
    required:true,
  },
  productPrice:{
    type:String,
    required:true,
  },
  productQuantity:{
    type:String,
    required:true,
  },
  size:{
    type:String,
    required:true,
  },
  quantities:{
    type:Number,
    required:true,
  },
  productImage: {
    data: Buffer,
    contentType: String,
  },
  

},{ timestamps: true });


module.exports = mongoose.model("CartItem", cartItemSchema);
