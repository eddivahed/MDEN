const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a consumer-to-consumer transaction
router.post('/consumer-to-consumer', authMiddleware, transactionController.createConsumerToConsumerTransaction);

// Create a consumer-to-minter transaction
router.post('/consumer-to-minter', authMiddleware, transactionController.createConsumerToMinterTransaction);

// Create a minter-to-producer transaction
router.post('/minter-to-producer', authMiddleware, transactionController.createMinterToProducerTransaction);

// Get all transactions
router.get('/', authMiddleware, transactionController.getAllTransactions);

// Get a specific transaction by ID
router.get('/:id', authMiddleware, transactionController.getTransactionById);

// Update a transaction by ID
router.put('/:id', authMiddleware, transactionController.updateTransaction);

// Delete a transaction by ID
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;