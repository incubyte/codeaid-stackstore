// Instantiate all models

process.env.NODE_ENV = 'testing';
//We are changing the environment to testing in order to switch to the testing database (see server/env/index.js)

var expect = require('chai').expect;
var should = require('chai').should;
var Sequelize = require('sequelize');
var supertest = require('supertest');

var db = require('../../../server/db');


describe('Dream Routes', function() {
    var app, Dream, agent;

    beforeEach('Sync DB', function() {
        return db.sync({ force: true });
    });


    beforeEach('Create app', function() {
        app = require('../../../server/app')(db);
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
            done();
        }).catch(done);
    });

    describe('Request for all dreams', function() {
        it('should get a 200 response with an array of ~dreams~ as the body', function(done) {
            agent.get('/api/dreams').expect(200).end(function(err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                done();
            });
        });
    });

    describe('Request for one dream', function() {
        it('should get a 200 response with an array of one ~dream~ as the body', function(done) {
            agent.get('/api/dreams/1').expect(200).end(function(err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.property('title');
                expect(response.body.title).to.equal('Hopes and Dreams');
                expect(response.body.id).to.equal(1);
                done();
            });
        });
    });

    describe('Request for a dream category', function() {
        it('get a 200 response with an array of all ~dreams~ in the category', function(done) {
            agent.get('/api/dreams/category/hi').expect(200).end(function(err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body[0].category.length).to.equal(2);
                expect(response.body[0].category[0]).to.equal('hi');
                done();
            });
        });
    });
});
