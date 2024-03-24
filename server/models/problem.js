const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    input: String,
    output: String
});

const problemSchema = new mongoose.Schema({
    id: Number,
    title: String,
    difficulty: String,
    description: String,
    examples: [exampleSchema]
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;