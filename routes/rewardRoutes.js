const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new reward
router.post('/', authMiddleware, rewardController.createReward);

// Get all rewards
router.get('/', authMiddleware, rewardController.getAllRewards);

// Get a specific reward by ID
router.get('/:id', authMiddleware, rewardController.getRewardById);

// Update a reward by ID
router.put('/:id', authMiddleware, rewardController.updateReward);

// Delete a reward by ID
router.delete('/:id', authMiddleware, rewardController.deleteReward);

module.exports = router;