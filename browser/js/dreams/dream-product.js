app.config(function($stateProvider){
  $stateProvider.state('product', {
    url: '/api/dreams/:id',
    controller: 'ProductCtrl',
    templateUrl: 'js/dreams/templates/dream-product.html',
    resolve: {
      productListing: function(ProductFactory, $stateParams){
        return ProductFactory.getDream($stateParams.id);
      }
    }
  });
});

app.factory('ProductFactory', function($http){
  var ProductFactory = {};
  ProductFactory.getDream = function(id){
    return $http.get('/api/dreams/' + id)
    .then(function(dream){
      return dream.data;
    })
  }
  return ProductFactory;
});

app.controller('ProductCtrl', function($scope, productListing){
  $scope.product = productListing;
});