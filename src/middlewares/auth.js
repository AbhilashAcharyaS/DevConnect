const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtKey= process.env.JWTSECRET;

const userAuth = async (req, res, next) => {
  try {
    //read token
    const { tokenJwt } = req.cookies;
    if (!tokenJwt){
      return res.status(401).send("Please Login!")
    }

    //validate token
    const decodedData = await jwt.verify(tokenJwt, process.env.JWT_SECRET);
    const { _id } = decodedData;

    //find user
    const loggedInUser = await User.findById(_id);
    if (!loggedInUser) throw new Error("User doesnot exist!");
    req.user = loggedInUser;
    next();
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

module.exports = userAuth;
