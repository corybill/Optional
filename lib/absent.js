"use strict";

const constants = require("./constants");

const Preconditions = require("preconditions");

const preconditions = Preconditions.errr();

class Absent {
  static get() {
    throw new Error(constants.error.MustBePresent.message);
  }

  static or(secondChoice) {
    preconditions.shouldBeDefined(secondChoice, constants.error.AtLeastOnePresent.message).test();
    return secondChoice;
  }

  static orUndefined() {
    return undefined;
  }

  static orNull() {
    return null;
  }

  static isPresent() {
    return false;
  }

  static transform() {
    return Absent;
  }
}

module.exports = Absent;
