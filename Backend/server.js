import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import chatbotRoute from './src/routes/chatbot.js';  // Ensure these are correct
import userRoutes from './src/routes/userRoutes.js';
import mentorRoutes from './src/routes/mentor.routes.js';
import messageRoutes from './src/routes/message.route.js';
import jwtCheck from './src/middleware/authMiddleware.js';
import { app, server } from './src/lib/socket.js';  // Correct the path
import studentRoutes from './src/routes/student.js';  

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chatbot', chatbotRoute);
app.use('/api/user', userRoutes);
app.use('/api/mentors',  mentorRoutes);
app.use('/api/messages', jwtCheck, messageRoutes);
app.use('/api/student', studentRoutes);


// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Database connection
const CLUSTER = process.env.CLUSTER;
const connectionString = `mongodb+srv://${CLUSTER}@vintasycluster.hpn5p.mongodb.net/mentora`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to Mongo DB Server: " + connectionString);
  })
  .catch((error) => console.log(error.message));

// Socket connection (Make sure socket is correctly set up in your 'socket.js')
server.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port', process.env.PORT || 5000);
});
