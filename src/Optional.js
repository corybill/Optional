"use strict";

var Absent = require("./Absent");

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

Optional.prototype.orUndefined = function () {
  return this.item || undefined;
};

Optional.prototype.isPresent = function () {
  return (!this.item) ? false : true;
};

Optional.prototype.transform = function (func) {
  if (!func || !(func instanceof Function)) {
    throw new Error("Illegal Argument Error: parameter must be  a Function");
  }

  return this.isPresent() ? func(this.item) : Absent.getInstance();
};

module.exports = {
  of: function (item) {
    if (!item) {
      throw new Error("Illegal State Error: Must contain defined value.");
    }
    return new Optional(item);
  },
  absent: function () {
    return Absent.getInstance();
  },

  fromUndefinedable: function (item) {
    return (!item) ? Absent.getInstance() : new Optional(item);
  },

  fromNullable: function (item) {
    throw new Error("Illegal State Error: Use 'fromUndefinedable()'.");
  },

  newOptional: function (item) {
    return new Optional(item);
  },

  __constructor: Optional
};