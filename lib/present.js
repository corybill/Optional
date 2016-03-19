"use strict";

const Absent = require("./absent"),
  constants = require("./constants");

const Preconditions = require("preconditions");

const preconditions = Preconditions.errr();

class Present {
  constructor(item) {
    this._item_ = item;
  }

  get() {
    preconditions.shouldBeDefined(this._item_, constants.error.MustBePresent.message).test();
    return this._item_;
  }

  or(secondChoice) {
    preconditions.checkArgument(this._item_ || secondChoice, constants.error.AtLeastOnePresent.message).test();
    return this._item_ || secondChoice;
  }

  orUndefined() {
    return (this._item_) ? this._item_ : undefined;
  }

  orNull() {
    return (this._item_) ? this._item_ : null;
  }

  isPresent() {
    return this._item_ !== undefined && this._item_ !== null;
  }

  transform(func) {
    preconditions.shouldBeFunction(func, constants.error.MissingTransformFunction.message).debug(func).test();
    return this.isPresent() ? func(this._item_) : Absent;
  }

}

module.exports = Present;
