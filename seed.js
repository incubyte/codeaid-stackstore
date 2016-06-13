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
        title: 'The Great Escape',
        description: 'Escape to a fantasy land of your choice',
        price: 750.00,
        quantity: 1,
        category: ["Classic", "Daydream"],
        photo: "/images/dreamdoor3.jpg"
    }, {
        title: 'Dreams Come True',
        description: 'But only sometimes',
        price: 850.00,
        quantity: 12,
        category: ["Lucid", "Recurring"],
        photo: "/images/moons.jpg"
    }, {
        title: "Galactic",
        description: 'Shoot for the moon; if you miss you\'ll land amongst the stars.',
        price: 1000.00,
        quantity: 12,
        category: ["Progressive"],
        photo: "/images/galaxy.jpg"
    }, {
        title: "Ye Olden Days",
        description: "Want to be da Vinci for a day?",
        price: 680.00,
        quantity: 9,
        category: ["Historical"],
        photo: "/images/monalisa.jpg"
    }, {
        title: "Wild Wild West",
        description: "Grab a ticket to the guns show",
        price: 400.00,
        quantity: 8,
        category: ["Epic", "Daydream"],
        photo: "/images/wildwildwest.jpg"
    }, {
        title: "How do you solve a problem like Maria?",
        description: "Gain insight and overcome any problem in your sleep",
        price: 500.00,
        quantity: 11,
        category: ["Signal"],
        photo: "/images/soundofmusic.jpg"
    }, {
        title: "Money, Money, Money",
        description: "I want to be rich!",
        price: 700.00,
        quantity: 15,
        category: ["Daydream", "Recurring", "Classic"],
        photo: "/images/monet.jpg"
    }];


    var creatingDreams = dreams.map(function(dreamObj) {
        return Dream.create(dreamObj);
    });

    return Promise.all(creatingDreams);

};

db.sync({ force: true })
    .then(function() {
        return seedUsers();
    })
    .then(function() {
        return seedDreams();
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function(err) {
        console.error(err);
        process.kill(1);
    });
