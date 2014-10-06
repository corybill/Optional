"use strict";

var Static = require("./index");
var Optional = require("./Optional");
var Absent = require("./Absent");

describe("Static Optional", function () {
  describe(".of()", function () {

    it("fails when no parameters are passed in.", function () {
      expect(function () {Static.of()}).toThrow();
    });

    it("returns an optional with the parameter stored when a truthy value is passed in.", function () {
      var parameter = jasmine.createSpy("parameter");
      var optional = Static.of(parameter);

      expect(optional).toBeDefined();
      expect(optional).toEqual(jasmine.any(Optional));
      expect(optional.getItem()).toEqual(parameter);
      expect(optional.isPresent()).toEqual(true);
    });

    describe("or", function () {
      it("returns an optional with the parameter stored when a truthy value is passed in.", function () {
        var parameter = jasmine.createSpy("parameter");
        var orParameter = jasmine.createSpy("orParameter");
        var undefinedOrParameter = undefined;

        var optional = Static.of(parameter);

        expect(optional.or(orParameter)).toEqual(parameter);
        expect(optional.isPresent()).toEqual(true);

        expect(optional.or(undefinedOrParameter)).toEqual(parameter);
        expect(optional.isPresent()).toEqual(true);
      });
    });

    describe("orUndefined", function () {
      it("returns an optional with the parameter stored when a truthy value is passed in.", function () {
        var parameter = jasmine.createSpy("parameter");
        var orParameter = jasmine.createSpy("orParameter");
        var undefinedOrParameter = undefined;

        var optional = Static.of(parameter);

        optional.orUndefined(orParameter);
        expect(optional.getItem()).toEqual(orParameter);
        expect(optional.isPresent()).toEqual(true);

        optional.orUndefined(undefinedOrParameter);
        expect(optional.isPresent()).toEqual(false);
        expect(function () {optional.getItem()}).toThrow();
      });
    });

    it("returns an optional with the parameter stored when a truthy value is passed in.", function () {
      var parameter = jasmine.createSpy("parameter");
      var optional = Static.of(parameter);

      expect(optional).toBeDefined();
      expect(optional).toEqual(jasmine.any(Optional));
      expect(optional.getItem()).toEqual(parameter);
    });
  });

  describe(".absent()", function () {
    it("returns an Absent instance when called.", function () {
      var absent = Static.absent();
      expect(absent).toEqual(jasmine.any(Absent));
      expect(function () {absent.getItem()}).toThrow();
    });
  });
});