const express = require("express");
const app = express();

const {adminAuth} = require("./middlewares/auth");

// app.use("/admin", adminAuth)

app.get("/admin/data",(req,res, next)=>{

    // try {
        throw new Error("Abhjsjd");
        // res.send("Admin data sent");
        // console.log("user called but sent no response");        
    // } catch (error) {
    //     console.log("Error occured!");
    //     res.status(500).send("Something went wrong by catch block!");        
    // }
});

app.use("/", (err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong!");
    }
})


app.listen(3000, ()=>console.log("Server Started"))