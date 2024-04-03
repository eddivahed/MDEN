const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  consumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EnergyConsumer',
    required: true,
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EnergyProducer',
    required: true,
  },
  energyRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EnergyRequest',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
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

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;