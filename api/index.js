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

// { id: 'bf2ea914-10e1-4913-ae58-d5efd5ab3776',
//   make: 'TESLA',
//   model: 'Model S',
//   year: 2013 }
