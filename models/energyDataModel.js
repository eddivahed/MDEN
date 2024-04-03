const mongoose = require('mongoose');

const energyDataSchema = new mongoose.Schema({
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EnergyProducer',
    required: true,
  },
  consumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EnergyConsumer',
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },  
  consumptionType: {
    type: String,
    enum: ['peak', 'semi-peak', 'off-peak'],
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const EnergyData = mongoose.model('EnergyData', energyDataSchema);

module.exports = EnergyData;