app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/dreams/:id',
        controller: 'ProductCtrl',
        templateUrl: 'js/dreams/templates/dream-product.html',
        resolve: {
            productListing: function(ProductFactory, $stateParams) {
                return ProductFactory.getDream($stateParams.id)
                    .then(function(response) {
                        return response.dream;
                    });
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


app.controller('ProductCtrl', function($scope, $http, productListing) {
    $scope.product = productListing;
    $scope.currentUser;
    // $scope.numItems = 0;
    function addUser() {
        return $http.post('/api/users', { email: 'joe@joe.com', password: '123' })
        //make sure the req.body randomly generates an email and password
            .then(function(user) {
                $scope.currentUser = user.data;
                return user.data;
            });
    }

    function getUser(){
      return $http.get('/api/users/' + $scope.currentUser.id);
    }

    $scope.addDreamToCart = function(userId, product) {
        var user;
        if (!$scope.currentUser) user = addUser();
        else user = getUser();
        user.then(function(user) {
            return $http.post('/api/cart/' + $scope.currentUser.id, $scope.product)
                .then(function(addedToCart) {
                  console.log("SUCCESS!!!!!");
                  console.log("ADDED PRODUCT", addedToCart.data);
                    return addedToCart.data;
                });
        });
    }
});

app.controller('ProductCtrl', function($scope, productListing){
  $scope.product = productListing;
  // var session = new Session();
  // session.create(currentSession);
  // $scope.currentUser = session;
});

