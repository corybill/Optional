"use strict";

var Optional = require("./Optional");

function Absent() {
  Optional.call(this);
}

Absent.prototype = Object.create(Optional.prototype);

Absent.prototype.getItem = function () {
  if (!this.item) {
    throw new Error("Illegal State Error: Value must be defined.");
  }
};

Absent.prototype.or = function (item) {
  return item;
};

Absent.prototype.orUndefined = function (item) {
  return undefined;
};

Absent.prototype.isPresent = function () {
  return false;
};

module.exports = new Absent();
