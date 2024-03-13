const request = require('supertest');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const db = require('./db'); // Assuming there is a db module to import

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mocking app.getValue for session secret
app.getValue = () => ({ SESSION_SECRET: 'testsecret' });

// Mocking db.model to return fake models
db.model = (modelName) => {
  return {
    findById: (id) => Promise.resolve({ id, sanitize: () => ({ id }) }),
  };
};

// Mocking SequelizeStore
const dbStore = new SequelizeStore({
  db: db,
});

// Mocking passport strategies
const ENABLED_AUTH_STRATEGIES = [
  'local',
  'google',
];

ENABLED_AUTH_STRATEGIES.forEach((strategyName) => {
  passport.use(strategyName, new (require('passport-mock-strategy'))());
});

// Including the user's code with the security issue
require('./userCode')(app, db);

describe('Session Cookie Domain Test', () => {
  it('should not set a domain for the session cookie', (done) => {
    request(app)
      .get('/session')
      .expect('set-cookie', /my_custom_session_name/)
      .end((err, res) => {
        if (err) return done(err);
        const cookies = res.headers['set-cookie'][0].split(';');
        const hasDomain = cookies.some((cookie) => cookie.trim().startsWith('Domain='));
        expect(hasDomain).toBe(false);
        done();
      });
  });
});