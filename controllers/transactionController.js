const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const axios = require("axios");
 

const getWalletIDFromGoAPI = async (username, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/accountid",
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.id;
  } catch (error) {
    console.error("Error getting wallet ID from Go API:", error);
    throw error;
  }
};

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

// Create a consumer-to-consumer transaction
const createConsumerToConsumerTransaction = async (req, res) => {
  try {
    const { sender, recipient, amount } = req.body;

    // Get the admin token
    const adminToken = await loginAsAdmin();

    // Find the sender user
    const senderUser = await User.findById(sender);

    if (!senderUser) {
      return res.status(404).json({ error: "Sender not found" });
    }

    // Find the recipient user
    const recipientUser = await User.findById(recipient);

    if (!recipientUser) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    // Get the recipient's wallet address
    const recipientWalletAddress = await getWalletIDFromGoAPI(
      recipientUser.username,
      adminToken
    );

    // Transfer funds from sender to recipient
    await axios.post(
      "http://localhost:8082/transfer",
      {
        username: senderUser.username,
        receiver: recipientWalletAddress,
        value: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    // Create the transaction
    const transaction = new Transaction({
      sender,
      recipient,
      amount,
    });

    const savedTransaction = await transaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Error creating consumer-to-consumer transaction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the transaction" });
  }
};

// Create a consumer-to-minter transaction
const createConsumerToMinterTransaction = async (req, res) => {
  try {
    const { payer, amount, energyRequest } = req.body;

    // Get the admin token
    const adminToken = await loginAsAdmin();

    // Find the payer user
    const payerUser = await User.findById(payer);

    if (!payerUser) {
      return res.status(404).json({ error: "Payer not found" });
    }

    // Find the minter user
    const minterUser = await User.findOne({ role: "minter" });

    if (!minterUser) {
      return res.status(404).json({ error: "Minter user not found" });
    }

    // Get the minter's wallet address
    const minterWalletAddress = await getWalletIDFromGoAPI(minterUser.username, adminToken);

    // Transfer funds from payer to minter
    await axios.post(
      "http://localhost:8082/transfer",
      {
        username: payerUser.username,
        receiver: minterWalletAddress,
        value: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    // Create the transaction
    const transaction = new Transaction({
      payer,
      payee: minterUser._id,
      energyRequest,
      amount,
    });

    const savedTransaction = await transaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Error creating consumer-to-minter transaction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the transaction" });
  }
};

// Create a minter-to-producer transaction
const createMinterToProducerTransaction = async (req, res) => {
  try {
    const { payee, amount, energyRequest } = req.body;

    // Get the admin token
    const adminToken = await loginAsAdmin();

    // Find the payee user
    const payeeUser = await User.findById(payee);

    if (!payeeUser) {
      return res.status(404).json({ error: "Payee not found" });
    }

    // Find the minter user
    const minterUser = await User.findOne({ role: "minter" });

    if (!minterUser) {
      return res.status(404).json({ error: "Minter user not found" });
    }

    // Get the minter's wallet address
    const minterWalletAddress = await getWalletIDFromGoAPI(minterUser.username, adminToken);

    // Get the payee's wallet address
    const payeeWalletAddress = await getWalletIDFromGoAPI(payeeUser.username, adminToken);

    // Transfer funds from minter to payee
    await axios.post(
      "http://localhost:8082/transfer",
      {
        username: minterUser.username,
        receiver: payeeWalletAddress,
        value: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    // Create the transaction
    const transaction = new Transaction({
      payer: minterUser._id,
      payee,
      energyRequest,
      amount,
    });

    const savedTransaction = await transaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Error creating minter-to-producer transaction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the transaction" });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("payer")
      .populate("payee")
      .populate("energyRequest");
    res.json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving transactions" });
  }
};

// Get a specific transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id)
      .populate("payer")
      .populate("payee")
      .populate("energyRequest");
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the transaction" });
  }
};

// Update a transaction by ID
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the transaction" });
  }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the transaction" });
  }
};

module.exports = {
  createConsumerToConsumerTransaction,
  createConsumerToMinterTransaction,
  createMinterToProducerTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
