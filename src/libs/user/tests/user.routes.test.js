const mongoose = require('mongoose');
const request = require('supertest');

const testDB = 'mongodb://localhost/ribbit3-test';
const app = require('../../../app');

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
    it('Can request registration page', async () => {
      await request(server)
        .get('/user/register')
        .expect(200);
    });
    it('Can register users', async () => {
      await request(server)
        .post('/user/register')
        .send({
          username: 'igor',
          password: 'howyoudoin'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200);
    });
    it('Fails if username is missing in post users', async () => {
      await request(server)
        .post('/api/user')
        .send({
          password: 'howyoudoin'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(500);
    });
    it('Fails if password name is missing in post users', async () => {
      await request(server)
        .post('/api/user')
        .send({
          userame: 'hi there'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(500);
    });
    it('Fails if username and password is missing in post users', async () => {
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
