// Instantiate all models

process.env.NODE_ENV = 'testing';
//We are changing the environment to testing in order to switch to the testing database (see server/env/index.js)

var expect = require('chai').expect;
var should = require('chai').should;
var Sequelize = require('sequelize');
var supertest = require('supertest');

var db = require('../../../server/db');

describe('Cart Routes', function() {
    var app, Cart, User, agent, Dream, aDream;

    beforeEach('Sync DB', function() {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function() {
        app = require('../../../server/app')(db);
        Cart = db.model('orders');
        User = db.model('user');
        Dream = db.model('dream');
        agent = supertest.agent(app);
    });

    beforeEach('Create a dream', function(done) {
        return Dream.create({
            title: 'Hopes and Dreams',
            description: 'Everything you want',
            price: 12.33,
            quantity: 1,
            category: ["hi", "bye"],
            photo: "I'm a photo :)"
        }).then(function(dream) {
            aDream = dream;
            done();
        }).catch(done);
    });

    beforeEach('Create a user', function(done) {


        return User.create({
            name: "Lorem Ipsum",
            photo: "CoolPic.jpg",
            phone: "1234567890",
            email: "coolemail@abc.com",
            password: "p@$$w0rD"
        }).then(function(theUser) {
            Cart.create({ status: 'Pending' })
                .then(function(cart) {
                    cart.setUser(theUser);
                    cart.addDream(aDream);
                    done();
                })
        }).catch(done);
    })

    describe("Request for a user\'s cart", function() {
        it('should get a 200 response with the correct cart as the body', function(done) {
            agent.get('/api/cart/1').expect(200).end(function(err, response) {
                if (err) return done(err);
                console.log("Am I a cart????", response.body)
                expect(response.body).to.be.an('object');
                expect(response.body.userId).to.equal(1);
                done();
            });
        });
    });
});
