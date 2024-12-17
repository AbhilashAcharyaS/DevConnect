const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://itsmeabhilash73:ZP3Ax4eI9qLApub0@user.vz4ll.mongodb.net/devConnect")
}

module.exports= connectDB;

