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
    "read_battery",
    "control_security",
    "control_security:unlock",
    "control_security:lock"
  ]
  // testMode: true
});

const fetchVehicle = async () => {
  const { vehicles: vehicleIds } = await smartcar.getVehicleIds(
    process.env.SMARTCAR_ACCESS_TOKEN
  );
  return new smartcar.Vehicle(vehicleIds[0], process.env.SMARTCAR_ACCESS_TOKEN);
};

// TODO: access.accessToken, access.refreshToken
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

// TODO: have this actually get all vehicle info, currently just gets first vehicle in list
smartcarRouter.get(`/vehicles`, async (req, res) => {
  const { vehicles: vehicleIds } = await smartcar.getVehicleIds(
    process.env.SMARTCAR_ACCESS_TOKEN
  );
  const vehicle = new smartcar.Vehicle(
    vehicleIds[0],
    process.env.SMARTCAR_ACCESS_TOKEN
  );
  const vehicleInfo = await vehicle.info();
  res.json(vehicleInfo);
});

smartcarRouter.get(`/vehicle/:id/battery`, async (req, res) => {
  const { vehicles: vehicleIds } = await smartcar.getVehicleIds(
    process.env.SMARTCAR_ACCESS_TOKEN
  );
  const vehicle = new smartcar.Vehicle(
    vehicleIds[0],
    process.env.SMARTCAR_ACCESS_TOKEN
  );
  const batteryStatus = await vehicle.battery();
  res.json(batteryStatus);
});

smartcarRouter.post(`/vehicle/:id/battery`, async (req, res) => {
  console.log("hand wavey POST for starting/stopping car charge");
  res.sendStatus(200);
});

smartcarRouter.post(`/vehicle/:id/lock`, async (req, res) => {
  const vehicle = await fetchVehicle();
  const lockStatus = await vehicle.lock();
  res.json(lockStatus);
});

smartcarRouter.post(`/vehicle/:id/unlock`, async (req, res) => {
  const vehicle = await fetchVehicle();
  const unlockStatus = await vehicle.lock();
  res.json(unlockStatus);
});

module.exports = smartcarRouter;
