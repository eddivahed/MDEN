const mongoose = require('mongoose');

const energyConsumerSchema = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  consumptionPattern: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const EnergyConsumer = mongoose.model('EnergyConsumer', energyConsumerSchema);

module.exports = EnergyConsumer;