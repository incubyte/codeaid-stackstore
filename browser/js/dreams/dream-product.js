app.config(function($stateProvider){
  $stateProvider.state('product', {
    url: '/api/dreams/:id',
    controller: 'ProductCtrl',
    templateUrl: 'js/dreams/templates/dream-product.html',
    resolve: {
      productListing: function(ProductFactory, $stateParams){
        return ProductFactory.getDream($stateParams.id)
        .then(function(response){
          return response.dream;
        });
      },
      // currentSession: function(ProductFactory, $stateParams){
      //   return ProductFactory.getDream($stateParams.id)
      //   .then(function(dream){
      //     return dream.sessionId;
      //   })
      // }
    }
  });
});

app.factory('ProductFactory', function($http, $state){
  var ProductFactory = {};
  ProductFactory.getDream = function(id){
    return $http.get('/api/dreams/' + id)
    .then(function(response){
      return response.data;
    })
  }
  // ProductFactory.addDreamToCart = function(sessionId, product){
  //   return $http.post('/api/cart/' + sessionId + '/' + product.id, product)
  //   .then(function(response){
  //     return response.data;
  //   });
  // }
  return ProductFactory;


});

app.controller('ProductCtrl', function($scope, productListing){
  $scope.product = productListing;
  // var session = new Session();
  // session.create(currentSession);
  // $scope.currentUser = session;
});
