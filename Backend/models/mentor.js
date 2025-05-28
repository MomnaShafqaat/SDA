const mongoose = require("mongoose");
const User=require("./User.js");
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
    pendingRequests: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: [] },
    menteeList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  
    // Ratings & Reviews
    reviews: [
    {
      review: String,
      reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],

  ratings: [
    {
      rating: { type: Number, min: 0, max: 5 },
      rater: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now }
    }
  ],

  // You can keep the summary ratings field too for quick access
  ratingSummary: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },

    badges: [
  {
    title: String,
    description: String,
    icon: String, // optional field for badge icon or emoji
    dateAwarded: {
      type: Date,
      default: Date.now,
    },
  }
],

badgeRequest: {
  requested: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  requestedAt: { type: Date }
},
priorityDM:[
  {
    type: mongoose.Schema.Types.ObjectId, ref: "Student" ,
  }
],
    
  paymentRecieved :
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment"
  } ,
  //a valid stripe id for mentors
  accountId:{
    type: String,
    //required: true
  }
  });
  
  const Mentor = User.discriminator("mentor", MentorSchema);
  module.exports = Mentor;