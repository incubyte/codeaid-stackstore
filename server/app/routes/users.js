'use strict';

const express = require('express');
const router = express.Router();
var _ = require('lodash');
var User = require('../../db').model('user');
var HttpError = require('../../utils/HttpError');
var Auth = require('../../utils/auth.middleware');

module.exports = router;

var ensureAuthenticated = function (req, res, next) {
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
        .catch(next);
});


// router.get('/secret-stash', ensureAuthenticated, function (req, res) {

//     var theStash = [
//         'http://ep.yimg.com/ay/candy-crate/bulk-candy-store-2.gif',
//         'http://www.dailybunny.com/.a/6a00d8341bfd0953ef0148c793026c970c-pi',
//         'http://images.boomsbeat.com/data/images/full/44019/puppy-wink_1-jpg.jpg',
//         'http://p-fst1.pixstatic.com/51071384dbd0cb50dc00616b._w.540_h.610_s.fit_.jpg',
//         'http://childcarecenter.us/static/images/providers/2/89732/logo-sunshine.png',
//         'http://www.allgraphics123.com/ag/01/10683/10683.jpg',
//         'http://img.pandawhale.com/post-23576-aflac-dancing-duck-pigeons-vic-RU0j.gif',
//         'http://www.eveningnews24.co.uk/polopoly_fs/1.1960527.1362056030!/image/1301571176.jpg_gen/derivatives/landscape_630/1301571176.jpg',
//         'http://media.giphy.com/media/vCKC987OpQAco/giphy.gif',
//         'https://my.vetmatrixbase.com/clients/12679/images/cats-animals-grass-kittens--800x960.jpg',
//         'http://www.dailymobile.net/wp-content/uploads/2014/10/lollipops.jpg'
//     ];

//     res.send(_.shuffle(theStash));

// });
