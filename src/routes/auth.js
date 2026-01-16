const express = require("express");

const authRouter= express.Router();

const {validateSignupData} = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");


authRouter.post("/signup", async (req, res) => {
    try {
      //validate user data
      validateSignupData(req);
  
      //encrypt password
      const { firstName, lastName, email, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      // console.log(passwordHash);
  
      const user = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
      });
      await user.save();
      
      //save cookie after successful login
      const token = await user.getJWT();
      res.cookie("tokenJwt", token , {expires: new Date(Date.now()+ 8 * 3600000)});

      res.send(user);

    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  });
  
  authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const isPasswordValid = await user.validatePassword(password)
      if (isPasswordValid) {
        const token = await user.getJWT();
        res.cookie("tokenJwt", token , {expires: new Date(Date.now()+ 8 * 3600000), secure:true, sameSite:"none"});
        res.send(user);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      res.status(400).send("Error Logging in: " + error.message);
    }
  });

  authRouter.post("/logout", (req,res)=>{
    res.cookie("tokenJwt", null,{expires: new Date(Date.now())});
    res.send("Logged Out!")
  })

  module.exports = authRouter;