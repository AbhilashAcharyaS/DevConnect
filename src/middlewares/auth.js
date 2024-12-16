const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked");
    const token = "ABC";
    const isAdminAuthorized= token==="ABC"

    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized")
    }
    else {
        next();
    }
}

module.exports={
    adminAuth
}