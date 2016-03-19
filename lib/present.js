"use strict";

const Absent = require("./absent"),
  constants = require("./constants");

const Preconditions = require("preconditions");

const preconditions = Preconditions.errr();

/**
 * Present Class represents an Optional that wraps a value that may or may not be defined.
 *
 * @class
 */
class Present {

  /**
   * Constructor for the Present class;
   *
   * @param {Object} item
   */
  constructor(item) {
    this._item_ = item;
  }

  /**
   * Get the wrapped item if it exists.
   *
   * @returns {Object} - If the wrapped item is present, it will be returned.
   * @throws {Errr} - If the wrapped item is not present, the function will throw an Errr.
   */
  get() {
    preconditions.checkArgument(this.isPresent(), constants.error.MustBePresent.message).test();
    return this._item_;
  }

  /**
   * Get the wrapped item or the second choice.
   *
   * @returns {Object} - If the wrapped item is present, it will be returned.  If the wrapped item is not present and the second choice is present, then the second choice will be returned.
   * @throws {Errr} - If the wrapped item and second choice is not present, the function will throw an Errr.
   */
  or(secondChoice) {
    preconditions.checkArgument(this._item_ || secondChoice, constants.error.AtLeastOnePresent.message).test();
    return this._item_ || secondChoice;
  }

  /**
   * Returns the wrapped item or undefined.
   * @returns {Object|undefined} - If the wrapped item exists, it will be returned, else this function will return undefined.
   */
  orUndefined() {
    return (this._item_) ? this._item_ : undefined;
  }

  /**
   * Returns the wrapped item or null.
   * @returns {Object|undefined} - If the wrapped item exists, it will be returned, else this function will return null.
   */
  orNull() {
    return (this._item_) ? this._item_ : null;
  }

  /**
   * Describes if the wrapped item is present.
   * @returns {Boolean} - If the wrapped item exists, this function will return true, else false.
   */
  isPresent() {
    return this._item_ !== undefined && this._item_ !== null;
  }

  /**
   * Transform the wrapped item using the given function.
   *
   * @param {Function} func - The function that will be used to transform the wrapped item.
   * @returns {Object|Absent} - Returns transformed wrapped item it is present. Returns the Absent static instance if the wrapped item is not present.
   */
  transform(func) {
    preconditions.shouldBeFunction(func, constants.error.MissingTransformFunction.message).debug(func).test();
    return this.isPresent() ? func(this._item_) : Absent;
  }

}

module.exports = Present;
