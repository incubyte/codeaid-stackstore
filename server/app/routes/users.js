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


// Show all users to admin
router.get('/', /*ensureAuthenticated, */ function(req, res, next) {
    console.log("before findAll in user");
    //if(/*currentUser === 'admin'*/){
    User.findAll()
        .then(function(allUsersForAdmin) {
            res.json(allUsersForAdmin);
        })
        .catch(next);
    // }
});

// Show user their own user page
router.get('/:id', function(req, res, next) {
    console.log("before findOne in user id");
    // if currentUser.id === req.params.id
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(theCurrentUser) {
            res.json(theCurrentUser);

        })

})
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
            res.status(201).send(newUserCreated); >>> >>> > 0 a71056eea3ddc21b3a8fad5d2d28386e0ce94b1
        })
        .catch(next);
});

<< << << < HEAD
    === === =
    // Update ONE user 
    router.put('/:id', function(req, res, next) {
        //if (req.user.isAdmin || req.user === req.params.id) {
        User.findById(req.params.id)
            .then(function(existingUser) {
                return existingUser.update(req.body);
            })
            .then(function(userUpdated) {
                res.json(userUpdated);
            })
            .then(function(serverResponse) {
                res.sendStatus(201);
            })
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
