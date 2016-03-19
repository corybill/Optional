"use strict";

exports.errorTypes = {
  IllegalState: {
    key: "IllegalState",
    prefix: "Optional Illegal State Error"
  }
};

exports.code = {
  MustBePresent: 1000,
  AtLeastOnePresent: 1001,
  MissingTransformFunction: 1002
};

exports.error = {
  MustBePresent: {
    code: exports.code.MustBePresent,
    type: exports.errorTypes.IllegalState,
    message: `${exports.errorTypes.IllegalState.prefix} (${exports.code.MustBePresent}): Optional item must be present.`
  },
  AtLeastOnePresent: {
    code: exports.code.AtLeastOnePresent,
    type: exports.errorTypes.IllegalState,
    message: `${exports.errorTypes.IllegalState.prefix} (${exports.code.AtLeastOnePresent}): Either the 'of' value or the 'or' value must be present.  Consider using Optional.orNull() / orUndefined() instead of Optional.or(null || undefined).`
  },
  MissingTransformFunction: {
    code: exports.code.MissingTransformFunction,
    type: exports.errorTypes.IllegalState,
    message: `${exports.errorTypes.IllegalState.prefix} (${exports.code.MissingTransformFunction}): Transform Function must be given.`
  }
};
