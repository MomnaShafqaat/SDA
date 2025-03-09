const mongoose = require("mongoose");

const MentorProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Basic Details
    bio: { type: String, default: "" },
    expertise: { type: [String], default: [] }, // Areas of expertise
    experience: { type: Number, default: 0 }, // Years of experience
    availableSlots: { type: [String], default: [] }, // Available time slots

    // Mentor Verification & Status
    isVerified: { type: Boolean, default: false }, // Admin verification status
    isDisabled: { type: Boolean, default: false }, // If account is disabled

    //Mentor Skills & Qualifications
    skills: { type: [String], default: [] }, // List of skills
    qualification: [
        {
            institute: String,
            grade: String,
            cv: String, // CV file URL
        }
    ],

    // Student Relations
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentProfile" }], // Mentorship requests
    menteeList: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentProfile" }], // Accepted students

    //Ratings & Reviews
    reviews: [
        {
            review: String,
            reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "StudentProfile" } // Students leaving reviews
        }
    ],
    ratings: {
        count: { type: Number, default: 0 }, // Total rating count
        average: { type: Number, default: 0 }, // Average rating
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        }
    },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MentorProfile", MentorProfileSchema);
