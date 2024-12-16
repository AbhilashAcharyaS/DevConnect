const express = require("express");
const app = express();

const {adminAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth)

app.get("/admin/data",(req,res, next)=>{
    res.send("Admin data sent");
    // console.log("user called but sent no response");
});



app.listen(3000, ()=>console.log("Server Started"))