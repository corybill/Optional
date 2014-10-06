"use strict";

var absent;
var preconditions = require("preconditions").singleton();

function Absent() { }

Absent.prototype.get = function () {
  throw new Error("Illegal State Error: Value must be defined.");
};

Absent.prototype.or = function (secondChoice) {
  preconditions.shouldBeDefined(secondChoice, "use Optional.orNull() instead of Optional.or(null)");
  return secondChoice;
};

Absent.prototype.orUndefined = function () {
  return this.orNull();
};

Absent.prototype.orNull = function () {
  return undefined;
};

Absent.prototype.isPresent = function () {
  return false;
};

Absent.prototype.transform = function (func) {
  preconditions.shouldBeFunction(func, "Illegal Argument Error: parameter must be  a Function");
  return getInstance();
};

function getInstance() {
  if (!absent) {
    absent = new Absent();
  }
  return absent;
}

module.exports = {
  getInstance: getInstance,
  __constructor: Absent
};