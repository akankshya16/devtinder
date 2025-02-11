

const { connect } = require("http2")
const mongoose =require("mongoose")


const conectdb= async  ()=>{await mongoose.connect("mongodb+srv://akankshyan4:ngZpN6ztmko6Zmau@cluster0.7gzmg.mongodb.net/Devtinder_dev")}


const user= "akankshyan4"
const pass= "ngZpN6ztmko6Zmau"

 

    //conectdb().then(()=>{console.log("conneted")}).catch((err)=>{console.log("error in connecting")})
   

module.exports={conectdb}