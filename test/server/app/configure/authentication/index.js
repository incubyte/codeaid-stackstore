const request = require('supertest');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock database and models
const db = {
  model: (modelName) => {
    return {
      findById: (id) => {
        return Promise.resolve({ id: id, sanitize: () => ({ id: id }) });
      }
    };
  }
};

// Mock app.getValue for session secret
app.getValue = (key) => {
  return { SESSION_SECRET: 'testsecret' };
};

// Mock SequelizeStore
const dbStore = new SequelizeStore({
  db: db
});
dbStore.sync();

// Session middleware with security fix
app.use(session({
  secret: app.getValue('env').SESSION_SECRET,
  store: dbStore,
  resave: false,
  saveUninitialized: false,
  name: 'my_custom_session_name',
  httpOnly: true // Security fix: Set httpOnly to true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.model('user').findById(id)
    .then(function(user) {
      done(null, user);
    })
    .catch(done);
});

// Routes
app.get('/session', function(req, res) {
  if (req.user) {
    res.send({ user: req.user.sanitize() });
  } else {
    res.status(401).send("No authenticated User");
  }
});

app.get('/logout', function(req, res) {
  req.logout();
  delete req.session.orderId;
  res.status(200).end();
});

// Test for security issue
describe('Session Cookie Security', () => {
  it('should have httpOnly flag set', (done) => {
    request(app)
      .get('/session')
      .expect('set-cookie', /httpOnly/)
      .expect(401, done);
  });
});

// Start test server
const server = app.listen(3000, () => {
  console.log('Test server running on port 3000');
});