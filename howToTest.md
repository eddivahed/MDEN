# Working with the Backend Application

This document provides instructions on how to interact with the backend application using the provided Postman collection.

## Postman Collection

The Postman collection file contains pre-configured API endpoints for testing and interacting with the backend application. The collection is organized into different folders based on the functionality of the endpoints.

To import the collection into Postman:

1. Copy the JSON content of the Postman collection file (`api-test-cases.json`).
2. Open Postman and click on the "Import" button.
3. Select the "Raw text" tab and paste the JSON content into the text area.
4. Click the "Import" button to import the collection into Postman.

## API Endpoints

The following API endpoints are available in the Postman collection:

### User

- **Register User**: Register a new user by sending a POST request to `/api/users` with the user details in the request body.
- **Login User**: Log in with the registered user credentials by sending a POST request to `/api/users/login` with the email and password in the request body. The response will include an authentication token.

### Energy Producer

- **Create Energy Producer**: Create a new energy producer by sending a POST request to `/api/energyproducers` with the producer details in the request body. Make sure to set the `Authorization` header with the authentication token.
- **Get All Energy Producers**: Retrieve all energy producers by sending a GET request to `/api/energyproducers` with the `Authorization` header set.

### Energy Consumer

- **Create Energy Consumer**: Create a new energy consumer by sending a POST request to `/api/energyconsumers` with the consumer details in the request body. Make sure to set the `Authorization` header with the authentication token.
- **Get All Energy Consumers**: Retrieve all energy consumers by sending a GET request to `/api/energyconsumers` with the `Authorization` header set.

### Energy Data

- **Create Energy Data**: Create new energy data by sending a POST request to `/api/energydata` with the producer ID, consumer ID, timestamp, quantity, and type in the request body. Make sure to set the `Authorization` header with the authentication token.
- **Get All Energy Data**: Retrieve all energy data by sending a GET request to `/api/energydata` with the `Authorization` header set.
- **Get Energy Data by ID**: Retrieve energy data by ID by sending a GET request to `/api/energydata/:id` with the energy data ID in the URL and the `Authorization` header set.
- **Update Energy Data**: Update energy data by sending a PUT request to `/api/energydata/:id` with the energy data ID in the URL, the updated quantity and type in the request body, and the `Authorization` header set.
- **Delete Energy Data**: Delete energy data by sending a DELETE request to `/api/energydata/:id` with the energy data ID in the URL and the `Authorization` header set.
- **Calculate Negative Consumption and Rewards**: Calculate the negative consumption and rewards for a consumer by sending a POST request to `/api/energydata/negative-consumption` with the consumer ID, year, and month in the request body. Make sure to set the `Authorization` header with the authentication token.

### Reward

- **Create Reward**: Create a new reward by sending a POST request to `/api/rewards` with the consumer ID, amount, and reason in the request body. Make sure to set the `Authorization` header with the authentication token.

### Pricing Structure

- **Create Pricing Structure**: Create a new pricing structure by sending a POST request to `/api/pricingstructures` with the pricing structure details in the request body. Make sure to set the `Authorization` header with the authentication token.

## Testing Steps

To test the APIs in the correct order, follow these steps:

1. Register a user using the "Register User" endpoint.
2. Log in with the registered user credentials using the "Login User" endpoint to obtain the authentication token.
3. Set the authentication token as an environment variable in Postman by creating a new environment and adding a variable named `token` with the value of the obtained token.
4. Create an energy producer using the "Create Energy Producer" endpoint, ensuring that the `Authorization` header is set with the `{{token}}` variable.
5. Create an energy consumer using the "Create Energy Consumer" endpoint, with the `Authorization` header set.
6. Create a pricing structure using the "Create Pricing Structure" endpoint, with the `Authorization` header set.
7. Create energy data for the current and previous months using the "Create Energy Data" endpoint, with the `Authorization` header set. Make sure to provide the necessary producer ID, consumer ID, timestamp, quantity, and type.
8. Retrieve all energy data using the "Get All Energy Data" endpoint, with the `Authorization` header set.
9. Retrieve energy data by ID using the "Get Energy Data by ID" endpoint, providing the energy data ID in the URL, and with the `Authorization` header set.
10. Update energy data using the "Update Energy Data" endpoint, providing the energy data ID in the URL, the updated quantity and type in the request body, and with the `Authorization` header set.
11. Delete energy data using the "Delete Energy Data" endpoint, providing the energy data ID in the URL, and with the `Authorization` header set.
12. Calculate the negative consumption and rewards for the consumer using the "Calculate Negative Consumption and Rewards" endpoint, providing the consumer ID, year, and month in the request body, and with the `Authorization` header set.
13. Create a reward using the "Create Reward" endpoint, providing the necessary details, and with the `Authorization` header set.

By following these steps and using the provided Postman collection, you can effectively test and interact with the backend application.

Note: Make sure to update the `{{producerId}}`, `{{consumerId}}`, `{{energyDataId}}`, and `{{timestamp}}` variables in the Postman collection with the appropriate values obtained from the previous API responses.