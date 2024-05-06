const express = require('express');
const problemsRouter = express.Router();
const problemController = require('../controllers/problemController');

problemsRouter.get('/problems', problemController.getProblems);
problemsRouter.post('/problemsbyid', problemController.getProblemsById);

// problemsRouter.post('/problems', problemController.createProblem);
problemsRouter.delete('/problems/:id', problemController.deleteProblem);
problemsRouter.put('/problems/:id', problemController.updateProblem);

module.exports = problemsRouter;