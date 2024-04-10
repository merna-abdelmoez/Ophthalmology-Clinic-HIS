// routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientControllers');

// Define route to get all patients
router.get('/', patientController.getAllPatients);

module.exports = router;
