const path = require("path");
const express = require("express");
const smartcarRouter = express.Router();
const {
  client,
  fetchVehicles,
  createVehicle,
  fetchVehicleInfo,
  exchangeCode,
  exchangeRefreshToken
} = require("../utils/smartcar");
const {
  readFileAsync,
  writeFileAsync,
  appendFileAsync
} = require("../utils/helpers");

smartcarRouter.get(`/login`, (req, res) => {
  const link = client.getAuthUrl();
  res.redirect(link);
});

smartcarRouter.get(`/exchange`, async (req, res) => {
  const code = req.query.code;
  try {
    const access = await exchangeCode(code);
    await writeFileAsync(
      path.join(__dirname, "../data/access_token"),
      access.accessToken
    );
    await writeFileAsync(
      path.join(__dirname, "../data/refresh_token"),
      access.refreshToken
    );
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});

smartcarRouter.post(`/exchange`, async (req, res) => {
  try {
    const access = await exchangeRefreshToken(code);
    await writeFileAsync(
      path.join(__dirname, "../data/access_token"),
      access.accessToken
    );
    await writeFileAsync(
      path.join(__dirname, "../data/refresh_token"),
      access.refreshToken
    );
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});

smartcarRouter.get(`/vehicles`, async (req, res) => {
  try {
    const accessToken = await readFileAsync(
      path.join(__dirname, "../data/access_token"),
      "utf-8"
    );
    const vehicles = await fetchVehicles(accessToken);
    res.json(vehicles);
  } catch (e) {
    res.json(e);
  }
});

smartcarRouter.get(`/vehicles/:id`, async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const accessToken = await readFileAsync(
      path.join(__dirname, "../data/access_token"),
      "utf-8"
    );
    const vehicle = await createVehicle(vehicleId, accessToken);
    const vehicleInfo = await fetchVehicleInfo(vehicle);
    res.json(vehicleInfo);
  } catch (e) {
    res.json(e);
  }
});

smartcarRouter.get(`/vehicles/:id/battery`, async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const accessToken = await readFileAsync(
      path.join(__dirname, "../data/access_token"),
      "utf-8"
    );
    const vehicle = await createVehicle(vehicleId, accessToken);
    const batteryStatus = await vehicle.battery();
    res.json(batteryStatus);
  } catch (e) {
    res.json(e);
  }
});

smartcarRouter.post(`/vehicles/:id/battery`, async (req, res) => {
  /*
    We would queue requests to this endpoint upon calculated via our
    scheduling API.
  */
  res.sendStatus(200);
});

/*
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
*/

module.exports = smartcarRouter;
