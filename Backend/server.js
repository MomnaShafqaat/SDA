require('dotenv').config();
const { auth } = require("express-oauth2-jwt-bearer");

const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const chatbotRoute = require('./src/routes/chatbot');
const userRoutes= require("./src/routes/userRoutes");
const mentorRoutes = require('./src/routes/mentor.routes'); 
const messageRoutes = require('./src/routes/message.route');
const jwtCheck =require('./src/middleware/authMiddleware');
const app = express();
app.use(cors());
app.use(express.json());
// const jwtCheck = auth({
//   audience: 'Unique Identifier',
//   issuerBaseURL: 'https://dev-vwgdhd3en1zcwos3.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// });


// Routes
app.use('/api/chatbot', chatbotRoute);
app.use('/api/user',userRoutes);
app.use('/api/mentors',jwtCheck, mentorRoutes);
app.use('/api/messages',jwtCheck,messageRoutes);

//app.use('/api/mentors',mentorRoutes);
// Error handling


app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//connection to database
const CLUSTER = process.env.CLUSTER ;
let connectionString = `mongodb+srv://${CLUSTER}@vintasycluster.hpn5p.mongodb.net/mentora`;

mongoose
  .connect(connectionString)
  .then( async () =>
    {
      console.log("Connected to Mongo DB Server: " + connectionString);
    } )
  .catch((error) => console.log(error.message));