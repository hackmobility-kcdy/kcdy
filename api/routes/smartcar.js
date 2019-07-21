const express = require("express");
const smartcar = require("smartcar");
const smartcarRouter = express.Router();

const client = new smartcar.AuthClient({
  clientId: process.env.SMARTCAR_CLIENT_ID,
  clientSecret: process.env.SMARTCAR_CLIENT_SECRET,
  redirectUri: process.env.SMARTCAR_REDIRECT_URI,
  scope: [
    "read_vehicle_info",
    "read_location",
    "read_odometer",
    "control_security",
    "read_fuel",
    "read_charge",
    "read_battery"
  ],
  testMode: true
});

let access;

smartcarRouter.get(`/login`, (req, res) => {
  const link = client.getAuthUrl();
  res.redirect(link);
});

smartcarRouter.get(`/exchange`, function(req, res) {
  const code = req.query.code;

  console.log(code);

  return client.exchangeCode(code).then(function(_access) {
    // in a production app you'll want to store this in some kind of persistent storage
    access = _access;
    console.log("access code: ", access);

    res.sendStatus(200);
  });
});

smartcarRouter.get(`/vehicle`, () => {
  // return smartcar.getVehicleIds(access.accessToken)
  return smartcar
    .getVehicleIds(process.env.SMARTCAR_ACCESS_TOKEN)
    .then(function(data) {
      // the list of vehicle ids
      return data.vehicles;
    })
    .then(function(vehicleIds) {
      // instantiate the first vehicle in the vehicle id list
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);

      return vehicle.info();
    })
    .then(function(info) {
      console.log(info);
      // {
      //   "id": "36ab27d0-fd9d-4455-823a-ce30af709ffc",
      //   "make": "TESLA",
      //   "model": "Model S",
      //   "year": 2014
      // }

      res.json(info);
    });
});

module.exports = smartcarRouter;

// api/smartcar
// api/smartcar/charge
// GET: get charge status
// POST: begin charge
// api/smartcar/connect
