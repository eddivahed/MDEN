const EnergyData = require("../models/energyDataModel");

// Create new energy data
const createEnergyData = async (req, res) => {
  try {
    const { producer, consumer, timestamp, quantity, type } = req.body;

    // Create a Date object from the timestamp
    const timestampDate = new Date(timestamp);

    // Convert the timestamp to UTC
    const utcTimestamp = timestampDate.toUTCString();
    const utcDate = new Date(utcTimestamp);

    // Extract the hour and minute from the UTC date
    const hour = utcDate.getUTCHours();
    const minute = utcDate.getUTCMinutes();

    // console.log("Extracted hour:", hour);
    // console.log("Extracted minute:", minute);

    // Determine the consumption type based on the hour
    let consumptionType;
    if (hour >= 19 && hour <= 21) {
      consumptionType = "peak";
    } else if (
      (hour >= 10 && hour <= 17) ||
      hour === 18 ||
      (hour >= 22 && hour <= 23)
    ) {
      consumptionType = "semi-peak";
    } else {
      consumptionType = "off-peak";
    }

    // Extract the month and year from the timestamp
    const month = timestampDate.getMonth() + 1;
    const year = timestampDate.getFullYear();

    const energyData = new EnergyData({
      producer,
      consumer,
      timestamp,
      quantity,
      type,
      consumptionType,
      month,
      year,
    });

    const savedEnergyData = await energyData.save();
    res.status(201).json(savedEnergyData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the energy data" });
  }
};

// Get all energy data
const getAllEnergyData = async (req, res) => {
  try {
    const energyData = await EnergyData.find()
      .populate("producer")
      .populate("consumer");
    res.json(energyData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving energy data" });
  }
};

// Get energy data by ID
const getEnergyDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const energyData = await EnergyData.findById(id)
      .populate("producer")
      .populate("consumer");
    if (!energyData) {
      return res.status(404).json({ error: "Energy data not found" });
    }
    res.json(energyData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the energy data" });
  }
};

// Update energy data by ID
const updateEnergyData = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, type } = req.body;
    const updatedEnergyData = await EnergyData.findByIdAndUpdate(
      id,
      { quantity, type, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedEnergyData) {
      return res.status(404).json({ error: "Energy data not found" });
    }
    res.json(updatedEnergyData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the energy data" });
  }
};

// Delete energy data by ID
const deleteEnergyData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEnergyData = await EnergyData.findByIdAndDelete(id);
    if (!deletedEnergyData) {
      return res.status(404).json({ error: "Energy data not found" });
    }
    res.json({ message: "Energy data deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the energy data" });
  }
};

// Calculate the Negative Energy
const calculateNegativeConsumptionAndRewards = async (req, res) => {
  try {
    const { consumerId, year, month } = req.body;
    // console.log("Extracted year:", year);
    // console.log("Extracted month:", month);
    // console.log("Extracted consumerId:", consumerId);

    const getMonthStartEnd = (year, month) => {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      return { startDate, endDate };
    };

    const { startDate, endDate } = getMonthStartEnd(year, month);
    // console.log("Extracted startDate:", startDate);
    // console.log("Extracted endDate:", endDate);

    const { startDate: prevStartDate, endDate: prevEndDate } = getMonthStartEnd(
      year,
      month - 1
    );
    // console.log("Extracted prevStartDate:", prevStartDate);
    // console.log("Extracted prevEndDate:", prevEndDate);

    // Retrieve the energy consumption data for the current month
    // console.log("Consumer ID:", consumerId);
    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);
    // console.log("Consumption Type:", "peak");
    const currentMonthData = await EnergyData.find({
      consumer: consumerId,
      timestamp: { $gte: startDate, $lte: endDate },
      consumptionType: "peak",
    }).exec();
    // console.log("Extracted currentMonthData:", currentMonthData);

    // Retrieve the energy consumption data for the previous month
    const previousMonthData = await EnergyData.find({
      consumer: consumerId,
      timestamp: { $gte: prevStartDate, $lte: prevEndDate },
      consumptionType: "peak",
    }).exec();
    // console.log("Extracted previousMonthData:", previousMonthData);

    const calculateTotalConsumption = (data) => {
      return data.reduce((total, entry) => total + entry.quantity, 0);
    };

    const currentMonthConsumption = calculateTotalConsumption(currentMonthData);
    const previousMonthConsumption =
      calculateTotalConsumption(previousMonthData);

    const negativeConsumption =
      previousMonthConsumption - currentMonthConsumption;
    const rewards = negativeConsumption > 0 ? negativeConsumption : 0;

    res.json({ negativeConsumption, rewards });
  } catch (error) {
    res.status(500).json({
      error:
        "An error occurred while calculating negative consumption and rewards",
    });
  }
};

module.exports = {
  createEnergyData,
  getAllEnergyData,
  getEnergyDataById,
  updateEnergyData,
  deleteEnergyData,
  calculateNegativeConsumptionAndRewards,
};
