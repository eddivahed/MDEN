const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  payee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  energyRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EnergyRequest",
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
