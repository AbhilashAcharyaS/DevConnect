const express = require("express");
const requestRouter= express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth , async (req,res)=>{
    try {
        const userName = req.user.firstName;
        const fromUserId= req.user._id;
        const toUserId= req.params.toUserId;
        const status = req.params.status;

        // if(fromUserId == toUserId){
        //     throw new Error("Cannot send request to self!");            
        // }
        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid status");            
        }

        const existingConnectionRequest= await ConnectionRequestModel.findOne({
            $or:[
             {fromUserId,toUserId},
             {fromUserId:toUserId, toUserId:fromUserId}
            ]                
        })

        if(existingConnectionRequest){
            throw new Error("Connection request already exists!");            
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error("User does not exist");
            
        }

        const ConnectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        })
        const data = await ConnectionRequest.save();
        res.json({
            message:`${userName}, your ${status} request sent to ${toUser.firstName}!`,
            data
        })
    } catch (error) {
        res.status(400).send("error sending request! :" + error.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res)=>{
    try {
        const loggedInUser= req.user;
        const{status,requestId} = req.params;
        const allowedStatus=["accepted","rejected"];
        
        if(!allowedStatus.includes(status)){
            throw new Error("Status not valid!");            
        }
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        });

        if(!connectionRequest){
            throw new Error("Connection request not found!");            
        }

        connectionRequest.status=status;

        const data = await connectionRequest.save();

        res.json({message:"Connection request "+ status,
            data
        })
        } catch (error) {
            res.status(400).send("error sending request! :" + error.message)
    }
})

module.exports = requestRouter;