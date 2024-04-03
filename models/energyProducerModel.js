const mongoose = require('mongoose');

const energyProducerSchema = new mongoose.Schema({
  name: String,
  capacityRange: {
    min: Number,
    max: Number,
  },
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
  pricingStructure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PricingStructure',
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

const EnergyProducer = mongoose.model('EnergyProducer', energyProducerSchema);

module.exports = EnergyProducer;