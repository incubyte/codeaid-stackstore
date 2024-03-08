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
      var testGreetings = [
        'Hello, world!',
        'At long last, I live!',
        'Hello, simple human.',
        'What a beautiful day!',
        'I\'m like any other project, except that I am yours. :)',
        'This empty string is for Lindsay Levine.',
        'こんにちは、ユーザー様。',
        'Welcome. To. WEBSITE.',
        ':D',
        'Yes, I think we\'ve met before.',
        'Gimme 3 mins... I just grabbed this really dope frittata',
        'If Cooper could offer only one piece of advice, it would be to nevSQUIRREL!',
      ];

      // Stub Math.random to always return 0 to test the first greeting
      sinon.stub(Math, 'random').returns(0);
      expect(RandomGreetings.getRandomGreeting()).toEqual(testGreetings[0]);
      Math.random.restore();

      // Stub Math.random to return 0.5 to test a middle greeting
      sinon.stub(Math, 'random').returns(0.5);
      var middleIndex = Math.floor(0.5 * testGreetings.length);
      expect(RandomGreetings.getRandomGreeting()).toEqual(testGreetings[middleIndex]);
      Math.random.restore();

      // Stub Math.random to always return a value close to 1 to test the last greeting
      sinon.stub(Math, 'random').returns(0.999);
      expect(RandomGreetings.getRandomGreeting()).toEqual(testGreetings[testGreetings.length - 1]);
      Math.random.restore();
    });
  });
});