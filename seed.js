/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Dream = db.model('dream');
var Review = db.model('reviews');
var Promise = require('sequelize').Promise;

var seedUsers = function() {

    var users = [{
        email: 'testing@fsa.com',
        password: 'password'
    }, {
        email: 'obama@gmail.com',
        password: 'potus'
    }];

    var creatingUsers = users.map(function(userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedDreams = function() {

    var dreams = [{
        title: 'Hopes and Dreams',
        description: 'Everything you want',
        price: 12.33,
        quantity: 1,
        category: ["hi", "bye"],
        photo: "I'm a photo :)"
    }, {
        title: 'Dreams Come True',
        description: 'But only sometimes',
        price: 85.00,
        quantity: 12,
        category: ["LifeGoals", "bye"],
        photo: "I'm a photo :-|"
    }, {
        title: "Shoot for the moon; if you miss you'll land amongst the stars.",
        description: 'Galactic',
        price: 100.00,
        quantity: 12,
        category: ["hi"],
        photo: "I'm a photo"
    }];

    var creatingDreams = dreams.map(function(dreamObj) {
        return Dream.create(dreamObj);
    });

    return Promise.all(creatingDreams);

};

var seedReviews = function() {

    var reviews = [{
        title: "Perfect sleep accessory!",
        productId: 1,
        stars: 5,
        text: "This is the BEST dream I've ever had. Will definitely buy again!"
    }];

    var creatingReviews = reviews.map(function(reviewObj) {
        return Review.create(reviewObj);
    });

    return Promise.all(creatingReviews);
}

db.sync({ force: true })
    .then(function() {
        return seedUsers();
    })
    .then(function() {
        return seedDreams();
    })
    .then(function() {
        return seedReviews();
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function(err) {
        console.error(err);
        process.kill(1);
    });
