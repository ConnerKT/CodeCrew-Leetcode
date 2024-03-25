const Problem = require('../models/problem');


exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};