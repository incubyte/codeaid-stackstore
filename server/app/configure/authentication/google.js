'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app, db) {

    var User = db.model('user');

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    var verifyCallback = function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        User.findOne({
                where: {
                    google_id: profile.id
                }
            })
            .then(function(user) {
                if (user) {
                    return user;
                } else {
                    return User.create({
                        google_id: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: "password"
                    });
                }
            })
            .then(function(userToLogin) {
                done(null, userToLogin);
            })
            .catch(function(err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/home', failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });

};
