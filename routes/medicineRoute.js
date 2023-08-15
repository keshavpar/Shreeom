const express = require('express');

const medicineController = require('./../controllers/medicineController');

const router = express.Router();

router.route('/:id').get(medicineController.medicines);

module.exports = router;