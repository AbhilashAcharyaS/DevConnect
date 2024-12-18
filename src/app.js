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
        res.status(400).send("Error saving user :"+ error.message)
    }

})

app.get("/user", async (req,res)=>{
    try {
       const users= await User.find({email:req.body.email});
       if(users.length) res.send(users);
        else res.status(404).send("User not found!")
    } catch (error) {
        res.status(400).send("wrong!")
    }
})

app.patch("/user", async (req,res)=>{
    const userId= req.body.userId;
    const data= req.body;
    try {
       await User.findByIdAndUpdate({_id:userId},data,{
        returnDocument:"after",
        runValidators: true
       });
       res.send("Updated successfully");
    } catch (error) {
        res.status(400).send("Update failed! :" + error.message)
    }
})

app.delete("/user", async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.body.userId);  
        res.send("User deleted!")      
    } catch (error) {
        res.status(400).send("wrong!")        
    }
})
app.get("/feed", async (req,res)=>{
    try {
       const users= await User.find({});
       if(users.length) res.send(users);
        else res.status(404).send("User not found!")
    } catch (error) {
        res.status(400).send("wrong!")
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


