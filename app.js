// const config = require("config");
const dotenv = require('dotenv');
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const matchRouter = require('./matches/match.routes');
const errorHandler = require('./middleware/errorhandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./offside-swagger-api.json');

const app = express();

app.use(cors(), express.json());
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

app.use('/matches', matchRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

module.exports = app;
