"use strict";

const constants = require("./constants");

const Preconditions = require("preconditions");

const preconditions = Preconditions.errr();

/**
 * Absent Class represents an Optional that wraps an undefined or null value.
 *
 * @class
 */
class Absent {

  /**
   * Always throws an Errr because the the value is Absent.
   *
   * @throws {Errr}
   */
  static get() {
    preconditions.checkArgument(Absent.isPresent(), constants.error.MustBePresent.message).test();
  }

  /**
   * If secondChoice is defined, then it will be returned.  If secondChoice is undefined or null, then the function will throw.
   * @param secondChoice
   * @returns {Object} - The secondChoice passed into the 'or' function.
   * @throws {Errr} - Throw when secondChoice is undefined or null.
   */
  static or(secondChoice) {
    preconditions.shouldBeDefined(secondChoice, constants.error.AtLeastOnePresent.message).test();
    return secondChoice;
  }

  /**
   * Always returns undefined because the Absent object has no value.
   * @returns {undefined}
   */
  static orUndefined() {
    return undefined;
  }

  /**
   * Always returns null because the Absent object has no value.
   * @returns {null}
   */
  static orNull() {
    return null;
  }

  /**
   * Always returns false because the Absent object represents a non present Optional.
   * @returns {undefined}
   */
  static isPresent() {
    return false;
  }

  /**
   * Always returns the Absent static instance because the Absent object has no value to transform.
   * @returns {undefined}
   */
  static transform() {
    return Absent;
  }
}

module.exports = Absent;
