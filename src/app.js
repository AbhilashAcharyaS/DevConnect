const express = require("express");
const app = express();

app.use("/",(req,res)=>{
    res.send("Hello from home page");
});

app.use("/test",(req,res)=>{
    res.send("Test page")
});

app.use("/browse",(req,res)=>{
    res.send("Browse page");
});

app.listen(3000, ()=>console.log("Server Started"))