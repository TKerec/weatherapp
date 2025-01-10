const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //povezava več proti ena z entiteto User
    required: true
  },
  cityName: { type: String, required: true },
  country: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
