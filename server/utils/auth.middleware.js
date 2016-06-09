'use strict';

var HttpError = require('./HttpError');

var Auth = {};

Auth.isAuthenticated = function(req) {
    return !!req.user;
};

Auth.isAdmin = function(req) {
    return req.user && req.user.isAdmin;
};

Auth.isSelf = function(req) {
    return req.user && req.user.id == req.requestedUser.id;
};

// Auth.isProductOwner = function (req) {
//   return req.user && req.user.id == req.story.author_id;
// };

Auth.assert = function(assertion, status) {
    return function(req, res, next) {
        if (assertion(req)) next();
        else next(HttpError(status || 403));
    };
};

Auth.assertAuthenticated = Auth.assert(Auth.isAuthenticated, 401);

Auth.assertAdmin = Auth.assert(Auth.isAdmin);

Auth.assertSelf = Auth.assert(Auth.isSelf);

Auth.assertOwner = Auth.assert(Auth.isProductOwner);

Auth.assertAdminOrSelf = Auth.assert(function(req) {
    return Auth.isAdmin(req) || Auth.isSelf(req);
});

// Auth.assertAdminOrAuthor = Auth.assert(function (req) {
//   return Auth.isAdmin(req) || Auth.isProductOwner(req);
// });

module.exports = Auth;
