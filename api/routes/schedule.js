const dayjs = require("dayjs");
const express = require("express");
const scheduleRouter = express.Router();
console.log(dayjs());
// const utilityProviderMap = {
//   "PG&E": {
//     off_peak: {
//       start: 0, // 00:00
//       end: 54000000 // 15:00 - 15 hours (in milliseconds) after midnight
//     },
//     mid_peak_day: {
//       start: 54000001,
//       end: 57600000
//     },
//     peak: {
//       start: 57600001,
//       end: 75600000
//     },
//     mid_peak_night: {
//       start: 75600001,
//       end: 86399999
//     }
//   }
// };

const utilityProviderMap = {
  "PG&E": {
    off_peak: {
      start: 0,
      end: 15,
      coefficient: 0.5
    },
    mid_peak_day: {
      start: 15,
      end: 16,
      coefficient: 5
    },
    peak: {
      start: 16,
      end: 21,
      coefficient: 50
    },
    mid_peak_night: {
      start: 21,
      end: 24,
      coefficient: 5
    }
  }
};

const AVG_CHARGE_TIME = 6; // assumption

// ew: https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
const roundToTwo = num => +(Math.round(num + "e+2") + "e-2");

// const currenDate = dayjs();
// console.log(roundToTwo(currenDate.minute() / 100));
const calculateChargingSchedule = utilityProvider => {
  const chargingSchedule = [];
  const currentDate = dayjs();
  const currentTime =
    currentDate.hour() + roundToTwo(currentDate.minute() / 100);

  let time = currentTime;
  const stepSize = 1;
  const bands = utilityProviderMap[utilityProvider];
  const weights = [];

  while (time < AVG_CHARGE_TIME) {
    // find the current band that we're in
    // while we're in the current band && time < avg_charge_time
    // push into weights an object { coefficient, start, end }
    // increment time by stepSize
  }
};

/*
Input:
  - userId
  - vehicleId
  - location
  - batteryStatus
  - vehicleType
  - currentDateTime
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
