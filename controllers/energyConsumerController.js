const EnergyConsumer = require('../models/energyConsumerModel');

// Create a new energy consumer
const createEnergyConsumer = async (req, res) => {
  try {
    const { name, location, consumptionPattern } = req.body;
    const energyConsumer = new EnergyConsumer({
      name,
      location,
      consumptionPattern,
    });
    const savedEnergyConsumer = await energyConsumer.save();
    res.status(201).json(savedEnergyConsumer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the energy consumer' });
  }
};

// Get all energy consumers
const getAllEnergyConsumers = async (req, res) => {
  try {
    const energyConsumers = await EnergyConsumer.find();
    res.json(energyConsumers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving energy consumers' });
  }
};

// Get a specific energy consumer by ID
const getEnergyConsumerById = async (req, res) => {
  try {
    const { id } = req.params;
    const energyConsumer = await EnergyConsumer.findById(id);
    if (!energyConsumer) {
      return res.status(404).json({ error: 'Energy consumer not found' });
    }
    res.json(energyConsumer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the energy consumer' });
  }
};

// Update an energy consumer by ID
const updateEnergyConsumer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, consumptionPattern } = req.body;
    const updatedEnergyConsumer = await EnergyConsumer.findByIdAndUpdate(
      id,
      { name, location, consumptionPattern, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedEnergyConsumer) {
      return res.status(404).json({ error: 'Energy consumer not found' });
    }
    res.json(updatedEnergyConsumer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the energy consumer' });
  }
};

// Delete an energy consumer by ID
const deleteEnergyConsumer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEnergyConsumer = await EnergyConsumer.findByIdAndDelete(id);
    if (!deletedEnergyConsumer) {
      return res.status(404).json({ error: 'Energy consumer not found' });
    }
    res.json({ message: 'Energy consumer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the energy consumer' });
  }
};

module.exports = {
  createEnergyConsumer,
  getAllEnergyConsumers,
  getEnergyConsumerById,
  updateEnergyConsumer,
  deleteEnergyConsumer,
};