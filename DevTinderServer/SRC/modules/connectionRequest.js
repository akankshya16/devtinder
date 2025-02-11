const { error } = require("console")
const mongoose= require("mongoose")
const connectionRequestSchema=new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref : "User" // use the model name 
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        typr:mongoose.Schema.Types.String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`${value} is inccorect` //the keyword value is recognise my mngoose 
        }
    },

},
{
    timestamps:true
})
// what is index and its role 
//ask gpt how this works and why next in pre and not in its methods
//dont write arrow function beacuse of binding
connectionRequestSchema.pre("save",function (){
 const connectionrequest= this 
 if (connectionrequest.toUserId.equals(connectionrequest.fromUserId))

{
    throw new error("cannot send connection request to your self ")
}
next()
})

//ask gpt how this works (compounding index)
connectionRequestSchema.index({fromUserId:1,toUserId:1})
const ConnectionRequestModel= new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)

modiule.exports= ConnectionRequestModel