const request = require('supertest');
const app = require('../app');

describe('create movies', () => {
  test('should create task correctly', async () => {
    const response = await request(app).post('/movies')
      .send({
        name: 'starwar'
      })
      .expect(201);

    expect(response.body).not.toBeNull();
  });
});
