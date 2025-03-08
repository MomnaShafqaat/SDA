const mongoose = require("mongoose");

let messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    },

    reciever: {
      type: mongoose.Schema.Types.ObjectId ,
      ref : 'User'
  },

    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }

  
    
  });
  
  
  let userModel = mongoose.model("Student", userSchema);
  module.exports = studentModel;