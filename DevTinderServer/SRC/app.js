const express= require("express")
const userModel= require("./modules/users")
const app = express()
app.use(express.json());
const {conectdb}= require("./config/Database");
const { error } = require("console");
const bcrypt =require("bcrypt")
const cookieParser= require("cookie-parser")
const jwt = require("jsonwebtoken");
const { userauth } = require("./middlewares/auth");

const authrouter= require("./routes/auth")
const profilerouter= require("./routes/profile")
const requestRouter= require("./routes/request")



app.use("/",authrouter)

app.use("/",profilerouter)
app.use("/",requestRouter)





conectdb().then(()=>{console.log("conneted")
    app.listen(3000,()=>{console.log("server is listening")})
}


).catch((err)=>{console.log("error in connecting")})
   

//create user






//login api







//get all users 
app.get("/getallfeed", async (req,res)=>{
const user= await userModel.find({})
res.send(user)
})


// get by id 
app.post("/getfeedID", async (req,res)=>{
    const userid=  req.body.userId
    console.log(userid)
const user= await userModel.findById(userid)

    res.send(user)
    })










//edit api
app.post("/updated/:ID",async (req,res)=>{

try{
    const userid= req.params.ID
    if(userid!=null)
    {
        const user= await userModel.findById(userid)
     
        const requiredKeys = ['firstName', 'lastName', 'emailId', 'gender', 'skills', 'password'];

        const result = Object.keys(req.body).every(key => requiredKeys.includes(key));
        if(result!=null){
            user.firstName=req.body.firstName
            user.lastName=req.body.lastName
            user.emailId=req.body.emailId
            user.gender=req.body.gender
            user.skills= req.body.skills
            user.password=req.body.password
            await user.save();
res.status(201).send("upadted")
        }
    }else{
        res.send("please provide id")
    }

}catch(err){
    console.error("Error occurred: ", err);
    res.status(500).send(err)

}






})









    app.post("/update", async (req, res) => {
        const userId = req.body.userId; 
        console.log("UserId:", userId);
        console.log("Request Body:", req.body);
    
        if (userId) {
            try {
                // Find the user by userId
                const user = await userModel.findById(userId);
    
                // Check if the user exists
                if (!user) {
                    return res.status(404).send("User not found");
                }
    
                console.log("Fetched user from DB:", user);
    
                // Update user properties only if provided in the request body
                if (req.body.firstName) user.firstName = req.body.firstName;
                if (req.body.lastName) user.lastName = req.body.lastName; // Optional: update lastName
                if (req.body.emailId) user.emailId = req.body.emailId;
                if(req.body.gender) user.gender=req.body.gender
                if(req.body.skills) user.skills=req.body.skills
                if(req.body.skills.length>10)
                {
                    throw new error("skills cant be more than 10")
                }
                if (req.body.password) user.password = req.body.password.toString(); // Ensure password is a string
                { runValidators: true }
                console.log("User after changes:", user);
    
                // Save the updated user
                await user.save(); // This saves the modified user document to the DB
    
                console.log("Updated User:", user);
                return res.status(200).send("User updated successfully");
            } catch (error) {
                console.error("Error:", error);
                return res.status(500).send("Internal server error");
            }
        } else {
            console.log("UserId not provided");
            return res.status(400).send("UserId is required");
        }
    });
    