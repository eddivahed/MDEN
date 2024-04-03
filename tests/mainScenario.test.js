const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const EnergyProducer = require('../models/energyProducerModel');
const EnergyConsumer = require('../models/energyConsumerModel');
const EnergyRequest = require('../models/energyRequestModel');
const Transaction = require('../models/transactionModel');
const Reward = require('../models/rewardModel');
const PricingStructure = require('../models/pricingStructureModel');
const EnergyData = require('../models/energyDataModel');

describe('Main Scenario Test', () => {
  let token;
  let producer;
  let consumer;
  let pricingStructure;
  let energyRequest;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/energy-network', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany();
    await EnergyProducer.deleteMany();
    await EnergyConsumer.deleteMany();
    await EnergyRequest.deleteMany();
    await Transaction.deleteMany();
    await Reward.deleteMany();
    await PricingStructure.deleteMany();
    await EnergyData.deleteMany();
  });

  it('should complete the main scenario successfully', async () => {
    // Create a user and obtain the token
    const user = {
      username: 'testuser002',
      email: 'testuser002@example.com',
      password: 'password002',
      role: 'consumer',
    };
    const userResponse = await request(app).post('/api/users').send(user);
    expect(userResponse.status).toBe(201);
    token = userResponse.body.token;

    // Create an energy producer
    const producerData = {
      name: 'Test Producer',
      capacityRange: { min: 100, max: 500 },
      location: { type: 'Point', coordinates: [10.123456, 20.654321] },
    };
    const producerResponse = await request(app)
      .post('/api/energyproducers')
      .set('Authorization', token)
      .send(producerData);
    expect(producerResponse.status).toBe(201);
    producer = producerResponse.body;

    // Create an energy consumer
    const consumerData = {
      name: 'Test Consumer',
      location: { type: 'Point', coordinates: [30.123456, 40.654321] },
      consumptionPattern: 'High',
    };
    const consumerResponse = await request(app)
      .post('/api/energyconsumers')
      .set('Authorization', token)
      .send(consumerData);
    expect(consumerResponse.status).toBe(201);
    consumer = consumerResponse.body;

    // Create a pricing structure
    const pricingStructureData = {
      name: 'Test Pricing Structure',
      description: 'Test description',
      tiers: [
        { name: 'Tier 1', unitPrice: 0.1, maxQuantity: 100 },
        { name: 'Tier 2', unitPrice: 0.2, maxQuantity: 200 },
      ],
    };
    const pricingStructureResponse = await request(app)
      .post('/api/pricingstructures')
      .set('Authorization', token)
      .send(pricingStructureData);
    expect(pricingStructureResponse.status).toBe(201);
    pricingStructure = pricingStructureResponse.body;

    // Create an energy request
    const energyRequestData = {
      consumer: consumer._id,
      producer: producer._id,
      quantity: 150,
    };
    const energyRequestResponse = await request(app)
      .post('/api/energyrequests')
      .set('Authorization', token)
      .send(energyRequestData);
    expect(energyRequestResponse.status).toBe(201);
    energyRequest = energyRequestResponse.body;

    // Approve the energy request
    const approvedEnergyRequestResponse = await request(app)
      .put(`/api/energyrequests/${energyRequest._id}`)
      .set('Authorization', token)
      .send({ status: 'approved' });
    expect(approvedEnergyRequestResponse.status).toBe(200);

    // Create a transaction
    const transactionData = {
      consumer: consumer._id,
      producer: producer._id,
      energyRequest: energyRequest._id,
      quantity: 150,
      price: 15,
    };
    const transactionResponse = await request(app)
      .post('/api/transactions')
      .set('Authorization', token)
      .send(transactionData);
    expect(transactionResponse.status).toBe(201);

    // Create energy data
    const energyDataData = {
      producer: producer._id,
      consumer: consumer._id,
      timestamp: new Date(),
      quantity: 150,
      type: 'Consumption',
    };
    const energyDataResponse = await request(app)
      .post('/api/energydata')
      .set('Authorization', token)
      .send(energyDataData);
    expect(energyDataResponse.status).toBe(201);

    // Create a reward
    const rewardData = {
      consumer: consumer._id,
      amount: 10,
      reason: 'Energy conservation',
    };
    const rewardResponse = await request(app)
      .post('/api/rewards')
      .set('Authorization', token)
      .send(rewardData);
    expect(rewardResponse.status).toBe(201);
  });
});