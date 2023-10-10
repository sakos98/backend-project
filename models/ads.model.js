const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 50,
  },
  describe: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 1000,
  },
  datePublish: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    required: true, 
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  infoOfSeller: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Ads', adsSchema);
