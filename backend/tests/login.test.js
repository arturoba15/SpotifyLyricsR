const request = require('supertest');
const app = require('../app');

describe('Login router', () => {
  describe('/login', () => {
    test('redirects successfully', (done) => {
      request(app)
        .get('/api/login')
        .expect(302)
        .end(done);
    });

    test('sets \'spotify_auth_state\' cookie', async (done) => {
      const spotifyRes = await request(app).get('/api/login');
      const cookies = spotifyRes.res.headers['set-cookie'].map(e => e.split('=')[0]);

      expect(cookies).toContain('spotify_auth_state');
      done();
    });
  });
});
