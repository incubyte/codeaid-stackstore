describe("FullstackPics", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var FullstackPics;

  beforeEach(inject(function (_FullstackPics_) {
    FullstackPics = _FullstackPics_;
  }));

  describe("getPics", function () {
    it("should return an array of image paths", function () {
      var pics = FullstackPics.getPics();

      expect(pics).to.be.an("array");
      expect(pics).to.have.lengthOf(11);
      expect(pics[0]).to.equal("/images/home/dream-left.jpg");
      expect(pics[1]).to.equal("/images/home/dream-main.jpg");
      expect(pics[2]).to.equal("/images/dreamdoor3.jpg");
      expect(pics[3]).to.equal("/images/dreamdoorview.jpg");
      expect(pics[4]).to.equal("/images/galaxy.jpg");
      expect(pics[5]).to.equal("/images/monalisa.jpg");
      expect(pics[6]).to.equal("/images/monet.jpg");
      expect(pics[7]).to.equal("/images/Moon-logo.jpg");
      expect(pics[8]).to.equal("/images/moons.jpg");
      expect(pics[9]).to.equal("/images/soundofmusic.jpg");
      expect(pics[10]).to.equal("/images/wildwildwest.jpg");
    });
  });
});