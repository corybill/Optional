"use strict";

var Optional = require("./../src/Optional");
var Absent = require("./../src/Absent");
var index = require("./../index");

describe("Optional", function () {
  var transformer;

  beforeEach(function () {
    transformer = function (item) {
      return {
        testItem: item
      };
    };
  });

  describe("index", function () {
    it("should return the Optional static functions", function () {
      expect(index).toBeDefined();
      expect(index.of).toBeDefined();
      expect(index.absent).toBeDefined();
      expect(index.fromUndefinedable).toBeDefined();
      expect(index.fromNullable).toBeDefined();
      expect(index.newOptional).toBeDefined();
    });
  });

  describe("static functions", function () {
    describe(".of()", function () {

      it("fails when no parameters are passed in.", function () {
        expect(function () {Optional.of();}).toThrow();
      });

      it("returns an optional with the parameter stored when a truthy value is passed in.", function () {
        var parameter = jasmine.createSpy("parameter");
        var optional = Optional.of(parameter);

        expect(optional).toBeDefined();
        expect(optional).toEqual(jasmine.any(Optional.__constructor));
        expect(optional.getItem()).toEqual(parameter);
        expect(optional.isPresent()).toEqual(true);
      });

      describe("or", function () {
        it("returns an optional with the parameter stored when a truthy value is passed in.", function () {
          var parameter = jasmine.createSpy("parameter");
          var orParameter = jasmine.createSpy("orParameter");

          var optional = Optional.of(parameter);

          expect(optional.or(orParameter)).toEqual(parameter);
          expect(optional.isPresent()).toEqual(true);
        });

        it("returns an optional with the parameter stored when a truthy value is passed in.", function () {
          var orParameter = jasmine.createSpy("orParameter");
          var optional = Optional.newOptional();

          expect(optional.or(orParameter)).toEqual(orParameter);
          expect(optional.isPresent()).toEqual(false);
        });
      });

      describe("orUndefined", function () {
        it("returns an optional with the parameter stored when a truthy value is passed in.", function () {
          var parameter = jasmine.createSpy("parameter");
          var optional = Optional.of(parameter);

          expect(optional.orUndefined()).toEqual(parameter);
          expect(optional.getItem()).toEqual(parameter);
          expect(optional.isPresent()).toEqual(true);
        });

        it("returns an optional without the parameter stored when a undefined value is passed in.", function () {
          var optional = Optional.newOptional();

          expect(optional.isPresent()).toEqual(false);
          expect(function () {optional.getItem();}).toThrow();
          expect(optional.orUndefined()).not.toBeDefined();
        });
      });

      describe("isPresent", function () {
        it("returns true when parameter exists.", function () {
          var parameter = jasmine.createSpy("parameter");
          var optional = Optional.of(parameter);
          expect(optional.isPresent()).toEqual(true);
        });

        it("returns false when parameter is absent.", function () {
          var optional = Optional.newOptional();
          expect(optional.isPresent()).toEqual(false);
        });
      });

      describe("transform", function () {
        it("returns the transformed item when it exists.", function () {
          var parameter = jasmine.createSpy("parameter");
          var optional = Optional.of(parameter);
          expect(optional.transform(transformer)).toEqual({testItem: parameter});
        });

        it("returns an Absent when it exists.", function () {
          var optional = Optional.newOptional();
          expect(optional.transform(transformer)).toEqual(Optional.absent());
        });

        it("returns an Absent when transformer is not of type Function.", function () {
          var optional = Optional.newOptional();
          expect(function () { optional.transform("SomeNonFunction"); }).toThrow();
        });

        it("returns an Absent when transformer is not defined.", function () {
          var optional = Optional.newOptional();
          expect(function () { optional.transform(); }).toThrow();
        });
      });
    });

    describe(".absent()", function () {
      it("returns an Absent instance when called.", function () {
        var absent = Optional.absent();
        expect(absent).toEqual(jasmine.any(Absent.__constructor));
        expect(function () {absent.getItem();}).toThrow();
      });
    });

    describe(".fromUndefinedable()", function () {
      it("returns an Optional instance when called with a truthy parameter.", function () {
        var parameter = jasmine.createSpy("parameter");
        var optional = Optional.fromUndefinedable(parameter);
        expect(optional).toEqual(jasmine.any(Optional.__constructor));
        expect(optional.isPresent()).toEqual(true);
        expect(optional.getItem()).toEqual(parameter);
      });

      it("returns an Absent instance when called with an undefined parameter.", function () {
        var absent = Optional.fromUndefinedable();

        expect(absent).toEqual(jasmine.any(Absent.__constructor));
        expect(absent.isPresent()).toEqual(false);
        expect(function () {absent.getItem();}).toThrow();
      });

      describe(".fromNullable()", function () {
        it("throws and error requesting you to call the correct function.", function () {
          expect( function () { Optional.fromNullable(); }).toThrow();
        });
      });
    });

    describe(".newOptional()", function () {
      it("will return an Optional instance", function () {
        expect(Optional.newOptional("SomeVal")).toEqual(jasmine.any(Optional.__constructor));
      });

      it("will allow undefined parameters.", function () {
        expect(Optional.newOptional()).toEqual(jasmine.any(Optional.__constructor));
      });

      it("will store the value the same way as the .of()", function () {
        var someVal = jasmine.createSpy("someVale");
        var optionalA = Optional.newOptional(someVal);
        var optionalB = Optional.of(someVal);

        expect(optionalA.getItem()).toEqual(optionalB.getItem());
        expect(optionalA.getItem()).toEqual(someVal);
        expect(optionalA.getItem()).toEqual(someVal);
      });
    });
  });

  describe("Absent", function () {
    var absent = Absent.getInstance();

    it("should always equal itself because it is a singleton with no state.", function () {
      expect(Absent.getInstance()).toEqual(Absent.getInstance());
      expect(Absent.getInstance()).toEqual(Absent.getInstance());
    });

    describe(".getItem()", function () {
      it("always returns the parameter given", function () {
        expect(function () { absent.getItem(); }).toThrow();
      });
    });

    describe(".or()", function () {
      it("always returns the parameter given", function () {
        var someUndefinedVal;
        var someVal = jasmine.createSpy("someVal");

        expect(absent.or(someVal)).toEqual(someVal);
        expect(absent.or(someUndefinedVal)).toEqual(someUndefinedVal);
      });
    });

    describe(".orUndefined()", function () {
      it("always returns undefined", function () {
        var someUndefinedVal;
        var someVal = jasmine.createSpy("someVal");

        expect(absent.orUndefined(someVal)).not.toBeDefined();
        expect(absent.orUndefined(someUndefinedVal)).not.toBeDefined();
      });
    });

    describe(".isPresent()", function () {
      it("always returns false", function () {
        expect(absent.isPresent()).toEqual(false);
      });
    });

    describe(".transform()", function () {
      it("always returns an absent", function () {
        expect(absent.transform()).toEqual(jasmine.any(Absent.__constructor));
        expect(absent.transform(transformer)).toEqual(jasmine.any(Absent.__constructor));
      });
    });
  });

});