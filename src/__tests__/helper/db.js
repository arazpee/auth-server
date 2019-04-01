const mongoose = require('mongoose');
const User = require('../../models/user');
const Movie = require('../../models/movie');
const jwt = require('jwt-simple');
const config = require('../../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

const userId1 = new mongoose.Types.ObjectId();
const user1 = {
  _id: userId1,
  email: 'mike@example.com',
  password: '1234567!',
};

const movieId1 = new mongoose.Types.ObjectId();
const movie1 = {
  _id: movieId1,
  name: 'starwar'
}

const movieId2 = new mongoose.Types.ObjectId();
const movie2 = {
  _id: movieId2,
  name: 'avenger'
}

const movieId3 = new mongoose.Types.ObjectId();
const movie3 = {
  _id: movieId3,
  name: 'ironman'
}

const movieId4 = new mongoose.Types.ObjectId();
const movie4 = {
  _id: movieId4,
  name: 'memento'
}

const beforeEach = async () => {
  await User.deleteMany();
  await Movie.deleteMany();
  await new User(user1).save();
  await new Movie(movie1).save();
  await new Movie(movie2).save();
  await new Movie(movie3).save();
  await new Movie(movie4).save();
};

module.exports = {
  beforeEach,
  user1,
  movie1,
  movie2,
  movie3,
  movie4
};
