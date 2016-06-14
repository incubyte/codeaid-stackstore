'use strict';

const express = require('express');
const router = express.Router();
var _ = require('lodash');
var User = require('../../db').model('user');

module.exports = router;


var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};



router.param('id', function(req, res, next, id) {
    User.findById(id)
        .then(function(user) {
            if (!user) throw HttpError(404);
            req.requestedUser = user;
            next();
        })
        .catch(next);
});

// Get ALL users for admin
router.get('/', /*ensureAuthenticated, */ function(req, res, next) {
    //if (req.user.isAdmin) {
    User.findAll()
        .then(function(allUsersForAdmin) {
            res.json(allUsersForAdmin);
        })
        .catch(next);
    // } else {
    //     res.sendStatus(403);
    //}
});

// Get ONE user by id
router.get('/:id', function(req, res, next) {
    // if (req.user.isAdmin || req.user === req.params.id) {
    User.findById(req.params.id)
        .then(function(theCurrentUser) {
            res.json(theCurrentUser);
        })
        .catch(next);
    // } else {
    //     res.sendStatus(403);
    // }
});


// Create ONE user
router.post('/', function(req, res, next) {
    User.create(req.body)
        .then(function(newUserCreated) {
            res.status(201).send(newUserCreated);
        })
        .catch(next);
});


// Update ONE user 
router.put('/:id', function(req, res, next) {
    //if (req.user.isAdmin || req.user === req.params.id) {
    User.findById(req.params.id)
        .then(function(existingUser) {
            return existingUser.update({
                shippingStreetAddress: req.body.shipping.address,
                shippingCity: req.body.shipping.city,
                shippingState: req.body.shipping.state,
                shippingZip: req.body.shipping.zip,
                billingStreetAddress: req.body.billing.address,
                billingCity: req.body.billing.city,
                billingState: req.body.billing.state,
                billingZip: req.body.billing.zip
            });
        })
        .then(function(userUpdated) {
            res.status(201).json(userUpdated);
        })
        // .then(function(serverResponse) {
        //     res.sendStatus(201);
        // })
        .catch(next);
    // } else {
    //     res.sendStatus(403);
    // }
});



// Delete ONE user
router.delete('/:id', function(req, res, next) {
    // if (req.user.isAdmin || req.user === req.params.id) { 
    User.findById(req.params.id)
        .then(function(response) {
            return response.destroy();
        })
        .then(function(response) {
            res.sendStatus(204);
        })
        .catch(next);
    // } else {
    //     res.sendStatus(403);
    // }
});
