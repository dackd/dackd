const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  shortUrl: {
    type:String,
    required: true,
    trim: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clickCount: {
    type: Number,
    default: 0
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  expiredAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // Default to 1 year
    }
  }
})

module.exports = mongoose.model('Url', urlSchema);