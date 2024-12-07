const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,  // Username is required, but not unique
    // Remove the unique constraint if it's there
    // unique: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Only email should be unique
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ['patient', 'doctor'], required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
