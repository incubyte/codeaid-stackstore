describe("app", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("fsaPreBuilt"));
  beforeEach(module("ui.router"));
  beforeEach(module("ui.bootstrap"));
  beforeEach(module("ngAnimate"));

  var $rootScope, $state, AuthService, $q, $location, $urlRouterProvider;

  beforeEach(inject(function (_$rootScope_, _$state_, _AuthService_, _$q_, _$location_, _$urlRouterProvider_) {
    $rootScope = _$rootScope_;
    $state = _$state_;
    AuthService = _AuthService_;
    $q = _$q_;
    $location = _$location_;
    $urlRouterProvider = _$urlRouterProvider_;
  }));

  describe("config", function () {
    it("should set html5Mode to true", function () {
      expect($locationProvider.html5Mode()).toBe(true);
    });

    it("should set the default route to '/'", function () {
      expect($urlRouterProvider.otherwise()).toBe('/');
    });

    it("should reload the page when accessing an OAuth route", function () {
      var reloadSpy = sinon.spy(window.location, 'reload');
      $urlRouterProvider.when('/auth/:provider');
      expect(reloadSpy.calledOnce).toBe(true);
      reloadSpy.restore();
    });
  });

  describe("run", function () {
    it("should navigate to the destination state if user is authenticated", function () {
      var toState = { name: "dashboard", data: { authenticate: true } };
      var toParams = {};
      var user = { id: 1, name: "John Doe" };

      sinon.stub(AuthService, "isAuthenticated").returns(true);
      sinon.stub(AuthService, "getLoggedInUser").returns($q.resolve(user));
      sinon.stub($state, "go");

      $rootScope.$emit("$stateChangeStart", toState, toParams);

      expect(AuthService.isAuthenticated.calledOnce).toBe(true);
      expect(AuthService.getLoggedInUser.calledOnce).toBe(true);
      expect($state.go.calledOnce).toBe(true);
      expect($state.go.calledWith(toState.name, toParams)).toBe(true);

      AuthService.isAuthenticated.restore();
      AuthService.getLoggedInUser.restore();
      $state.go.restore();
    });

    it("should navigate to login state if user is not authenticated", function () {
      var toState = { name: "dashboard", data: { authenticate: true } };
      var toParams = {};

      sinon.stub(AuthService, "isAuthenticated").returns(false);
      sinon.stub(AuthService, "getLoggedInUser").returns($q.resolve(null));
      sinon.stub($state, "go");

      $rootScope.$emit("$stateChangeStart", toState, toParams);

      expect(AuthService.isAuthenticated.calledOnce).toBe(true);
      expect(AuthService.getLoggedInUser.calledOnce).toBe(true);
      expect($state.go.calledOnce).toBe(true);
      expect($state.go.calledWith("login")).toBe(true);

      AuthService.isAuthenticated.restore();
      AuthService.getLoggedInUser.restore();
      $state.go.restore();
    });

    it("should not navigate if destination state does not require authentication", function () {
      var toState = { name: "home", data: { authenticate: false } };
      var toParams = {};

      sinon.stub(AuthService, "isAuthenticated");
      sinon.stub(AuthService, "getLoggedInUser");
      sinon.stub($state, "go");

      $rootScope.$emit("$stateChangeStart", toState, toParams);

      expect(AuthService.isAuthenticated.called).toBe(false);
      expect(AuthService.getLoggedInUser.called).toBe(false);
      expect($state.go.called).toBe(false);

      AuthService.isAuthenticated.restore();
      AuthService.getLoggedInUser.restore();
      $state.go.restore();
    });
  });
});