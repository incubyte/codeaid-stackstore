describe("RandomGreetings", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var RandomGreetings;

  beforeEach(inject(function (_RandomGreetings_) {
    RandomGreetings = _RandomGreetings_;
  }));

  describe("getRandomGreeting", function () {
    it("should return a random greeting from the greetings array", function () {
      var greeting = RandomGreetings.getRandomGreeting();
      expect(RandomGreetings.greetings).to.include(greeting);
    });
  });
});