const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    authImage: {
      data: Buffer,
      contentType: String,
    },
    fullName: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
