const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
  },

  lastname: {
    type: String,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },
  phone: Number,
  address: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('user', userSchema);

// Todos
// 1. FullName
// 2. Email
// 3. Password
