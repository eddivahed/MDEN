const express = require('express');
const router = express.Router();
const energyConsumerController = require('../controllers/energyConsumerController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new energy consumer
router.post('/', authMiddleware, energyConsumerController.createEnergyConsumer);

// Get all energy consumers
router.get('/', authMiddleware, energyConsumerController.getAllEnergyConsumers);

// Get a specific energy consumer by ID
router.get('/:id', authMiddleware, energyConsumerController.getEnergyConsumerById);

// Update an energy consumer by ID
router.put('/:id', authMiddleware, energyConsumerController.updateEnergyConsumer);

// Delete an energy consumer by ID
router.delete('/:id', authMiddleware, energyConsumerController.deleteEnergyConsumer);

module.exports = router;