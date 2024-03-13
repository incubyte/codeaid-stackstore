'use strict';
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var ENABLED_AUTH_STRATEGIES = [
    'local',
    //'twitter',
    //'facebook',
    'google'
];

module.exports = function(app, db) {

    var dbStore = new SequelizeStore({
        db: db
    });

    var User = db.model('user');
    var Order = db.model('orders');
    dbStore.sync();

    app.use(session({
        secret: app.getValue('env').SESSION_SECRET,
        store: dbStore,
        resave: false,
        saveUninitialized: false,
        name: 'my_custom_session_name', // Set a custom name for the session cookie
        cookie: {
            domain: 'yourdomain.com', // Set the domain to your domain
            path: '/',
            httpOnly: true,
            secure: app.getValue('env').NODE_ENV === 'production', // Set secure to true if the app is in production
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .then(function(user) {
                done(null, user);
            })
            .catch(done);
    });

    app.get('/session', function(req, res) {
        if (req.user) {
            res.send({ user: req.user.sanitize() })
        } else {
            res.status(401).send("No authenticated User");
        }
    });

    app.get('/logout', function(req, res) {
        req.logout();
        delete req.session.orderId
        res.status(200).end();
    });

    ENABLED_AUTH_STRATEGIES.forEach(function(strategyName) {
        require(path.join(__dirname, strategyName))(app, db);
    });

};