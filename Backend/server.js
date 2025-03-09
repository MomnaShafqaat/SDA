require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const chatbotRoute = require('./src/routes/chatbot');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chatbot', chatbotRoute);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//connection to database
const CLUSTER = process.env.CLUSTER ;
let connectionString = `mongodb+srv://${CLUSTER}@vintasycluster.hpn5p.mongodb.net/mentora/`;

mongoose
  .connect(connectionString)
  .then( async () =>
    {
      console.log("Connected to Mongo DB Server: " + connectionString);
    } )
  .catch((error) => console.log(error.message));