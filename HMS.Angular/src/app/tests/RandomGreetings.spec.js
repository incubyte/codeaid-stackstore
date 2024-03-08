describe("RandomGreetings factory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var RandomGreetings, MathRandomOriginal;

  beforeEach(inject(function (_RandomGreetings_) {
    RandomGreetings = _RandomGreetings_;
    MathRandomOriginal = Math.random;
  }));

  afterEach(function () {
    Math.random = MathRandomOriginal;
  });

  describe("getRandomGreeting", function () {
    it("should return a random greeting from the greetings array", function () {
      var greetings = RandomGreetings.greetings;
      var testIndex = 0;
      sinon.stub(Math, "random").returns(testIndex / greetings.length);
      var randomGreeting = RandomGreetings.getRandomGreeting();
      expect(randomGreeting).toEqual(greetings[testIndex]);
      Math.random.restore();
    });

    it("should return different greetings when called multiple times", function () {
      var greetings = RandomGreetings.greetings;
      var firstCallIndex = 0;
      var secondCallIndex = 1;
      sinon.stub(Math, "random")
        .onFirstCall().returns(firstCallIndex / greetings.length)
        .onSecondCall().returns(secondCallIndex / greetings.length);
      var firstGreeting = RandomGreetings.getRandomGreeting();
      var secondGreeting = RandomGreetings.getRandomGreeting();
      expect(firstGreeting).not.toEqual(secondGreeting);
      Math.random.restore();
    });
  });
});