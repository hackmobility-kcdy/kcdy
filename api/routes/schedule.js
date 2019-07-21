const express = require("express");
const scheduleRouter = express.Router();

const utilityProviderMap = {
  "PG&E": {
    off_peak: ""
  }
};

/*
Input:
  - userId
  - vehicleId
  - location
  - batteryStatus
  - vehicleType
*/
scheduleRouter.post("/", async (req, res) => {
  /*
  Output:
    - userId
    - vehicleId
    - startTime
    - endTime
  */
  res.json();
});

module.exports = scheduleRouter;
