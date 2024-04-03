const express = require('express');
const router = express.Router();
const energyRequestController = require('../controllers/energyRequestController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new energy request
router.post('/', authMiddleware, energyRequestController.createEnergyRequest);

// Get all energy requests
router.get('/', authMiddleware, energyRequestController.getAllEnergyRequests);

// Get a specific energy request by ID
router.get('/:id', authMiddleware, energyRequestController.getEnergyRequestById);

// Update an energy request by ID
router.put('/:id', authMiddleware, energyRequestController.updateEnergyRequest);

// Delete an energy request by ID
router.delete('/:id', authMiddleware, energyRequestController.deleteEnergyRequest);

module.exports = router;