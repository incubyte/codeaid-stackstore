app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/dreams/:id',
        controller: 'ProductCtrl',
        templateUrl: 'js/dreams/templates/dream-product.html',
        resolve: {
            productListing: function(ProductFactory, $stateParams) {
                return ProductFactory.getDream($stateParams.id);
            },
            dreamReviews: function(ReviewFactory, productListing) {
                return ReviewFactory.getOneDreamReviews(productListing.id)
            }
        }
    });
    $stateProvider.state('dreams', {
        url: '/dreams',
        controller: 'DreamingCtrl',
        templateUrl: 'js/dreams/templates/all-dreams.html',
        // resolve: {
        //     allDreams: function(ProductFactory) {
        //         return ProductFactory.getAllDreams()
        //     }
        // }
    })
});

app.factory('ProductFactory', function($http) {
    var ProductFactory = {};

    ProductFactory.getDream = function(id) {
        return $http.get('/api/dreams/' + id)
            .then(function(response) {
                return response.data;
            })
    };

    ProductFactory.getAllDreams = function() {
        return $http.get('/api/dreams')
            .then(function(response) {
                console.log(response.data)
                return response.data
            })
    }

    return ProductFactory;
});

app.controller('DreamingCtrl', function($scope, ProductFactory) {
    ProductFactory.getAllDreams()
    .then(function(dreams) {
        $scope.dreams = dreams
    })

})


app.controller('ProductCtrl', function($scope, $http, productListing, ProductFactory, AuthService, ReviewFactory, dreamReviews) {
    $scope.product = productListing;
    $scope.user = null;
    if (dreamReviews.length)
        $scope.reviews = dreamReviews;
    else
        $scope.reviews = false;
    $scope.showForm = false;


    $scope.dropdown = Array.apply(null, Array($scope.product.quantity)).map(function(el, i) {
        return i + 1;
    });

    var setUser = function() {
        AuthService.getLoggedInUser().then(function(user) {
            if (user)
                $scope.user = user;
            else
                $scope.user = false;
        });
    };

    setUser();

    $scope.sendReview = function(review) {
        $scope.errorReview = null;
        review.dreamId = $scope.product.id;
        review.userId = $scope.user.id;

        ReviewFactory.addReview(review)
            .then(function() {
                console.log("added a review from " + review.userId);
                $window.location.reload()
            }).catch(function() {
                $scope.errorLogin = 'Invalid review';
            });
    }

    $scope.addDreamToCart = function(userId, product) {
        return $http.post('/api/cart/', {product: product, amount: $scope.amount})
            .then(function(userInfo) {
                return userInfo.data;
            })
            .then(function(userInfo) {
                product.quantity -= $scope.amount;
            })
    }

    $scope.toggle = function() {
        $scope.showForm = !$scope.showForm
    }

});
