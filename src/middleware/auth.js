const jwt=require("jsonwebtoken")
const User=require("../modals/user")
const auth=async(req,res,next)=>{
    try{
       const token=req.header("token")
       let decoded= jwt.verify(token,"mySecretKey")
       if(decoded){
           let user=await User.findOne({_id:decoded._id,"token.token":token})
           if(user){
               req.user=user;
               next();
           }
           else res.send({error:true,message:"User not found"})
       }else res.send({error:true,message:"token expired"})
    }
     catch(error){
        res.send({error:true,message:"you dont deserve!"})
    }
}



module.exports=auth