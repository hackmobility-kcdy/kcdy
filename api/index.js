require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const { BASE_URI } = require("./CONSTANTS");

const { smartcarRouter } = require("./routes");

app.use(`${BASE_URI}/smartcar`, smartcarRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/schedule", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
