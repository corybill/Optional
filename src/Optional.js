"use strict";

var Absent = require("./Absent");
var preconditions = require("preconditions").singleton();

function Present(item) {
  this.item = item;
}

Present.prototype.get = function () {
  if (!this.item) {
    throw new Error("Illegal State Error: Value must be defined.");
  }

  return this.item;
};

Present.prototype.or = function (secondChoice) {
  preconditions.shouldBeDefined(secondChoice, "use Optional.orNull() instead of Optional.or(null)");
  return this.item || secondChoice;
};

Present.prototype.orUndefined = function () {
  return this.orNull();
};

Present.prototype.orNull = function () {
  return this.item || undefined;
};

Present.prototype.isPresent = function () {
  return (!this.item) ? false : true;
};

Present.prototype.transform = function (func) {
  preconditions.shouldBeFunction(func, "Illegal Argument Error: parameter must be  a Function");
  return this.isPresent() ? func(this.item) : Absent.getInstance();
};

var Optional = {
  of: function (item) {
    preconditions.shouldBeDefined(item, "Illegal State Error: Must contain defined value.");
    return new Present(item);
  },
  absent: function () {
    return Absent.getInstance();
  },

  fromUndefinedable: function (item) {
    return this.fromNullable(item);
  },

  fromNullable: function (item) {
    return (!item) ? Absent.getInstance() : new Present(item);
  },

  __newOptional: function (item) {
    return new Present(item);
  },
  __constructor: Present
};

module.exports = Optional;