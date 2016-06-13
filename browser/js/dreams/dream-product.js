app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/dreams/:id',
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


app.controller('ProductCtrl', function($scope, $http, productListing, ProductFactory, AuthService) {
    $scope.product = productListing;
    $scope.user = null;
    var setUser = function() {
        AuthService.getLoggedInUser().then(function(user) {
            $scope.user = user;
        });
    };

    setUser();

    function generateUser() {
        var email = "";
        var password = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 5; i++) {
            password += possible.charAt(Math.floor(Math.random() * possible.length));
            email += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        email += "@email.com";
        return { email: email, password: password };
    }

    function addUser() {
        return $http.post('/api/users', generateUser())
            //make sure the req.body randomly generates an email and password
            .then(function(user) {
                $scope.user = user.data;
                return user.data;
            });
    }

    // function getUser() {
    //     return $http.get('/api/users/' + $scope.user.id);
    // }

    $scope.addDreamToCart = function(userId, product) {
        if (!$scope.user) addUser();
        return $http.post('/api/cart/' + $scope.user.id, product)
            .then(function(userInfo) {
                console.log("SUCCESS!!!!!");
                console.log("USER CART", userInfo.data);
                return userInfo.data;
            })
            .then(function() {
                product.quantity--;
            });
    }
});
