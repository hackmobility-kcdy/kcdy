const path = require("path");
const express = require("express");
const scheduleRouter = express.Router();
const { readFileAsync } = require("../utils/helpers");
const { createVehicle } = require("../utils/smartcar");
const { calculateChargingSchedule } = require("../utils/schedule");

/*
Input:
  - userId
  - vehicleId
  - location
  - batteryStatus
  - vehicleType
  - currentDateTime

 Output:
  - userId
  - vehicleId
  - startTime
  - endTime
*/
scheduleRouter.post("/", async (req, res) => {
  // TODO: DRY this up, just request our own endpoint instead of copy pasta
  const {
    body: { vehicleId, utilityProvider }
  } = req;
  try {
    const accessToken = await readFileAsync(
      path.join(__dirname, "../data/access_token"),
      "utf-8"
    );
    const vehicle = await createVehicle(vehicleId, accessToken);
    const batteryStatus = await vehicle.battery();
    const chargingSchedule = calculateChargingSchedule(
      utilityProvider,
      batteryStatus
    );
    /*
      Here we'd have a way of communicating to our message queue that the vehicle in question
      needs to be told to start/stop charging at these times.
    */
    res.json(chargingSchedule);
  } catch (e) {
    res.json(e);
  }
});

module.exports = scheduleRouter;
