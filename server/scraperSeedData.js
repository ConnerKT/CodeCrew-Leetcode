const mongoose = require('mongoose');
const Problem = require('./models/problem'); 
const dotenv = require('dotenv').config();
const data = require('./allProblems.json');

mongoose.connect(process.env.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function seedProblems() {
  try {
    for (let i = 0; i < data.length; i++) {
      const problemData = data[i];
      
      const newProblem = new Problem({
        id: problemData.questionId,
        title: problemData.questionTitle,
        difficulty: problemData.difficulty,
        description: problemData.question,
        link: problemData.link
      });

      if (!newProblem.id) {
        throw new Error('Problem id must be provided');
      }
      // await newProblem.validate();
      await newProblem.save();
      console.log(`Problem ${i + 1} seeded successfully`);
    }

    console.log('All problems seeded successfully');
  } catch (err) {
    console.error('Error seeding problems:', err);
  } finally {
    mongoose.connection.close();
  }
}

// seedProblems();