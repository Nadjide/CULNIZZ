const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/create', quizController.createQuizWithQuestions);

module.exports = router;
