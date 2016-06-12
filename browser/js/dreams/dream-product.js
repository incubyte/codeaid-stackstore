app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/api/dreams/:id',
        controller: 'ProductCtrl',
        templateUrl: 'js/dreams/templates/dream-product.html',
        resolve: {
            productListing: function(ProductFactory, $stateParams) {
                return ProductFactory.getDream($stateParams.id);
            }
        }
    });
});

app.factory('ProductFactory', function($http, $state) {
    var ProductFactory = {};

    ProductFactory.getDream = function(id) {
        return $http.get('/api/dreams/' + id)
            .then(function(response) {
                return response.data;
            })
    };

    return ProductFactory;
});


app.controller('ProductCtrl', function($scope, $http, productListing, $rootScope) {
    $scope.product = productListing;
    $rootScope.currentUser;
    // $scope.numItems = 0;
    function generateUser() {
        var email = "";
        var password = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 5; i++){
            password += possible.charAt(Math.floor(Math.random() * possible.length));
            email += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        email += "@email.com";
        return {email: email, password: password};
    }

    function addUser() {
        return $http.post('/api/users', generateUser())
            //make sure the req.body randomly generates an email and password
            .then(function(user) {
                $rootScope.currentUser = user.data;
                return user.data;
            });
    }

    function getUser() {
        return $http.get('/api/users/' + $rootScope.currentUser.id);
    }

    $scope.addDreamToCart = function(userId, product) {
        var user;
        if (!$rootScope.currentUser) user = addUser();
        else user = getUser();
        user.then(function(user) {
            return $http.post('/api/cart/' + $rootScope.currentUser.id, $scope.product)
                .then(function(addedToCart) {
                    console.log("SUCCESS!!!!!");
                    console.log("ADDED PRODUCT", addedToCart.data);
                    return addedToCart.data;
                });
        });
    }
});
