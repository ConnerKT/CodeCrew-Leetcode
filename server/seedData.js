const mongoose = require('mongoose');
const Problem = require('./models/problem');
const dotenv = require('dotenv').config();


mongoose.connect(process.env.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Sample data to insert
const problemsData = [
{
    "id": 403,
    "title": "Merge Numbers",
    "difficulty": "Medium",
    "description": "Given an test of test where test[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    "links": "https://leetcode.com/"
}
];


async function seedProblems() {
  try {
    // Insert new problems
    await Problem.insertMany(problemsData);

    console.log('Problems seeded successfully');
  } catch (err) {
    console.error('Error seeding problems:', err);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Run the seed function

// seedProblems();
