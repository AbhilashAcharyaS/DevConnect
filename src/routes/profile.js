const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt")
const userAuth = require("../middlewares/auth");
const {
  validateEditProfileData,
  validateNewPassword,
} = require("../utils/validate");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} is Edited Successfully!`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const newPassword = req.body.password;
    const isPasswordValid = validateNewPassword(newPassword);
    if (!isPasswordValid) throw new Error("Enter valid Password");
    const newPasswordHash = await bcrypt.hash(newPassword,10);
    loggedInUser["password"] = newPasswordHash;
    await loggedInUser.save();
    res.send("Password Changed Successfully")
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});


module.exports = profileRouter;
