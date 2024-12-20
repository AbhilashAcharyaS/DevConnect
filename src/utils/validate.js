const validator = require("validator");

const validateSignupData= (req)=>{
    const {firstName,lastName, email, password}= req.body;
    if(firstName.length<4 || firstName.length>50){
        throw new Error("Name not valid");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email invalid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
}

const validateEditProfileData = (req)=>{
    const AllowedEditFields=["firstName","lastName","photoUrl","age","gender","about","skills"];
    const isEditAllowed = Object.keys(req.body).every(field=>AllowedEditFields.includes(field));
    return isEditAllowed;
}

const validateNewPassword =(password)=>{
    const isValid = validator.isStrongPassword(password);
    return isValid;
}

module.exports= {validateSignupData , validateEditProfileData , validateNewPassword};