app.factory("DreamsFactory", function ($http) {
  var DreamsFactory = {};
  DreamsFactory.getAll = function () {
    return $http.get("/api/dreams/").then(function (dreams) {
      return dreams.data;
    });
  };

  return DreamsFactory;
});
