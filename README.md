# Energy Distribution Platform

The Energy Distribution Platform is a backend application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to facilitate the management and distribution of energy in a peer-to-peer network, enabling energy producers and consumers to interact seamlessly.

## Features

- User registration and authentication using JWT (JSON Web Tokens)
- CRUD operations for energy producers, consumers, requests, transactions, rewards, pricing structures, and energy data
- Categorization of energy consumption based on peak, semi-peak, and off-peak hours
- Calculation of negative energy consumption and rewards based on consumption patterns
- Integration with a permissioned blockchain (e.g., Hyperledger Fabric) for secure and transparent energy transactions
- RESTful API endpoints for easy integration with frontend applications

## Technologies Used

- MongoDB: A NoSQL database for storing application data
- Express.js: A web application framework for building APIs
- Node.js: A JavaScript runtime environment for server-side development
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js
- JSON Web Tokens (JWT): A standard for securely transmitting information between parties as a JSON object
- Bcrypt: A library for hashing passwords
- Hyperledger Fabric: A permissioned blockchain framework for secure and transparent transactions
- Jest: A JavaScript testing framework for unit and integration tests
- Supertest: A library for testing HTTP requests in Node.js

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- MongoDB (version X.X.X)
- Hyperledger Fabric (version X.X.X)

### Installation

1. Clone the repository:
https://github.com/eddivahed/MDEN.git

2. Navigate to the project directory:
cd root folder of project

3. Install the dependencies:
npm install

4. Set up the environment variables:
- Create a `.env` file in the root directory.
- Define the following variables in the `.env` file:
  ```
  MONGODB_URI=your-mongodb-connection-url
  JWT_SECRET=your-jwt-secret-key
  ```

5. Start the development server:
npm run dev

6. The server should now be running on `http://localhost:3000`.

### API Documentation

The API endpoints and their usage are documented in the [API Documentation](howToTest.md) file.

### Testing

To run the test suite, use the following command:
npm test

### Deployment

To deploy the application to a production environment, follow the deployment instructions in the [Deployment Guide](docs/deployment.md).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request. For more information, please see the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
