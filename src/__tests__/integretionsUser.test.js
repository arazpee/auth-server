const request = require('supertest');
const { beforeEach, token1 } = require('./helper/db');
const User = require('../models/user')
const app = require('../app');

jest.setTimeout(20000);
beforeEach(beforeEach);

describe('sign up', () => {
  test('should sign up correctly', async () => {
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
});
