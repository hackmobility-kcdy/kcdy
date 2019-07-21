const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const appendFileAsync = promisify(fs.appendFile);

module.exports = {
  readFileAsync,
  writeFileAsync,
  appendFileAsync
};
