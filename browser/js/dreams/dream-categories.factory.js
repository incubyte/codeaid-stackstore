app.factory("CategoryFactory", function ($http, DreamsFactory) {
  var CategoryFactory = {};
  CategoryFactory.findOne = function (category) {
    return $http
      .get("/api/dreams/category/" + category)
      .then(function (response) {
        var dreams = response.data;

        return dreams;
      });
  };
  return CategoryFactory;
});
