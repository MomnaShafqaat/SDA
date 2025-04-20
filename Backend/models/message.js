const mongoose= require('mongoose');
const User = require('./User');

let messageScehma=mongoose.Schema({
  sender:{ 
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required: true,
  },
  reciever:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true,
  },
  content:{
    type:String,
    required: true,
  },
  timestamp:{
    type:Date,
    default: Date.now,
  }
})

const Message=mongoose.model("message",messageScehma);
module.exports=Message;