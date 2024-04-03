const express = require('express');
const router = express.Router();
const pricingStructureController = require('../controllers/pricingStructureController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new pricing structure
router.post('/', authMiddleware, pricingStructureController.createPricingStructure);

// Get all pricing structures
router.get('/', authMiddleware, pricingStructureController.getAllPricingStructures);

// Get a specific pricing structure by ID
router.get('/:id', authMiddleware, pricingStructureController.getPricingStructureById);

// Update a pricing structure by ID
router.put('/:id', authMiddleware, pricingStructureController.updatePricingStructure);

// Delete a pricing structure by ID
router.delete('/:id', authMiddleware, pricingStructureController.deletePricingStructure);

module.exports = router;