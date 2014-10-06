"use strict";

function Optional(item) {
  this.item = item;
}

Optional.prototype.getItem = function () {
  if (!this.item) {
    throw new Error("Illegal State Error: Value must be defined.");
  }

  return this.item;
};

Optional.prototype.or = function (item) {
  return this.item || item;
};

Optional.prototype.orUndefined = function (item) {
  return this.item || undefined;
};

Optional.prototype.isPresent = function () {
  return (!this.item) ? false : true;
};

module.exports = Optional;