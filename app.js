const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const dbConfig = require('./config/db');

const energyProducerRoutes = require('./routes/energyProducerRoutes');
const energyConsumerRoutes = require('./routes/energyConsumerRoutes');
const energyRequestRoutes = require('./routes/energyRequestRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const pricingStructureRoutes = require('./routes/pricingStructureRoutes');
const energyDataRoutes = require('./routes/energyDataRoutes');



const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
dbConfig.connectDB();

// User Routes
app.use('/api/users', userRoutes);
app.use('/api/energyproducers', energyProducerRoutes);
app.use('/api/energyconsumers', energyConsumerRoutes);
app.use('/api/energyrequests', energyRequestRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/pricingstructures', pricingStructureRoutes);
app.use('/api/energydata', energyDataRoutes);



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;