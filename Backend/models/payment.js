const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    payer : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'student' ,
    },
    recipient : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'mentor'
    } ,
    amount : Number ,
    timestamp: {
        type: Date,
        default: Date.now
    }
  });
  
  const payment = mongoose.model("payment", paymentSchema);
  module.exports = payment;
  