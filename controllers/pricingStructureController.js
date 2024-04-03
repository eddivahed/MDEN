const PricingStructure = require('../models/pricingStructureModel');

// Create a new pricing structure
const createPricingStructure = async (req, res) => {
  try {
    const { name, description, tiers } = req.body;
    const pricingStructure = new PricingStructure({
      name,
      description,
      tiers,
    });
    const savedPricingStructure = await pricingStructure.save();
    res.status(201).json(savedPricingStructure);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the pricing structure' });
  }
};

// Get all pricing structures
const getAllPricingStructures = async (req, res) => {
  try {
    const pricingStructures = await PricingStructure.find();
    res.json(pricingStructures);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving pricing structures' });
  }
};

// Get a specific pricing structure by ID
const getPricingStructureById = async (req, res) => {
  try {
    const { id } = req.params;
    const pricingStructure = await PricingStructure.findById(id);
    if (!pricingStructure) {
      return res.status(404).json({ error: 'Pricing structure not found' });
    }
    res.json(pricingStructure);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the pricing structure' });
  }
};

// Update a pricing structure by ID
const updatePricingStructure = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, tiers } = req.body;
    const updatedPricingStructure = await PricingStructure.findByIdAndUpdate(
      id,
      { name, description, tiers, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedPricingStructure) {
      return res.status(404).json({ error: 'Pricing structure not found' });
    }
    res.json(updatedPricingStructure);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the pricing structure' });
  }
};

// Delete a pricing structure by ID
const deletePricingStructure = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPricingStructure = await PricingStructure.findByIdAndDelete(id);
    if (!deletedPricingStructure) {
      return res.status(404).json({ error: 'Pricing structure not found' });
    }
    res.json({ message: 'Pricing structure deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the pricing structure' });
  }
};

module.exports = {
  createPricingStructure,
  getAllPricingStructures,
  getPricingStructureById,
  updatePricingStructure,
  deletePricingStructure,
};