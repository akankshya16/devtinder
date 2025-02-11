const exress=require("express")
const authrouter=express.Router()
const userModel= require("../modules/users")
const bcrypt= require("bcrypt")


authrouter.post("/signup",async (req,res)=>{
    const newuser=new userModel(req.body)
    const pass= req.body.password 
    const passwordhash= await bcrypt.hash(pass,10)

    newuser.password = passwordhash;

    await newuser.save();
res.status(200).send("succeesfully saved user")



})





authrouter.post("/login",async (res,req)=>{
    try{
        const{emailId,password}=req.body

        const user= await userModel.findOne(req.body.emailId)
        if(user==null){
            res.send("u are not an user")
        }
        const ispassword= await bcrypt.compare(req.body.password,user.password)
        if(ispassword){
            const token = await user.getJWT()
            console.log(token)
            res.cookie(token)
            res.send ("login successful")

        }else{
            res.send ("incorrect passsword")
        }

    }catch(err){
        res.send(err)
        }
        
})




authrouter.post("/logout", async(req,res)=>{
    res.cookie("token",null,{
        expired:new Date(Date.now())
    })

    res.send (" logout successfull ")
})

module.exports=authrouter