const Transaction = require('../models/transactionModel');

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { consumer, producer, energyRequest, quantity, price } = req.body;
    const transaction = new Transaction({
      consumer,
      producer,
      energyRequest,
      quantity,
      price,
    });
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the transaction' });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('consumer')
      .populate('producer')
      .populate('energyRequest');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving transactions' });
  }
};

// Get a specific transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id)
      .populate('consumer')
      .populate('producer')
      .populate('energyRequest');
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the transaction' });
  }
};

// Update a transaction by ID
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, price } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { quantity, price, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the transaction' });
  }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the transaction' });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};