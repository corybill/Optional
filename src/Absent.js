"use strict";

var absent;

function Absent() { }

Absent.prototype.getItem = function () {
  throw new Error("Illegal State Error: Value must be defined.");
};

Absent.prototype.or = function (item) {
  return item;
};

Absent.prototype.orUndefined = function () {
  return undefined;
};

Absent.prototype.isPresent = function () {
  return false;
};

Absent.prototype.transform = function () {
  return getInstance();
};

function getInstance() {
  if (!absent) {
    absent = new Absent();
  }
  return absent;
}

module.exports = {
  getInstance: getInstance,
  __constructor: Absent
};