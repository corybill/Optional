"use strict";

var Optional = require("./Optional");
var absent = require("./Absent");

module.exports = {
  of: function (item) {
    if (!item) {
      throw new Error("Illegal State Error: Must contain defined value.");
    }
    return new Optional(item);
  },
  absent: function () {
    return absent;
  },

  fromUndefined: function (item) {
    return (!item) ? absent : new Optional(item);
  },

  instance: function (item) {
    return new Optional(item);
  }
};