// server.js

// 1. Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 2. Create the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Middleware setup
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// 5. Define routes
// Example route for notes
app.use('/api/notes', require('./routes/notes')); // Import your routes here

// You can add more routes here
// app.use('/api/users', require('./routes/users'));

// 6. Default route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// 7. Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
