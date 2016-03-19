"use strict";

const Optional = require("./../../lib/optional"),
  Present = require("./../../lib/present"),
  Absent = require("./../../lib/absent"),
  constants = require("./../../lib/constants"),
  random = require("../random");

const Maddox = require("maddox"),
  chai = require("chai");

const Scenario = Maddox.functional.FromSynchronousScenario,
  expect = chai.expect;

describe("When using an Optional", function () {

  describe("and chaining the Optional 'of' function and the Present 'get' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.of(param).get();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = context.param;
      };
    });

    it("it should return the value if it exists.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should throw if the value does not exist.", function () {
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupExpected = function () {
        context.expected = constants.error.MustBePresent.message;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });
  });

  describe("and chaining the Optional 'of' function and the Present 'or' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupOrInput = function () {
        context.orParam = undefined;
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.of(param).or(context.orParam);
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = context.param;
      };
    });

    it("it should return the value if it exists from the 'of' call.", function () {
      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return the value if it exists from the 'or' call.", function () {
      context.setupInput = function () {
        context.param = undefined;
        context.inputParams = [context.param];
      };
      context.setupOrInput = function () {
        context.orParam = random.uniqueId();
      };
      context.setupExpected = function () {
        context.expected = context.orParam;
      };

      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return the value from the 'of' call if it exists from the in both calls.", function () {
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };
      context.setupOrInput = function () {
        context.orParam = random.uniqueId();
      };

      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should throw if the value does not exist from either call.", function () {
      context.setupInput = function () {
        context.param = undefined;
        context.inputParams = [context.param];
      };
      context.setupOrInput = function () {
        context.orParam = undefined;
      };
      context.setupExpected = function () {
        context.expected = constants.error.AtLeastOnePresent.message;
      };

      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });
  });

  describe("and chaining the Optional 'of' function and the Present 'orUndefined' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.of(param).orUndefined();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = context.param;
      };
    });

    it("it should return the value if it exists.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return 'undefined' if it does not exist.", function () {
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupExpected = function () {
        context.expected = undefined;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'of' function and the Present 'orNull' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.of(param).orNull();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = context.param;
      };
    });

    it("it should return the value if it exists.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return 'null' if it does not exist.", function () {
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupExpected = function () {
        context.expected = null;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'of' function and the Present 'isPresent' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.of(param).isPresent();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = true;
      };
    });

    it("it should return true when value is not undefined, null.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return false when value is undefined.", function () {
      context.setupInput = function () {
        context.inputParams = [undefined];
      };
      context.setupExpected = function () {
        context.expected = false;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return false when value is null.", function () {
      context.setupInput = function () {
        context.inputParams = [null];
      };
      context.setupExpected = function () {
        context.expected = false;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'of' function and the Present 'transform' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTransformInput = function () {
        context.transformId = random.uniqueId();
        context.transformParam = function (value) {
          return `${value}_${context.transformId}`;
        };
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.of(param).transform(context.transformParam);
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = `${context.param}_${context.transformId}`;
      };
    });

    it("it should return the transformed value if the value is present.", function () {
      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return an Absent if the value is not present.", function () {
      context.setupInput = function () {
        context.param = undefined;
        context.inputParams = [context.param];
      };
      context.setupExpected = function () {
        context.expected = Absent;
      };

      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should throw if the transform function was not given.", function () {
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };
      context.setupTransformInput = function () {
        context.transformParam = undefined;
      };
      context.setupExpected = function () {
        context.expected = constants.error.MissingTransformFunction.message;
      };

      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });

    it("it should throw if the transform function is not a Function.", function () {
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };
      context.setupTransformInput = function () {
        context.transformParam = random.uniqueId();
      };
      context.setupExpected = function () {
        context.expected = constants.error.MissingTransformFunction.message;
      };

      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });

    it("when it throws, it should contain the parameter as a debug param.", function () {
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };
      context.setupTransformInput = function () {
        context.transformParam = random.uniqueId();
      };
      context.setupExpected = function () {
        context.expected = constants.error.MissingTransformFunction.message;
      };

      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.stack.split(context.transformParam).length).eql(2);
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });
  });

  describe("and chaining the Optional 'absent' function and the Present 'get' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupTest = function () {
        context.entryPointObject = {
          run: function () {
            return Optional.absent().get();
          }
        };
        context.entryPointFunction = "run";
      };
      context.setupExpected = function () {
        context.expected = constants.error.MustBePresent.message;
      };
    });

    it("it should throw.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });
  });

  describe("and chaining the Optional 'absent' function and the Present 'or' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };

      context.setupOrInput = function () {
        context.orParam = undefined;
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function () {
            return Optional.absent().or(context.orParam);
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = context.param;
      };
    });

    it("it should return the value if it exists from the 'or' call.", function () {
      context.setupOrInput = function () {
        context.orParam = random.uniqueId();
      };
      context.setupExpected = function () {
        context.expected = context.orParam;
      };

      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should throw if the value does not exist from the 'or' call.", function () {
      context.setupOrInput = function () {
        context.orParam = undefined;
      };
      context.setupExpected = function () {
        context.expected = constants.error.AtLeastOnePresent.message;
      };

      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });
  });

  describe("and chaining the Optional 'absent' function and the Present 'orUndefined' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupTest = function () {
        context.entryPointObject = {
          run: function () {
            return Optional.absent().orUndefined();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = undefined;
      };
    });

    it("it should return 'undefined'.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'absent' function and the Present 'orNull' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.absent(param).orNull();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = null;
      };
    });

    it("it should return 'null'.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'absent' function and the Present 'isPresent' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function () {
            return Optional.absent().isPresent();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = false;
      };
    });

    it("it should return false.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'absent' function and the Present 'transform' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupTest = function () {
        context.entryPointObject = {
          run: function () {
            return Optional.absent().transform();
          }
        };
        context.entryPointFunction = "run";
      };
      context.setupExpected = function () {
        context.expected = Absent;
      };
    });

    it("it should return an Absent.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'fromNullable' function and the Present 'get' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.fromNullable(param).get();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = context.param;
      };
    });

    it("it should return the value if it exists.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should throw if the value does not exist.", function () {
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupExpected = function () {
        context.expected = constants.error.MustBePresent.message;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });
  });

  describe("and chaining the Optional 'fromNullable' function and the Present 'or' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupOrInput = function () {
        context.orParam = undefined;
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.fromNullable(param).or(context.orParam);
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = context.param;
      };
    });

    it("it should return the value if it exists from the 'of' call.", function () {
      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return the value if it exists from the 'or' call.", function () {
      context.setupInput = function () {
        context.param = undefined;
        context.inputParams = [context.param];
      };
      context.setupOrInput = function () {
        context.orParam = random.uniqueId();
      };
      context.setupExpected = function () {
        context.expected = context.orParam;
      };

      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return the value from the 'of' call if it exists from the in both calls.", function () {
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };
      context.setupOrInput = function () {
        context.orParam = random.uniqueId();
      };

      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should throw if the value does not exist from either call.", function () {
      context.setupInput = function () {
        context.param = undefined;
        context.inputParams = [context.param];
      };
      context.setupOrInput = function () {
        context.orParam = undefined;
      };
      context.setupExpected = function () {
        context.expected = constants.error.AtLeastOnePresent.message;
      };

      context.setupInput();
      context.setupOrInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });
  });

  describe("and chaining the Optional 'fromNullable' function and the Present 'orUndefined' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.fromNullable(param).orUndefined();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = context.param;
      };
    });

    it("it should return the value if it exists.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return 'undefined' if it does not exist.", function () {
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupExpected = function () {
        context.expected = undefined;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'fromNullable' function and the Present 'orNull' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.fromNullable(param).orNull();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = context.param;
      };
    });

    it("it should return the value if it exists.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return 'null' if it does not exist.", function () {
      context.setupInput = function () {
        context.inputParams = Maddox.constants.EmptyParameters;
      };
      context.setupExpected = function () {
        context.expected = null;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'fromNullable' function and the Present 'isPresent' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.fromNullable(param).isPresent();
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = true;
      };
    });

    it("it should return true when value is not undefined, null.", function () {
      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return false when value is undefined.", function () {
      context.setupInput = function () {
        context.inputParams = [undefined];
      };
      context.setupExpected = function () {
        context.expected = false;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return false when value is null.", function () {
      context.setupInput = function () {
        context.inputParams = [null];
      };
      context.setupExpected = function () {
        context.expected = false;
      };

      context.setupInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });
  });

  describe("and chaining the Optional 'fromNullable' function and the Present 'transform' function", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };

      context.setupTransformInput = function () {
        context.transformId = random.uniqueId();
        context.transformParam = function (value) {
          return `${value}_${context.transformId}`;
        };
      };

      context.setupTest = function () {
        context.entryPointObject = {
          run: function (param) {
            return Optional.fromNullable(param).transform(context.transformParam);
          }
        };
        context.entryPointFunction = "run";
      };

      context.setupExpected = function () {
        context.expected = `${context.param}_${context.transformId}`;
      };
    });

    it("it should return the transformed value if the value is present.", function () {
      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should return an Absent if the value is not present.", function () {
      context.setupInput = function () {
        context.param = undefined;
        context.inputParams = [context.param];
      };
      context.setupExpected = function () {
        context.expected = Absent;
      };

      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });
    });

    it("it should throw if the transform function was not given.", function () {
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };
      context.setupTransformInput = function () {
        context.transformParam = undefined;
      };
      context.setupExpected = function () {
        context.expected = constants.error.MissingTransformFunction.message;
      };

      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });

    it("it should throw if the transform function is not a Function.", function () {
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };
      context.setupTransformInput = function () {
        context.transformParam = random.uniqueId();
      };
      context.setupExpected = function () {
        context.expected = constants.error.MissingTransformFunction.message;
      };

      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });

    it("when it throws, it should contain the parameter as a debug param.", function () {
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };
      context.setupTransformInput = function () {
        context.transformParam = random.uniqueId();
      };
      context.setupExpected = function () {
        context.expected = constants.error.MissingTransformFunction.message;
      };

      context.setupInput();
      context.setupTransformInput();
      context.setupTest();
      context.setupExpected();

      new Scenario()
        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)
        .test(function (err, actual) {
          expect(err.stack.split(context.transformParam).length).eql(2);
          expect(err.message).eql(context.expected);
          expect(actual).eql(undefined);
        });
    });
  });

  describe("and calling 'fromUndefinedable'", function () {
    let context;

    beforeEach(function () {
      context = {};
      context.setupInput = function () {
        context.param = random.uniqueId();
        context.inputParams = [context.param];
      };
      context.setupTest = function () {
        context.entryPointObject = Optional;
        context.entryPointFunction = "fromUndefinedable";
      };
      context.setupFromNullable = function () {
        context.fromNullableParams = [context.param];
        context.fromNullableResponse = new Present(context.param);
      };
      context.setupExpected = function () {
        context.expected = context.fromNullableResponse;
      };
    });

    it("it should call into 'fromNullable' and use its functionality", function () {
      context.setupInput();
      context.setupTest();
      context.setupFromNullable();
      context.setupExpected();

      new Scenario()
        .mockThisFunction("Optional", "fromNullable", Optional)

        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)

        .shouldBeCalledWith("Optional", "fromNullable", context.fromNullableParams)
        .doesReturn("Optional", "fromNullable", context.fromNullableResponse)

        .test(function (err, actual) {
          expect(err).eql(undefined);
          expect(actual).eql(context.expected);
        });

    });
  });
});
