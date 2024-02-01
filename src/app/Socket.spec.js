describe("fsaPreBuilt", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, $httpBackend, AuthService, Session, AUTH_EVENTS;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _AuthService_, _Session_, _AUTH_EVENTS_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    AuthService = _AuthService_;
    Session = _Session_;
    AUTH_EVENTS = _AUTH_EVENTS_;
  }));

  describe("AuthService", function () {
    describe("isAuthenticated", function () {
      it("should return true if user is authenticated", function () {
        Session.user = { id: 1, name: "John Doe" };
        var result = AuthService.isAuthenticated();
        expect(result).toBe(true);
      });

      it("should return false if user is not authenticated", function () {
        Session.user = null;
        var result = AuthService.isAuthenticated();
        expect(result).toBe(false);
      });
    });

    describe("getLoggedInUser", function () {
      it("should return the user attached to the session if user is authenticated and fromServer is not true", function () {
        Session.user = { id: 1, name: "John Doe" };
        var result;
        AuthService.getLoggedInUser().then(function (user) {
          result = user;
        });
        $rootScope.$digest();
        expect(result).toEqual(Session.user);
      });

      it("should make a GET request to /session and call onSuccessfulLogin if user is not authenticated or fromServer is true", function () {
        Session.user = null;
        $httpBackend.expectGET("/session").respond(200, { id: 1, name: "John Doe" });
        var result;
        AuthService.getLoggedInUser().then(function (user) {
          result = user;
        });
        $httpBackend.flush();
        expect(result).toEqual({ id: 1, name: "John Doe" });
      });

      it("should catch a 401 response and resolve to null if user is not authenticated", function () {
        Session.user = null;
        $httpBackend.expectGET("/session").respond(401);
        var result;
        AuthService.getLoggedInUser().then(function (user) {
          result = user;
        });
        $httpBackend.flush();
        expect(result).toBeNull();
      });
    });

    describe("signup", function () {
      it("should make a POST request to /signup with the given credentials and call onSuccessfulLogin if successful", function () {
        var credentials = { username: "john", password: "password" };
        $httpBackend.expectPOST("/signup", credentials).respond(200, { id: 1, name: "John Doe" });
        var result;
        AuthService.signup(credentials).then(function (user) {
          result = user;
        });
        $httpBackend.flush();
        expect(result).toEqual({ id: 1, name: "John Doe" });
      });

      it("should reject with an error message if the POST request fails", function () {
        var credentials = { username: "john", password: "password" };
        $httpBackend.expectPOST("/signup", credentials).respond(500);
        var result;
        AuthService.signup(credentials).catch(function (error) {
          result = error;
        });
        $httpBackend.flush();
        expect(result).toEqual({ message: "Invalid signup credentials." });
      });
    });

    describe("login", function () {
      it("should make a POST request to /login with the given credentials and call onSuccessfulLogin if successful", function () {
        var credentials = { username: "john", password: "password" };
        $httpBackend.expectPOST("/login", credentials).respond(200, { id: 1, name: "John Doe" });
        var result;
        AuthService.login(credentials).then(function (user) {
          result = user;
        });
        $httpBackend.flush();
        expect(result).toEqual({ id: 1, name: "John Doe" });
      });

      it("should reject with an error message if the POST request fails", function () {
        var credentials = { username: "john", password: "password" };
        $httpBackend.expectPOST("/login", credentials).respond(500);
        var result;
        AuthService.login(credentials).catch(function (error) {
          result = error;
        });
        $httpBackend.flush();
        expect(result).toEqual({ message: "Invalid login credentials." });
      });
    });

    describe("logout", function () {
      it("should make a GET request to /logout and destroy the session if successful", function () {
        Session.user = { id: 1, name: "John Doe" };
        $httpBackend.expectGET("/logout").respond(200);
        AuthService.logout();
        $httpBackend.flush();
        expect(Session.user).toBeNull();
      });
    });
  });

  describe("Session", function () {
    describe("create", function () {
      it("should set the sessionId and user properties", function () {
        Session.create(1, { id: 1, name: "John Doe" });
        expect(Session.id).toBe(1);
        expect(Session.user).toEqual({ id: 1, name: "John Doe" });
      });
    });

    describe("destroy", function () {
      it("should set the sessionId and user properties to null", function () {
        Session.destroy();
        expect(Session.id).toBeNull();
        expect(Session.user).toBeNull();
      });
    });
  });
});