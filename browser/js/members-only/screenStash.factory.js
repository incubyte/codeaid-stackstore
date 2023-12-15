app.factory("SecretStash", function ($http) {
  var getStash = function () {
    return $http.get("/api/members/secret-stash").then(function (response) {
      return response.data;
    });
  };

  return {
    getStash: getStash,
  };
});
