const express= require("express")
const { userauth } = require("../middlewares/auth")
const userRouter= express.Router()
const ConnectionRequestModel= require("../modules/connectionRequest")





userRouter.get("/user/requests",userauth,async(req,res)=>{

    try{
        const loggedinuser=req.user

        const connectionrequest= await ConnectionRequestModel.find({
            toUserId: loggedinuser._id
            
        })

    }
    catch(err){
        req.statusCode(400).send("en error occured"+err)
    }
})





module.exports = userRouter
