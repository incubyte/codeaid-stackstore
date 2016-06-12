// Instantiate all models

process.env.NODE_ENV = 'testing';
//We are changing the environment to testing in order to switch to the testing database (see server/env/index.js)

var expect = require('chai').expect;
var should = require('chai').should;
var Sequelize = require('sequelize');
var supertest = require('supertest');

var db = require('../../../server/db');

describe('Cart Routes', function() {
    var app, Cart, User, agent;

    beforeEach('Sync DB', function() {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function() {
        app = require('../../../server/app')(db);
        Cart = db.model('cart');
        User = db.model('user');
        agent = supertest.agent(app);
    });

    beforeEach('Create a user', function(done) {
        return User.create({
            name: "Lorem Ipsum",
            photo: "CoolPic.jpg",
            phone: "1234567890",
            email: "coolemail@abc.com",
            password: "p@$$w0rD"
        }).then(function(theUser) {
            Cart.create({
                dreams: [1, 2],
                total: 1111111.00
            }).then(function(cart) {
                cart.setUser(theUser);
                done();
            }).catch(done);

        });
    });

    describe("Request for a user\'s cart", function() {
        it('should get a 200 response with the correct cart as the body', function(done) {
            agent.get('/api/cart/1').expect(200).end(function(err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.property('dreams');
                expect(response.body.dreams).to.be.an('array');
                expect(response.body.userId).to.equal(1);
                done();
            });
        });
    });
});
