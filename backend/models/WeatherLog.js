const mongoose = require('mongoose');

const WeatherLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //povezava več proti ena z entiteto User
    required: true
  },
  cityName: { type: String, required: true },
  temperature: { type: Number },
  description: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeatherLog', WeatherLogSchema);