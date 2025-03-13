const mongoose = require("mongoose");

let messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        required: true
    },

    reciever: {
      type: mongoose.Schema.Types.ObjectId ,
      ref : 'User' ,
      required: true
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
  
  
  let Message = mongoose.model("message", userSchema);
  module.exports = studentModel;