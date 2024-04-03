const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new transaction
router.post('/', authMiddleware, transactionController.createTransaction);

// Get all transactions
router.get('/', authMiddleware, transactionController.getAllTransactions);

// Get a specific transaction by ID
router.get('/:id', authMiddleware, transactionController.getTransactionById);

// Update a transaction by ID
router.put('/:id', authMiddleware, transactionController.updateTransaction);

// Delete a transaction by ID
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;