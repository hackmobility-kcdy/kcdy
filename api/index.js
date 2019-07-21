require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(cors());

const { BASE_URI } = require("./CONSTANTS");

const { smartcarRouter, scheduleRouter } = require("./routes");

app.use(bodyParser.json());
app.use(`${BASE_URI}/smartcar`, smartcarRouter);
app.use(`${BASE_URI}/schedule`, scheduleRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
