app.config(function ($stateProvider) {
  $stateProvider.state("Cat", {
    url: "/dreams/category/:category",
    controller: "CategoryCtrl",
    templateUrl: "js/dreams/templates/dream-categories.html",
    resolve: {
      theDreams: function (CategoryFactory, $stateParams) {
        return CategoryFactory.findOne($stateParams.category);
      },
    },
  });
});
