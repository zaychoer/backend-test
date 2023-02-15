const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true,
  },

  email: {
    type: String,
    lowercase: true,
    required: true,
  },

  password: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },

  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
