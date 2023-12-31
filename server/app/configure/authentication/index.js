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

    // First, our session middleware will set/read sessions from the request.
    // Our sessions will get stored in Mongo using the same connection from
    // mongoose. Check out the sessions collection in your MongoCLI.
    app.use(session({
        secret: app.getValue('env').SESSION_SECRET,
        store: dbStore,
        resave: false,
        saveUninitialized: false
    }));
    // Initialize passport and also allow it to read
    // the request session information.
    app.use(passport.initialize());
    app.use(passport.session());

    // When we give a cookie to the browser, it is just the userId (encrypted with our secret).
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // When we receive a cookie from the browser, we use that id to set our req.user
    // to a user found in the database.
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

    // Simple /logout route.
    app.get('/logout', function(req, res) {
        req.logout();
        delete req.session.orderId
        res.status(200).end();
    });

    // Each strategy enabled gets registered.
    ENABLED_AUTH_STRATEGIES.forEach(function(strategyName) {
        require(path.join(__dirname, strategyName))(app, db);
    });

};
