const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

router.get('/problems', problemController.getAllProblems);
router.get('/problems', problemController.getAllProblems);
router.get('/problems', problemController.getAllProblems);
router.get('/problems', problemController.getAllProblems);

module.exports = router;