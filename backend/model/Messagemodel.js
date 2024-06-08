const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  phoneNo:{
    type:String,
    required:true,
  },
  message:{
    type:String,
    required:true,
  },
 


},{ timestamps: true });


module.exports = mongoose.model("messages", messageSchema);
