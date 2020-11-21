// const config = require("config");
const dotenv = require("dotenv");
require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const matchRouter = require("./matches/match.routes");
const errorHandler = require("./middleware/errorhandler");

const app = express();

app.use(express.json());

app.use("/matches", matchRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Not found" });
});

module.exports = app;
