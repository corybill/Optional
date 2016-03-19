"use strict";

const Preconditions = require("preconditions");

const preconditions = Preconditions.errr();

class Absent {
  static get() {
    throw new Error("Illegal State Error: Value must be defined.");
  }

  static or(secondChoice) {
    preconditions.shouldBeDefined(secondChoice, "use Optional.orNull() instead of Optional.or(null)").debug(secondChoice).test();
    return secondChoice;
  }

  static orUndefined() {
    return this.orNull();
  }

  static orNull() {
    return undefined;
  }

  static isPresent() {
    return false;
  }

  static transform(func) {
    preconditions.shouldBeFunction(func, "Illegal Argument Error: parameter must be a Function").debug(func).test();
    return Absent;
  }
}

module.exports = Absent;
