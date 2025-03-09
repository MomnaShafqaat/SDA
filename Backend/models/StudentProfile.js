const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // ✅ Mentor Relations
    mentorList: [{ type: mongoose.Schema.Types.ObjectId, ref: "MentorProfile" }], // List of accepted mentors
    pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "MentorProfile" }], // Sent mentorship requests

    // ✅ Education Details
    education: [
        {
            institute: String,
            grade: String,
            qualification: String
        }
    ],

    // ✅ Account Status
    isDisabled: { type: Boolean, default: false }, // If account is disabled

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
