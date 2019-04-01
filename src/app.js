const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authRouter = require('./routers/authRouter');
const movieRouter = require('./routers/movieRouter');

mongoose.connect(config.mongoURL);

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
authRouter(app);
movieRouter(app);

app.get('*', function (req, res, next) {
  res.status(404).send('This page is not found');
})

app.use(function (err, req, res, next) {
  res.json({
    'err': err
  });
})

module.exports = app;
