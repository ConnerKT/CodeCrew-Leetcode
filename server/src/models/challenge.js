// models/problem.js
const mongoose = require('mongoose');

const challenge = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  functionSignatures: {
    type: Object
  }
});



const Challenge = mongoose.model('Challenge', challenge);

module.exports = Challenge;
