const express= require("express")
const profilerouter=express.Router()
const { userauth } = require("./middlewares/auth");

profilerouter.get("/profile/view",userauth,async(req,res)=>{
    const user= req.user
    res.send(user)
})



profilerouter.patch("/profile/edit", userauth, async(req,res)=>{

    await validateeditfields(req)

    if (validateeditfields)
        { const user = req.user
           user.firstName=req.body.firstName
            user.lastName=req.body.lastName
            user.emailId=req.body.emailId
            user.gender=req.body.gender
            user.skills= req.body.skills
            user.password=req.body.password
            await user.save();

    res.status(201).send("upadted")
    }
    else{
        res.status(400).send("send correct payload")
    }
})






 const validateeditfields= (req)=>{
    const allowedfields=["firstName","lastName","emailId","photoUrl","gender","about","skills"]
   const isallowed= object.keys(req.body).every(e=>allowedfields.includes(e))

   return isallowed
 }
 







module.exports=profilerouter