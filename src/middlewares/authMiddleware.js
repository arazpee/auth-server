const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config');

const requireAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findOne({ _id: decoded.id, tokens: token });

    if (!user) {
        res.status(400).send({ error: "You don't have permission"});
    }

    req.token = token;
    req.user = user;
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please login.' })
  }
}

module.exports = requireAuth;
