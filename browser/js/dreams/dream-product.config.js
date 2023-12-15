app.config(function ($stateProvider) {
  $stateProvider.state("product", {
    url: "/dreams/:id",
    controller: "ProductCtrl",
    templateUrl: "js/dreams/templates/dream-product.html",
    resolve: {
      productListing: function (ProductFactory, $stateParams) {
        return ProductFactory.getDream($stateParams.id);
      },
      dreamReviews: function (ReviewFactory, productListing) {
        return ReviewFactory.getOneDreamReviews(productListing.id);
      },
    },
  });
  $stateProvider.state("dreams", {
    url: "/dreams",
    controller: "DreamingCtrl",
    templateUrl: "js/dreams/templates/all-dreams.html",
    // resolve: {
    //     allDreams: function(ProductFactory) {
    //         return ProductFactory.getAllDreams()
    //     }
    // }
  });
});
