"use strict";

const Present = require("./present"),
  Absent = require("./absent");

/**
 * Optional entry point interface.
 *
 * @class
 */
class Optional {

  /**
   * Get a Present instance with the given item that may or may not be defined.
   *
   * @param {Object} item - A value that may or may not be defined.
   * @returns {Present} - Instance of the Present class.
   */
  static of(item) {
    return new Present(item);
  }

  /**
   * Get the Absent static instance.
   *
   * @returns {Absent} - Absent static instance.
   */
  static absent() {
    return Absent;
  }

  /**
   * Synonym for fromNullable.
   *
   * @param {Object} item - A value that may or may not be defined.
   * @returns {Absent|Present}
   */
  static fromUndefinedable(item) {
    return Optional.fromNullable(item);
  }

  /**
   * Returns the Absent static instance if the given value is not defined otherwise returns a Present instance.
   *
   * @param {Object} item - A value that may or may not be defined.
   * @returns {Absent|Present}
   */
  static fromNullable(item) {
    return (!item) ? Optional.absent() : Optional.of(item);
  }
}

module.exports = Optional;
