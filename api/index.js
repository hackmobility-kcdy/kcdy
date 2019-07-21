require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/build")));

const { BASE_URI } = require("./CONSTANTS");

const { smartcarRouter, scheduleRouter } = require("./routes");

app.use(bodyParser.json());
app.use(`${BASE_URI}/smartcar`, smartcarRouter);
app.use(`${BASE_URI}/schedule`, scheduleRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
