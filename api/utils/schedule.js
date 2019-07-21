const dayjs = require("dayjs");
const groupBy = require("lodash.groupby");

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
const HOURS_AVAILABLE_TO_CHARGE = 19; // if start charging at 8pm

// source: https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary (ew)
const roundToTwo = num => +(Math.round(num + "e+2") + "e-2");
const between = (x, min, max) => x >= min && x < max;

// bands [{start, end, coefficient}]
const getCurrentBand = (bands, time) =>
  bands.find(band => between(time, band.start, band.end));

const calculateChargingSchedule = utilityProvider => {
  const currentDate = dayjs();
  const currentTime =
    currentDate.hour() + roundToTwo(currentDate.minute() / 100);

  const stepSize = 1;
  const provider = utilityProviderMap[utilityProvider];
  const bands = Object.values(provider);
  const weights = [];

  let hoursCharged = 0;
  let time = currentTime;
  let currentBand = getCurrentBand(bands, time);

  while (hoursCharged < HOURS_AVAILABLE_TO_CHARGE) {
    while (
      currentBand === getCurrentBand(bands, time) &&
      hoursCharged < HOURS_AVAILABLE_TO_CHARGE
    ) {
      weights.push({
        start: time,
        end: time + stepSize,
        coefficient: currentBand.coefficient
      });
      time += stepSize;
      hoursCharged += stepSize;
    }
    currentBand = getCurrentBand(bands, time);
  }

  // source: https://stackoverflow.com/questions/6129952/javascript-sort-array-by-two-fields
  const firstNWeights = weights
    .sort((timeA, timeB) => {
      return timeA.coefficient - timeB.coefficient || timeA.start - timeB.start;
    })
    .slice(0, AVG_CHARGE_TIME);

  return firstNWeights.reduce((weights_, weight) => {
    const [weight_] = weights_.filter(
      weight_ => weight_.coefficient === weight.coefficient
    );
    if (!weight_) {
      // first of it's kind, push in new object with start and end the same, coefficient
      weights_.push({
        start: weight.start,
        end: weight.end,
        coefficient: weight.coefficient
      });
    } else {
      // it already exists, so only update the end time
      weight_.end = weight.end;
    }
    return weights_;
  }, []);
};

// TODO: consider this optimization
// let timeOfCharge = currentDate.clone();
// const chargingCutoff = currentDate.endOf('day').add(13, 'hour');
// let time = currentTime;
// let currentBand = getCurrentBand(bands, time);
// const test = timeOfCharge.isBefore(chargingCutoff);
// timeOfCharge = timeOfCharge.add(stepSize, 'hour');
// console.log(test);
// while (timeOfCharge.isBefore(chargingCutoff)) {
//   while (currentBand === getCurrentBand(bands, time) && timeOfCharge.isBefore(chargingCutoff)) {
//     weights.push({start: time, end: time + stepSize, coefficient: currentBand.coefficient});
//     time += stepSize;
//     timeOfCharge = timeOfCharge.add(stepSize, 'hour');
//     console.log(weights);
//   }
//   currentBand = getCurrentBand(bands, time);
// }
// console.log(weights);
// return weights;
