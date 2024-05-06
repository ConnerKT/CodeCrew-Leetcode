// models/problem.js
const mongo = require('../config/mongoConfig');

const challenge = new mongo.Schema({
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



const Challenge = mongo.model('Challenge', challenge);

module.exports = Challenge;
