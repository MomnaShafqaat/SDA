const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path as needed
const MentorProfile = require('./models/MentorProfile'); // Adjust the path as needed

// Connection string
const connectionString = `mongodb+srv://${process.env.CLUSTER}@vintasycluster.hpn5p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Insert a fake user
    const user = new User({
      auth0Id: 'auth0|1234567890', // Replace with a valid Auth0 ID
      email: 'testuser@example.com',
      name: 'Test User',
      role: 'mentor', // Role can be "mentor" or "student"
    });
    await user.save();
    console.log('User inserted:', user);

    // Insert a fake mentor profile
    const mentorProfile = new MentorProfile({
      userId: user._id, // Link to the user
      bio: 'Experienced full-stack developer with a passion for teaching.',
      expertise: ['JavaScript', 'React', 'Node.js'],
      experience: 5, // Years of experience
      availableSlots: ['Mon 10:00 AM', 'Wed 2:00 PM'], // Available time slots
      isVerified: true,
      isDisabled: false,
      skills: ['JavaScript', 'React', 'Node.js'],
      qualification: [
        {
          institute: 'Tech University',
          grade: 'A',
          cv: 'https://example.com/cv1.pdf',
        },
      ],
      pendingRequests: [], // No pending requests
      menteeList: [], // No mentees yet
      reviews: [], // No reviews yet
      ratings: {
        count: 10,
        average: 4.5,
        rating: 4,
      },
    });
    await mentorProfile.save();
    console.log('Mentor profile inserted:', mentorProfile);

    // Disconnect
    mongoose.disconnect();
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));