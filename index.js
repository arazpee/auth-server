
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

mongoose.connect(config.mongoURL);

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
router(app);

app.get('*', function (req, res, next) {
  res.status(404).send('you are wrong guy');
})
app.use(function (err, req, res, next) {
  res.json({
    'err': 'err kub',
  });
})

const port = process.env.PORT || 3090;
app.listen(port);
console.log('Server listening on:', port);
