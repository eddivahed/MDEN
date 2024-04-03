const EnergyRequest = require('../models/energyRequestModel');

// Create a new energy request
const createEnergyRequest = async (req, res) => {
  try {
    const { consumer, producer, quantity } = req.body;
    const energyRequest = new EnergyRequest({
      consumer,
      producer,
      quantity,
    });
    const savedEnergyRequest = await energyRequest.save();
    res.status(201).json(savedEnergyRequest);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the energy request' });
  }
};

// Get all energy requests
const getAllEnergyRequests = async (req, res) => {
  try {
    const energyRequests = await EnergyRequest.find().populate('consumer').populate('producer');
    res.json(energyRequests);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving energy requests' });
  }
};

// Get a specific energy request by ID
const getEnergyRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const energyRequest = await EnergyRequest.findById(id).populate('consumer').populate('producer');
    if (!energyRequest) {
      return res.status(404).json({ error: 'Energy request not found' });
    }
    res.json(energyRequest);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the energy request' });
  }
};

// Update an energy request by ID
const updateEnergyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedEnergyRequest = await EnergyRequest.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedEnergyRequest) {
      return res.status(404).json({ error: 'Energy request not found' });
    }
    res.json(updatedEnergyRequest);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the energy request' });
  }
};

// Delete an energy request by ID
const deleteEnergyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEnergyRequest = await EnergyRequest.findByIdAndDelete(id);
    if (!deletedEnergyRequest) {
      return res.status(404).json({ error: 'Energy request not found' });
    }
    res.json({ message: 'Energy request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the energy request' });
  }
};

module.exports = {
  createEnergyRequest,
  getAllEnergyRequests,
  getEnergyRequestById,
  updateEnergyRequest,
  deleteEnergyRequest,
};