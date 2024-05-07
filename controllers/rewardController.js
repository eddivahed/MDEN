const Reward = require("../models/rewardModel");
const User = require("../models/userModel");
const axios = require("axios");

const loginAsAdmin = async () => {
  try {
    const response = await axios.post("http://localhost:8082/login", {
      username: "admin",
      password: "password",
    });
    return response.data.token;
  } catch (error) {
    console.error("Error logging in as admin:", error);
    throw error;
  }
};

// Create a new reward
const createReward = async (req, res) => {
  try {
    const { consumer, amount, reason } = req.body;

    // Find the consumer user by ID
    const consumerObject = await User.findById(consumer);

    if (!consumerObject) {
      return res.status(404).json({ error: "Consumer not found" });
    }

    const reward = new Reward({
      consumer,
      amount,
      reason,
    });

    const savedReward = await reward.save();

    // Get the admin token from the loginAsAdmin function
    const token = await loginAsAdmin();

    // Make a request to the destination server's mint API
    const response = await axios.post(
      "http://localhost:8082/mint",
      {
        username: consumerObject.username,
        value: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check the response from the destination server
    if (response.status === 200) {
      res.status(201).json(savedReward);
    } else {
      // If the destination server returns an error, delete the created reward and return an error response
      await Reward.findByIdAndDelete(savedReward._id);
      res.status(500).json({
        error: "An error occurred while minting the reward on the destination server",
      });
    }
  } catch (error) {
    console.error("Error creating reward:", error);
    res.status(500).json({ error: "An error occurred while creating the reward" });
  }
};

// Get all rewards
const getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find().populate("consumer");
    res.json(rewards);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving rewards" });
  }
};

// Get a specific reward by ID
const getRewardById = async (req, res) => {
  try {
    const { id } = req.params;
    const reward = await Reward.findById(id).populate("consumer");
    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }
    res.json(reward);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the reward" });
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
      return res.status(404).json({ error: "Reward not found" });
    }
    res.json(updatedReward);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the reward" });
  }
};

// Delete a reward by ID
const deleteReward = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReward = await Reward.findByIdAndDelete(id);
    if (!deletedReward) {
      return res.status(404).json({ error: "Reward not found" });
    }
    res.json({ message: "Reward deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the reward" });
  }
};

module.exports = {
  createReward,
  getAllRewards,
  getRewardById,
  updateReward,
  deleteReward,
};
