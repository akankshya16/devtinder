
const jwt= require("jsonwebtoken")
const User= require("../modules/users")
const userModel = require("../modules/users")
const { error } = require("console")


const userauth= async (req,res,next)=>{
 try{const {token} = req.cookies
 if(!token){
    res.send("token is not valid")
 }
 const decodeobj= await Jwt.verify(token,"dEVTINDER77")

const {_id}= decodeobj

const user= await userModel.findById(_id)
if(!user){
    throw new error("user not found")

}
else 
{
    res.user=user
    next()
}
 }catch(err){console.log(err)}
}


module.exports={userauth}