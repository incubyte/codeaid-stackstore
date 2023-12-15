app.config(function ($stateProvider) {
  $stateProvider.state("home", {
    url: "/",
    controller: "DreamsCtrl",
    templateUrl: "js/home/home.html",
  });
});
