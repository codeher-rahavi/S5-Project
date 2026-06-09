const express=require("express");
const router=express.Router();

const User=require("../models/User");

const {
    generateToken
}=require("../utils/authUtils");




// CHECK EMAIL

router.post(
"/check-email",
async(req,res)=>{


try{


const email=req.body.email
.trim()
.toLowerCase();



const user=await User.findOne({
    email
});



if(user){

return res.status(409).json({

success:false,

message:"Email already taken"

});


}



return res.status(200).json({

success:true,

message:"Email available"

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



});









// SIGNUP


router.post(
"/signup",
async(req,res)=>{


try{


const {

email,

password

}=req.body;



if(!email || !password){


return res.status(400).json({

message:"Email and password required"

});


}



const cleanEmail=email
.trim()
.toLowerCase();





const existingUser =
await User.findOne({
email:cleanEmail
});




if(existingUser){


return res.status(409).json({

message:"User already exists"

});


}






const username =
cleanEmail.split("@")[0];






const user =
await User.create({


name:username,

email:cleanEmail,

password


});







const token =
generateToken(user._id);






return res.status(201).json({

success:true,

token,


user:{


id:user._id,

name:user.name,

email:user.email,

role:user.role


}



});




}catch(error){


console.log(
"Signup Error:",
error
);



return res.status(500).json({

success:false,

message:"Signup failed",

error:error.message


});


}



});









// LOGIN


router.post(
"/login",
async(req,res)=>{


try{


const {

email,

password

}=req.body;



const user =
await User.findOne({

email:email
.trim()
.toLowerCase()

});




if(!user){


return res.status(401).json({

message:"Invalid credentials"

});


}





const match =
await user.matchPassword(password);





if(!match){


return res.status(401).json({

message:"Invalid credentials"

});


}






const token =
generateToken(user._id);





res.json({

success:true,

token,


user:{

id:user._id,

name:user.name,

email:user.email,

role:user.role

}


});





}catch(error){


res.status(500).json({

message:error.message

});


}


});





module.exports=router;