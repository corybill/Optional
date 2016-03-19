"use strict";

const Present = require("./present"),
  Absent = require("./absent");

const Preconditions = require("preconditions");

const preconditions = Preconditions.errr();

class Optional {
  static of(item) {
    preconditions.shouldBeDefined(item, "Illegal State Error: Must contain defined value.").debug(item).test();
    return new Present(item);
  }

  static absent() {
    return Absent.getInstance();
  }

  static fromUndefinedable(item) {
    return this.fromNullable(item);
  }

  static fromNullable(item) {
    return (!item) ? Absent.getInstance() : new Present(item);
  }
}

module.exports = Optional;
