
var OneDataSet = require('./hypothesis/one-data-set.js');
var TwoDataSet = require('./hypothesis/two-data-set.js');

var Summary = require('summary');

var ALTERNATIVE_MAP = {
  "not equal": 0,
  "less": -1,
  "greater": 1
};

function isList(list) {
  return (Array.isArray(list) || list instanceof Summary);
}

function hypothesis(left, right, options) {
  // Vertify required arguments
  if (!isList(left)) {
    throw new TypeError('left value in hypothesis test must be an array');
  }

  if (!isList(right)) {
    options = right;
    right = undefined;
  }

  // Set the default options
  if (!options) options = {};

  options = {
    mu: options.hasOwnProperty('mu') ? options.mu : 0,
    alpha: options.hasOwnProperty('alpha') ? options.alpha : 0.05,
    alternative: options.hasOwnProperty('alternative') ? ALTERNATIVE_MAP[options.alternative] : 0
  };

  // Vertify mu option
  if (typeof options.mu !== 'number') {
    throw new TypeError('alpha option must be a number');
  }

  // Vertify alpha option
  if (typeof options.alpha !== 'number') {
    throw new TypeError('alpha option must be a number');
  }
  if (options.alpha >= 1) {
    throw new RangeError('alpha must be bellow 1.0');
  }

  // Vertify alternative option
  if (typeof options.alternative === undefined) {
    throw new Error('alternative must be either not equal, less or greater');
  }

  // Perform the student's t test
  if (isList(right)) {
    return new TwoDataSet(left, right, options);
  } else {
    return new OneDataSet(left, options);
  }
}
module.exports = hypothesis;
