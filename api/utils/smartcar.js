const smartcar = require("smartcar");

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

const fetchVehicles = async accessToken =>
  await smartcar.getVehicleIds(accessToken);

const createVehicle = (id, accessToken) =>
  new smartcar.Vehicle(id, accessToken);

const fetchVehicleInfo = async vehicle => await vehicle.info();

const exchangeCode = async code => await client.exchangeCode(code);

const exchangeRefreshToken = async refreshToken =>
  await client.exchangeRefreshToken(refreshToken);

module.exports = {
  client,
  fetchVehicles,
  createVehicle,
  fetchVehicleInfo,
  exchangeCode,
  exchangeRefreshToken
};
