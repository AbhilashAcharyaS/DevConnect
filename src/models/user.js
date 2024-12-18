const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  age: {
    type: Number,
    min: 10,
    max:100
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data invalid!");
      }
    },
  },
  about: {
    type: String,
    default: "default about of the user",
  },
  skills:{
    type:[String]
  },
},{
    timestamps:true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
