const express = require("express");
const connectDB= require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req,res)=>{

    // console.log(req.body);
    
    const user= new User(req.body)

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


