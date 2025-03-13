const mongoose = require("mongoose");
const User=require("./user.model");
const MentorSchema = new mongoose.Schema({
    bio: { type: String, default: "" },
    expertise: { type: [String], default: [] },
    experience: { type: Number, default: 0 },
    availableSlots: { type: [String], default: [] },
  
    // Mentor Verification & Status
    isVerified: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
  
    // Skills & Qualifications
    skills: { type: [String], default: [] },
    qualification: [
      {
        institute: String,
        grade: String,
        cv: String
      }
    ],
  
    // Student Relations
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    menteeList: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  
    // Ratings & Reviews
    reviews: [
      {
        review: String,
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
      }
    ],
    ratings: {
      count: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      rating: { type: Number, min: 0, max: 5, default: 0 }
    },
    paymentRecieved :
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "payment"
        }
  });
  
  const Mentor = User.discriminator("mentor", MentorSchema);
  module.exports = Mentor;
  