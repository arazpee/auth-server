const mongoose = require('mongoose');
const User = require('../../models/user');
const jwt = require('jwt-simple');
const config = require('../../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

const userId1 = new mongoose.Types.ObjectId()
const user1 = {
    _id: userId1,
    email: 'mike@example.com',
    password: '1234567!',
}

const beforeEach = async () => {
  await User.deleteMany();
  await new User(user1).save();
};

module.exports = {
  beforeEach,
  user1,
  // token1
};
