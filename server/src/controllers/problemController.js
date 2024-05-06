const mongoose = require("mongoose");
const Challenge = require("../models/challenge");
const dotenv = require("dotenv").config();

exports.getProblems = async (req, res) => {
  try {
    const problems = await Challenge.find({});
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProblemsById = async (req, res) => {
  try {
    let query = {"_id": {"$in":req.body.ids}} || {}
    const problems = await Challenge.find(query);
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// exports.createProblem = async (req, res) => {
//   try {
//     const { title, difficulty, description, link } = req.body;

//     const maxIdProblem = await Challenge.findOne({}).sort({ id: -1 });
//     const nextId = maxIdProblem ? maxIdProblem.id + 1 : 1;

//     // Create a new Problem instance with the generated id
//     const newProblem = new Challenge({
//       id: nextId,
//       title,
//       difficulty,
//       description,
//       link,
//     });
//     const savedProblem = await newProblem.save();
//     const problems = await Challenge.find();

//     // sending all problems so I don't have to recall the GET every time a post is made
//     res.status(201).json({
//       newProblem: savedProblem,
//       allProblems: problems,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
exports.deleteProblem = async (req, res) => {
  const problemId = req.params.id;

  // console.log(problemId);

  try {
    const deletedProblem = await Challenge.findByIdAndDelete(problemId);

    if (!deletedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    const problems = await Challenge.find();

    res.status(200).json({
      message: "Problem deleted successfully",
      deletedProblem,
      allProblems: problems,
    });
  } catch (error) {
    console.error("Error deleting problem:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateProblem = async (req, res) => {
  try {
    //Grab Id and set it to a variable
    let problemId = req.params.id;
    const updateData = req.body; 
    //Find ID, if not found, return status code 404
    const updatedProblem = await Challenge.findByIdAndUpdate(problemId, updateData);
    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    const problems = await Problem.find();
    res.status(200).json({
      message: "Problem deleted successfully",
      updatedProblem: updatedProblem,
      allProblems: problems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
