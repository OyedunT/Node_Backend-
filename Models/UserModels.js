const mongoose = require("mongoose");
const { isValidEmail } = require("validator");

const Userschema = new mongoose.Schema({
  FullName: { type: String, require: [true, "FullName is Required"] },
  Email: {
    type: String,
    require: [true, "Email is Required"],
    unqiue: [true, "Email already in use"]
  },
  Password: {
    type: String,
    require: true,
    minlength: [6, "Password must not be less than 6 characters"],
  },
},{ timestamps: true });

let userModel = mongoose.model("UserModel", Userschema);

module.exports = userModel;
