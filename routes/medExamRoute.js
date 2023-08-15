const express = require('express');

const medicalExamController = require('./../controllers/medicalExamController');

const router = express.Router();

router.route('/:id').get(medicalExamController.medExam);

module.exports = router;