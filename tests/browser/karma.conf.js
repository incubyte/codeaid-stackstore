var path = require("path");

module.exports = function (config) {
  var filesCollection = [
    "node_modules/lodash/index.js",
    "node_modules/angular/angular.js",
    "node_modules/angular-animate/angular-animate.js",
    "node_modules/angular-ui-router/release/angular-ui-router.js",
    "node_modules/angular-ui-bootstrap/ui-bootstrap.js",
    "node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js",
    "node_modules/socket.io-client/socket.io.js",
    "tests/browser/karma-bootstrap.js",
    "public/main.js",
    "node_modules/sinon/pkg/sinon.js",
    "node_modules/angular-mocks/angular-mocks.js",
    "public/angular2-dist/polyfills.js",
    "public/angular2-dist/vendor.js",
    "public/angular2-dist/runtime.js",
    "public/angular2-dist/main.js",
    "tests/browser/**/*.js",
  ];

  var excludeFiles = ["tests/browser/karma.conf.js"];

  var customLaunchers = {
    ChromeHeadless: {
      base: "Chrome",
      flags: [
        "--headless",
        "--no-sandbox",
        "--disable-gpu",
        "--remote-debugging-port=9222",
      ],
    },
  };

  var configObj = {
    browsers: ["ChromeHeadless"],
    customLaunchers: customLaunchers,
    frameworks: ["mocha", "chai"],
    basePath: path.join(__dirname, "../../"),
    files: filesCollection,
    exclude: excludeFiles,
    reporters: ["mocha", "coverage"],
    preprocessors: {
      "public/main.js": "coverage",
    },
    coverageReporter: {
      dir: "coverage/browser/",
      reporters: [
        {
          type: "text",
          subdir: ".",
        },
        {
          type: "html",
          subdir: ".",
        },
      ],
    },
  };

  config.set(configObj);
};
