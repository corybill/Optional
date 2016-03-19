"use strict";

const Absent = require("./absent");

const Preconditions = require("preconditions");

const preconditions = Preconditions.errr();

class Present {
  constructor(item) {
    this._item_ = item;
  }

  get() {
    preconditions.shouldBeDefined(this._item_, "Illegal State Error: Value must be defined.").test();
    return this._item_;
  }

  or(secondChoice) {
    preconditions.shouldBeDefined(secondChoice, "use Optional.orNull() instead of Optional.or(null)").debug(secondChoice).test();
    return this._item_ || secondChoice;
  }

  orUndefined() {
    return this.orNull();
  }

  orNull() {
    return this._item_ || undefined;
  }

  isPresent() {
    return this._item_ !== undefined && this._item_ !== null && !isNaN(this._item_);
  }

  transform(func) {
    preconditions.shouldBeFunction(func, "Illegal Argument Error: parameter must be a Function").debug(func).test();
    return this.isPresent() ? func(this._item_) : Absent.getInstance();
  }

}

module.exports = Present;
