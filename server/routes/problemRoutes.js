const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

router.get('/problems', problemController.getAllProblems);
router.post('/problems', problemController.createProblem);
router.delete('/problems/:id', problemController.deleteProblem);
router.put('/problems/:id', problemController.updateProblem);

module.exports = router;