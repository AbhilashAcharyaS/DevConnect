const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();
const SAFE_DATA=["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"];

userRouter.get("/user/requests/received", userAuth , async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate(
            "fromUserId", SAFE_DATA
        )
        res.json({
            message:"Data fetched Successfully",
            data:connectionRequests
        })
    } catch (error) {
        res.status(400).send("Error: " + error)
    }
})

userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try {
        const loggedInUser= req.user;

        const connections = await ConnectionRequest.find({
            $or:[ 
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"}
            ]            
        }).populate(
            "fromUserId", SAFE_DATA
        ).populate(
            "toUserId", SAFE_DATA
        )

        const data= connections.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            else return row.fromUserId;
        })
        res.json({
            message:`${loggedInUser.firstName}, your connections are: `,
            data: data
        })
    } catch (error) {
        res.status(400).send("Error: "+error.message)
    }
})

module.exports =  userRouter