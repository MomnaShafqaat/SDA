require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chatbotRoute = require('./src/routes/chatbot');
const mentorRoutes = require('./src/routes/mentor.routes'); 
const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chatbot', chatbotRoute);
app.use('/api/mentors', mentorRoutes);
app.use('/api/user', userRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connection to database
const CLUSTER = process.env.CLUSTER;
const DB_NAME = process.env.DB_NAME || 'mentora'; 
const connectionString = `mongodb+srv://${CLUSTER}@vintasycluster.hpn5p.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then(async () => {
    console.log('Connected to MongoDB Server');
  })
  .catch((error) => console.log(error.message));
