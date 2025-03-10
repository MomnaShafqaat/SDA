const mongoose = require("mongoose");
const User=require("./user.model");
const StudentSchema = new mongoose.Schema({
    mentorList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  
    education: [
      {
        institute: String,
        grade: String,
        qualification: String
      }
    ],
  
    isDisabled: { type: Boolean, default: false }
  });
  
  const Student = User.discriminator("student", StudentSchema);
  module.exports = Student;
  