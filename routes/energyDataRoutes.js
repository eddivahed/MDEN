const express = require('express');
const router = express.Router();
const energyDataController = require('../controllers/energyDataController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create new energy data
router.post('/', authMiddleware, energyDataController.createEnergyData);

// Get all energy data
router.get('/', authMiddleware, energyDataController.getAllEnergyData);

// Get energy data by ID
router.get('/:id', authMiddleware, energyDataController.getEnergyDataById);

// Update energy data by ID
router.put('/:id', authMiddleware, energyDataController.updateEnergyData);

// Delete energy data by ID
router.delete('/:id', authMiddleware, energyDataController.deleteEnergyData);

// Get Negative Energy Consumption
router.get('/negative-consumption', authMiddleware, energyDataController.calculateNegativeConsumptionAndRewards);

module.exports = router;