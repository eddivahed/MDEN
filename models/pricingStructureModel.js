const mongoose = require('mongoose');

const tierSchema = new mongoose.Schema({
  name: String,
  unitPrice: Number,
  maxQuantity: Number,
});

const pricingStructureSchema = new mongoose.Schema({
  name: String,
  description: String,
  tiers: [tierSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PricingStructure = mongoose.model('PricingStructure', pricingStructureSchema);

module.exports = PricingStructure;