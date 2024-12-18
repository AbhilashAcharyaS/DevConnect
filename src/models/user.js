const mongoose = require("mongoose");
const validator= require("validator")

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
    validate(value){
        if(!validator.isEmail(value)) throw new Error("Invalid email"+value)
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
    validate(value){
        if(!validator.isStrongPassword(value)) throw new Error("Enter Strong password")
    }
  },

  photoUrl:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s",
    validate(value){
        if(!validator.isURL(value)) throw new Error("Invalid URL: "+value)
    }
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
