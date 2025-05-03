const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chatbotRoute = require('./src/routes/chatbot.js');  // Ensure these are correct
const userRoutes = require('./src/routes/userRoutes.js');
const mentorRoutes = require('./src/routes/mentor.routes.js');
const messageRoutes = require('./src/routes/message.route.js');
const jwtCheck = require('./src/middleware/authMiddleware.js');
const { app, server } = require('./src/lib/socket.js');  // Correct the path
const studentRoutes = require('./src/routes/student.js');  

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
