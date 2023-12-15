app.factory("ProductFactory", function ($http) {
  var ProductFactory = {};

  ProductFactory.getDream = function (id) {
    return $http.get("/api/dreams/" + id).then(function (response) {
      return response.data;
    });
  };

  ProductFactory.getAllDreams = function () {
    return $http.get("/api/dreams").then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  return ProductFactory;
});
