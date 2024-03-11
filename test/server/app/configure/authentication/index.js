const request = require('supertest');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock database and User model
const db = {
  model: (modelName) => {
    if (modelName === 'user') {
      return {
        findById: (id) => Promise.resolve({ id: id, sanitize: () => ({ id: id }) })
      };
    }
    return null;
  }
};

// Mock SequelizeStore
const dbStore = new SequelizeStore({
  db: db
});

// Mock session secret
app.getValue = () => ({
  env: {
    SESSION_SECRET: 'testsecret'
  }
});

// Mock passport strategies
const ENABLED_AUTH_STRATEGIES = [
  'local',
  'google'
];

// Mock strategy registration
ENABLED_AUTH_STRATEGIES.forEach((strategyName) => {
  app[strategyName] = (app, db) => {};
});

// Session middleware setup with a custom cookie name
app.use(session({
  secret: app.getValue('env').SESSION_SECRET,
  store: dbStore,
  resave: false,
  saveUninitialized: false,
  name: 'custom_cookie_name' // Custom cookie name for security
}));

app.use(passport.initialize());
app.use(passport.session());

// Mock serializeUser and deserializeUser
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.model('user').findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

// Test to check if the custom session cookie name is being used
describe('Session Cookie Name Test', () => {
  it('should use a custom session cookie name', (done) => {
    request(app)
      .get('/session')
      .expect('set-cookie', /custom_cookie_name/, done);
  });
});

// Start the test
request(app)
  .get('/session')
  .end((err, res) => {
    if (err) throw err;
  });