const Reward = require('../models/rewardModel');

// Create a new reward
const createReward = async (req, res) => {
  try {
    const { consumer, amount, reason } = req.body;
    const reward = new Reward({
      consumer,
      amount,
      reason,
    });
    const savedReward = await reward.save();
    res.status(201).json(savedReward);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the reward' });
  }
};

// Get all rewards
const getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find().populate('consumer');
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving rewards' });
  }
};

// Get a specific reward by ID
const getRewardById = async (req, res) => {
  try {
    const { id } = req.params;
    const reward = await Reward.findById(id).populate('consumer');
    if (!reward) {
      return res.status(404).json({ error: 'Reward not found' });
    }
    res.json(reward);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the reward' });
  }
};

// Update a reward by ID
const updateReward = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, reason } = req.body;
    const updatedReward = await Reward.findByIdAndUpdate(
      id,
      { amount, reason, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedReward) {
      return res.status(404).json({ error: 'Reward not found' });
    }
    res.json(updatedReward);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the reward' });
  }
};

// Delete a reward by ID
const deleteReward = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReward = await Reward.findByIdAndDelete(id);
    if (!deletedReward) {
      return res.status(404).json({ error: 'Reward not found' });
    }
    res.json({ message: 'Reward deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the reward' });
  }
};

module.exports = {
  createReward,
  getAllRewards,
  getRewardById,
  updateReward,
  deleteReward,
};