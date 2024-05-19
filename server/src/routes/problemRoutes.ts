const express = require('express');
const problemsRouter = express.Router();
import challengeStore from "../stores/challengeStore"

problemsRouter.get('/problems', async (req, res) => {
    try {
      const problems = await challengeStore.getAllChallenges();
      res.json(problems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
});


problemsRouter.post('/problemsbyid', async (req, res) => {
    try {
        const ids = req.body.ids || [];
        const problems = await challengeStore.getChallengesByIds(ids);
        res.json(problems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// problemsRouter.post('/problems', problemController.createProblem);
problemsRouter.delete('/problems/:id', async (req, res) => {
    const problemId = req.params.id;
  
    try {
        const deletedProblem = await challengeStore.deleteChallengeById(problemId);

        if (!deletedProblem.deletedCount) {
            return res.status(404).json({ message: "Problem not found" });
        }

        const allProblems = await challengeStore.getAllChallenges();

        res.status(200).json({
            message: "Problem deleted successfully",
            deletedProblem,
            allProblems,
        });
    } catch (error) {
        console.error("Error deleting problem:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


problemsRouter.put('/problems/:id', async (req, res) => {
    try {
        const problemId = req.params.id;
        const updateData = req.body;

        const updatedProblem: any = await challengeStore.updateChallengeById(problemId, updateData);

        if (!updatedProblem.value) {
        return res.status(404).json({ message: "Problem not found" });
        }

        const allProblems = await challengeStore.getAllChallenges();

        res.status(200).json({
            message: "Problem updated successfully",
            updatedProblem: updatedProblem.value,
            allProblems,
      });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default problemsRouter;