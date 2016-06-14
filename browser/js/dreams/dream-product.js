app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/dreams/:id',
        controller: 'ProductCtrl',
        templateUrl: 'js/dreams/templates/dream-product.html',
        resolve: {
            productListing: function(ProductFactory, $stateParams) {
                return ProductFactory.getDream($stateParams.id);
            },
            dreamReviews: function(ReviewFactory, productListing){
                return ReviewFactory.getOneDreamReviews(productListing.id)
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


app.controller('ProductCtrl', function($scope, $http, productListing, ProductFactory, AuthService, ReviewFactory, dreamReviews) {
    $scope.product = productListing;
    $scope.user = null;
    $scope.reviews = dreamReviews;
    $scope.showForm = false;

    var setUser = function() {
        AuthService.getLoggedInUser().then(function(user) {
            $scope.user = user;
        });
    };

    setUser();

    //console.log("Where am i??", $scope.reviews)

    // function generateUser() {
    //     var email = "";
    //     var password = "";
    //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    //     for (var i = 0; i < 5; i++) {
    //         password += possible.charAt(Math.floor(Math.random() * possible.length));
    //         email += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
    //     email += "@email.com";
    //     return { email: email, password: password };
    // }

    // function addUser() {
    //     return $http.post('/api/users', generateUser())
    //         //make sure the req.body randomly generates an email and password
    //         .then(function(user) {
    //             $scope.user = user.data;
    //             return user.data;
    //         });
    // }

    $scope.sendReview = function(review) {
        $scope.errorReview = null;
        review.dreamId = $scope.product.id;
        review.userId = $scope.user.id;

        ReviewFactory.addReview(review)
            .then(function() {
                console.log("added a review from " + review.userId);
            }).catch(function() {
                $scope.errorLogin = 'Invalid review';
            });
    }

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

    $scope.toggle = function() {
        $scope.showForm = !$scope.showForm
    }
});
