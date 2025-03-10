const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    auth0Id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["mentor", "student"], required: true },
    picture: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { discriminatorKey: "role", collection: "users" } // Discriminator key tells Mongoose which model to use
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
