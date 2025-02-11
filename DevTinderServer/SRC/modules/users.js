const { error } = require("console")
const mongoose= require("mongoose")
const { type } = require("os")
const { Unique } = require("typeorm")
const jwt= require("jsonwebtoken")
const userschema= new  mongoose.Schema(
    {
    firstName:{type:String,required:true,minlength:3},
    lastName: {type:String},
    emailId: {type:String,required :true,unique:true, lowercase:true,trim :true},
    password:{type:String},
    age:{type:Number,min:18} ,
    gender: {type:String,validate(value){
        if(!["male","female","others"].includes(value)){
            throw new error("something went wrong")
        }
    }},
    photourl:{type:String},
    about:{type:String,default:"this is the default description of the user"},
    skills:{type:[String]}

},
{
    timestamps:true
}
) 


userschema.methods.getJWT= async function(){
    const user= this
    const token = await jwt.sign({_id:user.id},"dEVTINDER77",{expiresIn:"7d"})
}

const userModel= mongoose.model("User",userschema)

module.exports=userModel