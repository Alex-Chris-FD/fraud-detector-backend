const request = require('supertest');
const app = require('./app');

describe('GET /data', () => {
  it('should return a 200 status code and correct data when the query is successful', async () => {
    const response = await request(app).get('/data');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body.length).toBeGreaterThan(0);
  });
});