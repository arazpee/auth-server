const request = require('supertest');
const app = require('../app');
const {
  beforeEach,
  user1,
  movie1,
  movie2
} = require('./helperTest/db');
const User = require('../models/user');
const Movie = require('../models/movie');

jest.setTimeout(20000);
beforeEach(beforeEach);

describe('sign up', () => {
  test('sign up and should get 201 and content has information', async () => {
    const response = await request(app).post('/signup')
      .send({
        email: 'pee@gmail.com',
        password: '12345asds!!'
      })
      .expect(201);

    expect(response.body).not.toBeNull();
  });

  test('should have data in mongoose', async () => {
    const data = await User.findOne({ email: 'pee@gmail.com'});
    expect(data).not.toBeNull();
  })
});

describe('sign in user', () => {
  test('should get code 401 when no Authorization header', async () => {
    const response = await request(app)
      .get("/secret")
      .set('Authorization', 'Bearer asdfsdfdfwer13412')
      .send()
      .expect(401);
  });

  test('sign in and have token and then have permission to view in secret route', async () => {
    const response = await request(app).post("/signin")
      .send({
        email: 'mike@example.com',
        password: '1234567!'
      })
      expect(200);

    //should have body response
    expect(response.body).not.toBeNull();
    console.log(response.body.token);
    //should have an authorization
    const data = await request(app).get('/secret')
      .set('Authorization', `Bearer ${response.body.token}`)
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
  test('should create movie correctly with auth', async () => {
    const response = await request(app).post('/movies')
      .set('Authorization', user1.tokens[0])
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

  test("should get status 401 and don't have permission to create movies", async () => {
    const response = await request(app).post('/movies')
      .set('Authorization', 'asdfsdafdsaf')
      .send({
        name: 'ben10'
      })
      .expect(401);
  });
});

describe('movies', () => {
  test('should get all movies', async () => {
    const response = await request(app).get('/movies')
      .send()
      .expect(200);
    expect(response.body.length).toEqual(5);
  });

  test('should delete movie and have correct data with auth', async () => {
    await request(app).delete(`/movies/${movie1._id}`)
      .set('Authorization', `Bearer ${user1.tokens[0]}`)
      .send()
      .expect(200);

    const data = await Movie.find();
    expect(data.length).toEqual(4);
  });

  test('should update movie correctly with auth', async () => {
    const response = await request(app).patch(`/movies/${movie2._id}`)
      .set('Authorization', `Bearer ${user1.tokens[0]}`)
      .send({
        name: 'mib'
      })
      .expect(200);
  })
})
