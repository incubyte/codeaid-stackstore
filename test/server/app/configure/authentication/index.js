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
  model: (name) => {
    if (name === 'user') {
      return {
        findById: (id) => Promise.resolve({ id: id, sanitize: () => ({ id: id }) })
      };
    }
    return null;
  }
};

// Mock app.getValue function
app.getValue = (key) => {
  if (key === 'env') {
    return { SESSION_SECRET: 'testsecret' };
  }
  return null;
};

// Mock SequelizeStore
const dbStore = new SequelizeStore({
  db: db
});
dbStore.sync();

// Session middleware with expiration set
app.use(session({
  secret: app.getValue('env').SESSION_SECRET,
  store: dbStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + (30 * 86400 * 1000)) // 30 days
  }
}));

// Initialize passport and session
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

// Test to check if the session cookie expires as expected
describe('Session Cookie Expiration', () => {
  it('should set a cookie with an expiration date', (done) => {
    request(app)
      .get('/session')
      .expect('set-cookie', /expires/, done);
  });
});

// Routes for testing
app.get('/session', (req, res) => {
  if (req.user) {
    res.send({ user: req.user.sanitize() });
  } else {
    res.status(401).send("No authenticated User");
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  delete req.session.orderId;
  res.status(200).end();
});

// Start the tests
request(app)
  .get('/session')
  .end((err, res) => {
    if (err) throw err;
  });