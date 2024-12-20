const express = require("express");
const requestRouter= express.Router();
const userAuth = require("../middlewares/auth")

requestRouter.post("/sendReq",userAuth , async (req,res)=>{
    try {
        res.send("Req sent!")
    } catch (error) {
        res.status(400).send("error sending request! :" + error.message)
    }
})

module.exports = requestRouter;