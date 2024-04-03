const EnergyProducer = require('../models/energyProducerModel');

// Create a new energy producer
const createEnergyProducer = async (req, res) => {
  try {
    const { name, capacityRange, location, pricingStructure } = req.body;
    const energyProducer = new EnergyProducer({
      name,
      capacityRange,
      location,
      pricingStructure,
    });
    const savedEnergyProducer = await energyProducer.save();
    res.status(201).json(savedEnergyProducer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the energy producer' });
  }
};

// Get all energy producers
const getAllEnergyProducers = async (req, res) => {
  try {
    const energyProducers = await EnergyProducer.find().populate('pricingStructure');
    res.json(energyProducers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving energy producers' });
  }
};

// Get a specific energy producer by ID
const getEnergyProducerById = async (req, res) => {
  try {
    const { id } = req.params;
    const energyProducer = await EnergyProducer.findById(id).populate('pricingStructure');
    if (!energyProducer) {
      return res.status(404).json({ error: 'Energy producer not found' });
    }
    res.json(energyProducer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the energy producer' });
  }
};

// Update an energy producer by ID
const updateEnergyProducer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacityRange, location, pricingStructure } = req.body;
    const updatedEnergyProducer = await EnergyProducer.findByIdAndUpdate(
      id,
      { name, capacityRange, location, pricingStructure, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedEnergyProducer) {
      return res.status(404).json({ error: 'Energy producer not found' });
    }
    res.json(updatedEnergyProducer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the energy producer' });
  }
};

// Delete an energy producer by ID
const deleteEnergyProducer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEnergyProducer = await EnergyProducer.findByIdAndDelete(id);
    if (!deletedEnergyProducer) {
      return res.status(404).json({ error: 'Energy producer not found' });
    }
    res.json({ message: 'Energy producer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the energy producer' });
  }
};

module.exports = {
  createEnergyProducer,
  getAllEnergyProducers,
  getEnergyProducerById,
  updateEnergyProducer,
  deleteEnergyProducer,
};