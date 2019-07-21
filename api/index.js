require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

const { BASE_URI } = require("./CONSTANTS");
app.use(express.static(path.join(__dirname, "../frontend/build")));
const { smartcarRouter, scheduleRouter } = require("./routes");

app.use(bodyParser.json());
app.use(`${BASE_URI}/smartcar`, smartcarRouter);
app.use(`${BASE_URI}/schedule`, scheduleRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
