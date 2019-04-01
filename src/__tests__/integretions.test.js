const request = require('supertest');
const { beforeEach, movie1, movie2 } = require('./helper/db');
const User = require('../models/user')
const Movie = require('../models/movie')
const app = require('../app');

jest.setTimeout(20000);
beforeEach(beforeEach);

describe('sign up', () => {
  test('should get 201 and content has information', async () => {
    const response = await request(app).post('/signup')
      .send({
        email: 'pee@gmail.com',
        password: '1234asds!!'
      })
      expect(201);

    expect(response.body).not.toBeNull();
  });

  test('should have data in mongoose', async () => {
    const data = await User.findOne({ email: 'pee@gmail.com'});
    expect(data).not.toBeNull();
  })
});

describe('handle user', () => {
  test('should get code 401 when no Authorization header', async () => {
    const response = await request(app)
      .get("/secret")
      .set('authorization', 'asdfsdfdfwer13412')
      .send()
      .expect(401);
  });

  test('should sign in and have authorization in secret route', async () => {
    const response = await request(app).get("/signin")
      .send({
        email: 'mike@example.com',
        password: '1234567!'
      })
      expect(200);

    //should have body response
    expect(response.body).not.toBeNull();

    //should get the secret
    const data = request(app).get('/secret')
      .set('authorization', response.body.token)
      .send()
      .expect(200);
  })

  test('should not sign in when using fault password', async () => {
    const response = await request(app).post('/signin')
      .send({
        email: 'mike@example.com',
        password: 'asdfsadfsdff'
      })
      .expect(401);
  });
});

//movies test -----------------------------------------------------------------------------------------------------

describe('create movies', () => {
  test('should create movie correctly', async () => {
    const response = await request(app).post('/movies')
      .send({
        name: 'toystory'
      })
      .expect(201);

    expect(response.body).not.toBeNull();
  });

  test('should have data in mongoose', async () => {
    const data = await Movie.findOne({ name: 'toystory'});
    expect(data).not.toBeNull;
  });
});

test('should get all movies', async () => {
  const response = await request(app).get('/movies')
    .send()
    .expect(200);
  expect(response.body.length).toEqual(5);
});

test('should delete movie and have correct data', async () => {
  await request(app).delete(`/movies/${movie1._id}`)
    .send()
    .expect(200);

  const data = await Movie.find();
  expect(data.length).toEqual(4);
});

test('should update movie correctly', async () => {
  const response = await request(app).patch(`/movies/${movie2._id}`)
    .send({
      name: 'mib'
    })
    .expect(200);


})
