const mongoose = require('mongoose');
const request = require('supertest');

const testDB = 'mongodb://localhost/ribbit3-test';
const app = require('../app');

describe('App test', () => {
  it('Module defined', () => {
    expect(app).toBeDefined();
  });

  let server;

  beforeAll(async () => {
    await mongoose.connect(testDB);
    server = await app.listen(3001);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe('User routes test', () => {
    it('Can list users', async () => {
      await request(server)
        .get('/api/user')
        .expect(200);
    });
    it('Can post users', async () => {
      await request(server)
        .post('/api/user')
        .send({
          firstName: 'hithere',
          lastName: 'howyoudoin'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200);
    });
    it('Fails if first name is missing in post users', async () => {
      await request(server)
        .post('/api/user')
        .send({
          lastName: 'howyoudoin'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(500);
    });
    it('Fails if last name is missing in post users', async () => {
      await request(server)
        .post('/api/user')
        .send({
          firstName: 'hi there'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(500);
    });
    it('Fails if birthday and name is missing in post users', async () => {
      await request(server)
        .post('/api/user')
        .expect(500);
    });
  });
  describe('404', () => {
    it('returns 404', async () => {
      await request(server)
        .post('/fail')
        .expect(404);
    });
  });
});
