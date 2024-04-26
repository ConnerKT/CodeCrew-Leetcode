// models/problem.js
const mongoose = require('mongoose');
const getNextSequenceValue = require('../utils/sequenceGenerator');

const problemSchema = new mongoose.Schema({
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
 
 
},
{versionKey: false,}
);

problemSchema.pre('save', async function(next) {
    if (!this.id) {
      try {
        const nextId = await getNextSequenceValue('problemId');
        this.id = nextId; // Assign the generated id to the document
      } catch (error) {
        throw new Error('Error generating custom ID');
      }
    }
    next();
  });

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
