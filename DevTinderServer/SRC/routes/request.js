
const express = require("express")
const { userauth } = require("../middlewares/auth")
//const userModel = require("../modues/users")
const profilerouter= express.Router()
const ConnectionRequestModel = require("../modules/connectionRequest")





profilerouter.post("/request/send/interested/:toUserId", userauth, async(req,res)=>{
    
    const fromUserId= req.user._id

const toUserId= req.params.toUserId
const status= "interested"
//read more about this what is this why use doller
const existing = await ConnectionRequestModel.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });
  
if (existing || fromUserId===toUserId){
    res.send("u cant sent the request, it already exist")
}

const ConnectionRequest=new ConnectionRequestModel({
    fromUserId,
    toUserId,
    status
})

await ConnectionRequest.save()

res.json({
    message:"connection sent",
    data: ConnectionRequest

})
    console.log("send a connection request")

    res.send (user.firstName +"sent the connection request")
})



profilerouter.post("/request/review/Reject/:connectionId", userauth, async(req,res)=>{
    

    const loginuser= req.user

    const connectionid= req.params.connectionId
   
     const connectionrequest= await ConnectionRequestModel.find({
        toUserId:loginuser._id,
        status:"Interested",

     }).populate("fromUserId",["firstName","lastName"])
     
     if (loginuser._id===connectionrequest.toUserId && connectionrequest.status=="Interested")
     connectionrequest.status="Accepted"
   
})




mpdule.exports= profilerouter