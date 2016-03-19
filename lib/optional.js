"use strict";

const Present = require("./present"),
  Absent = require("./absent");

class Optional {
  static of(item) {
    return new Present(item);
  }

  static absent() {
    return Absent;
  }

  static fromUndefinedable(item) {
    return Optional.fromNullable(item);
  }

  static fromNullable(item) {
    return (!item) ? Optional.absent() : Optional.of(item);
  }
}

module.exports = Optional;
