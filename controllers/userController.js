const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Create a new user
    const newUser = new User({ username, email, password, role });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Log in as admin to obtain the token for registration
    const adminToken = await loginAsAdmin();

    // Make a request to the Go API's register endpoint
    await registerUserInGoAPI(username, password, adminToken);

    // Make a request to the Go API's clientAccountIDer endpoint to get the wallet ID
    const walletID = await getWalletIDFromGoAPI(username, adminToken);

    // Include the wallet ID in the response
    const response = {
      user: savedUser,
      walletID,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

const loginAsAdmin = async () => {
  try {
    const response = await axios.post("http://localhost:8082/login", {
      username: "admin",
      password: "password",
    });
    return response.data.token;
  } catch (error) {
    console.error("Error logging in as admin:", error);
    throw error;
  }
};

const registerUserInGoAPI = async (username, password, token) => {
  try {
    await axios.post(
      "http://localhost:8082/register",
      {
        username,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error registering user in Go API:", error);
    throw error;
  }
};

const getWalletIDFromGoAPI = async (username, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/accountid",
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.id;
  } catch (error) {
    console.error("Error getting wallet ID from Go API:", error);
    throw error;
  }
};

const getUserBalanceFromGoAPI = async (username, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/balance",
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.value;
  } catch (error) {
    console.error("Error getting wallet ID from Go API:", error);
    throw error;
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "Eddie@5132361");

    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.userId; // Assuming the user ID is stored in the token payload

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Log in as admin to obtain the token for registration
    const adminToken = await loginAsAdmin();

    // Get the user's wallet address from the Go API
    const walletAddress = await getWalletIDFromGoAPI(user.username, adminToken);

    // Get the user's balance 
    const userBalance = await getUserBalanceFromGoAPI(user.username, adminToken);

    // Prepare the user data response
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      userBalance: userBalance,
      walletAddress: walletAddress,
    };

    res.json(userData);
  } catch (error) {
    console.error("Error getting user data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting user data" });
  }
};

module.exports = { registerUser, loginUser, getUserData };
