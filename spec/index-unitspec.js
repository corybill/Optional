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
        expect(optional.get()).toEqual(parameter);
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

        it("returns an optional with the parameter missing when a falsy value is passed in.", function () {
          var orParameter = jasmine.createSpy("orParameter");
          var optional = Optional.__newOptional();

          expect(optional.or(orParameter)).toEqual(orParameter);
          expect(optional.isPresent()).toEqual(false);
        });
      });

      describe("orNull", function () {
        it("returns an optional with the parameter stored when a truthy value is passed in.", function () {
          var parameter = jasmine.createSpy("parameter");
          var optional = Optional.of(parameter);

          expect(optional.orNull()).toEqual(parameter);
          expect(optional.get()).toEqual(parameter);
          expect(optional.isPresent()).toEqual(true);
        });

        it("returns an optional without the parameter stored when a undefined value is passed in.", function () {
          var optional = Optional.__newOptional();

          expect(optional.isPresent()).toEqual(false);
          expect(function () {optional.get();}).toThrow();
          expect(optional.orNull()).not.toBeDefined();
        });
      });

      describe("orUndefined", function () {
        it("should call orNull", function () {
          var parameter = jasmine.createSpy("parameter");
          var optional = Optional.of(parameter);

          spyOn(optional, "orNull");
          optional.orUndefined();

          expect(optional.orNull).toHaveBeenCalled();
          expect(optional.orNull.calls.length).toEqual(1);
        });
      });

      describe("isPresent", function () {
        it("returns true when parameter exists.", function () {
          var parameter = jasmine.createSpy("parameter");
          var optional = Optional.of(parameter);
          expect(optional.isPresent()).toEqual(true);
        });

        it("returns false when parameter is absent.", function () {
          var optional = Optional.__newOptional();
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
          var optional = Optional.__newOptional();
          expect(optional.transform(transformer)).toEqual(Optional.absent());
        });

        it("returns an Absent when transformer is not of type Function.", function () {
          var optional = Optional.__newOptional();
          expect(function () { optional.transform("SomeNonFunction"); }).toThrow();
        });

        it("returns an Absent when transformer is not defined.", function () {
          var optional = Optional.__newOptional();
          expect(function () { optional.transform(); }).toThrow();
        });
      });
    });

    describe(".absent()", function () {
      it("returns an Absent instance when called.", function () {
        var absent = Optional.absent();
        expect(absent).toEqual(jasmine.any(Absent.__constructor));
        expect(function () {absent.get();}).toThrow();
      });
    });

    describe(".fromNullable()", function () {
      it("returns an Optional instance when called with a truthy parameter.", function () {
        var parameter = jasmine.createSpy("parameter");
        var optional = Optional.fromUndefinedable(parameter);
        expect(optional).toEqual(jasmine.any(Optional.__constructor));
        expect(optional.isPresent()).toEqual(true);
        expect(optional.get()).toEqual(parameter);
      });

      it("returns an Absent instance when called with an undefined parameter.", function () {
        var absent = Optional.fromUndefinedable();

        expect(absent).toEqual(jasmine.any(Absent.__constructor));
        expect(absent.isPresent()).toEqual(false);
        expect(function () {absent.get();}).toThrow();
      });
    });

    describe(".fromUndefinedable()", function () {
      it("should call .fromNullable()", function () {
        spyOn(Optional, "fromNullable");
        var parameter = jasmine.createSpy("parameter");
        Optional.fromUndefinedable(parameter);

        expect(Optional.fromNullable).toHaveBeenCalledWith(parameter);
        expect(Optional.fromNullable.calls.length).toEqual(1);
      });
    });

    describe(".__newOptional()", function () {
      it("will return an Optional instance", function () {
        expect(Optional.__newOptional("SomeVal")).toEqual(jasmine.any(Optional.__constructor));
      });

      it("will allow undefined parameters.", function () {
        expect(Optional.__newOptional()).toEqual(jasmine.any(Optional.__constructor));
      });

      it("will store the value the same way as the .of()", function () {
        var someVal = jasmine.createSpy("someVale");
        var optionalA = Optional.__newOptional(someVal);
        var optionalB = Optional.of(someVal);

        expect(optionalA.get()).toEqual(optionalB.get());
        expect(optionalA.get()).toEqual(someVal);
        expect(optionalA.get()).toEqual(someVal);
      });
    });
  });

  describe("Absent", function () {
    var absent = Absent.getInstance();

    it("should always equal itself because it is a singleton with no state.", function () {
      expect(Absent.getInstance()).toEqual(Absent.getInstance());
      expect(Absent.getInstance()).toEqual(Absent.getInstance());
    });

    describe(".get()", function () {
      it("always returns the parameter given", function () {
        expect(function () { absent.get(); }).toThrow();
      });
    });

    describe(".or()", function () {
      it("always returns the parameter given", function () {
        var someUndefinedVal;
        var someVal = jasmine.createSpy("someVal");

        expect(absent.or(someVal)).toEqual(someVal);
        expect(function () { absent.or(someUndefinedVal); }).toThrow();
      });
    });

    describe(".orNull()", function () {
      it("always returns undefined", function () {
        var someUndefinedVal;
        var someVal = jasmine.createSpy("someVal");

        expect(absent.orNull(someVal)).not.toBeDefined();
        expect(absent.orNull(someUndefinedVal)).not.toBeDefined();
      });
    });

    describe(".orUndefined()", function () {
      it("should cal. .orNull()", function () {
        var someVal = jasmine.createSpy("someVal");

        spyOn(absent, "orNull");
        absent.orUndefined(someVal);

        expect(absent.orNull).toHaveBeenCalled();
        expect(absent.orNull.calls.length).toEqual(1);
      });
    });

    describe(".isPresent()", function () {
      it("always returns false", function () {
        expect(absent.isPresent()).toEqual(false);
      });
    });

    describe(".transform()", function () {
      it("always returns an absent", function () {
        expect(function () { absent.transform(); }).toThrow();
        expect(absent.transform(transformer)).toEqual(jasmine.any(Absent.__constructor));
      });
    });
  });
});