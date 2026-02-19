const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    default: 'user'
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    default: ""
  },

  dob: {
    type: Date
  },
  
  savedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }
  ],

  avatar: {
    type: String,   // image path or URL
    default: "uploads/default.svg"
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
