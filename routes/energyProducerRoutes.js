const express = require('express');
const router = express.Router();
const energyProducerController = require('../controllers/energyProducerController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new energy producer
router.post('/', authMiddleware, energyProducerController.createEnergyProducer);

// Get all energy producers
router.get('/', authMiddleware, energyProducerController.getAllEnergyProducers);

// Get a specific energy producer by ID
router.get('/:id', authMiddleware, energyProducerController.getEnergyProducerById);

// Update an energy producer by ID
router.put('/:id', authMiddleware, energyProducerController.updateEnergyProducer);

// Delete an energy producer by ID
router.delete('/:id', authMiddleware, energyProducerController.deleteEnergyProducer);

module.exports = router;