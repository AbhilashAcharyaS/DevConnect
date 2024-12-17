const express = require("express");
const connectDB= require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req,res)=>{
    const user= new User({
        firstName:"KL",
        lastName:"Rahul",
        email:"kl@rahul.com",
        password:"klrahul",
        age:32,
        gender:"Male"
    })

    try {
        await user.save();
        res.send("User added successfully!");        
    } catch (error) {
        res.status(400).send("Error saving user :"+ err.message)
    }

})

connectDB()
.then(()=>{
    console.log("DB connected successfully");
    app.listen(3000, ()=>console.log("Server Started"))
})
.catch((err)=>console.log("Error while connecting to DB-",err))

// app.use("/", (err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something went wrong!");
//     }
// })


