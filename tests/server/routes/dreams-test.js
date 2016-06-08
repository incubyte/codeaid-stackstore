// Instantiate all models

process.env.NODE_ENV ='testing'


var expect = require('chai').expect;
var Sequelize = require('sequelize');
var supertest = require('supertest');

var db = require('../../../server/db');


describe('All Dreams Route', function() {
    var app, Dream, agent;

    beforeEach('Sync DB', function() {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function() {
        app = require('../../../server/app')(db);
        //console.log("What is a ", db);
        Dream = db.model('dream');

        agent = supertest.agent(app);
    });

    // beforeEach('Create agent', function() {
    //     agent = supertest.agent(app);
    // });

    describe('Request for all dreams', function() {


        // beforeEach('Create a dream', function(done) {
        //     return Dream.create({
        //         title: 'Hopes and Dreams',
        //         description: 'Everything you want',
        //         price: 12.33,
        //         quantity: 1,
        //         category: ["hi", "bye"],
        //         photo: "I'm a photo :)"
        //     }).then(function(dream) {
        //         done();
        //     }).catch(done);
        // });

        it('should get a 200 response with an array of dreams as the body', function(done) {
            //done();
            agent.get('/api/dreams').expect(200).end(function(err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                console.log(response.body);
                done();
            });
        });

    });

});
