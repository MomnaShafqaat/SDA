const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true }, // Auth0 user ID
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["mentor", "student"], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);