const mongoose = require("mongoose");
const User=require("./User");
const StudentSchema = new mongoose.Schema({
    mentorList: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  
    education: [
      {
        institute: String,
        grade: String,
        qualification: String
      }
    ],
  
    isDisabled: { type: Boolean, default: false },
    paymentMade :
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment"
    }
  });
  
  const Student = User.discriminator("student", StudentSchema);
  module.exports = Student;
  