const mongoose = require('mongoose');

const energyRequestSchema = new mongoose.Schema({
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
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
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

const EnergyRequest = mongoose.model('EnergyRequest', energyRequestSchema);

module.exports = EnergyRequest;