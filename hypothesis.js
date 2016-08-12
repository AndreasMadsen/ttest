'use strict';

const OneDataSet = require('./hypothesis/one-data-set.js');
const TwoDataSet = require('./hypothesis/two-data-set.js');
const Welch = require('./hypothesis/welch.js');

const Summary = require('summary');

const ALTERNATIVE_MAP = Object.assign(Object.create(null), {
  'not equal': 0,
  'less': -1,
  'greater': 1
});

function isList(list) {
  return (Array.isArray(list) || list instanceof Summary);
}

function toSummary(data) {
  return (data instanceof Summary) ? data : new Summary(data);
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
  options = Object.assign({
    mu: 0,
    varEqual: false,
    alpha: 0.05,
    alternative: 'not equal'
  }, options);

  // Convert alternative value
  options.alternative = ALTERNATIVE_MAP[options.alternative];

  // Vertify mu option
  if (typeof options.mu !== 'number') {
    throw new TypeError('alpha option must be a number');
  }

  // Vertify varEqual option
  if (typeof options.varEqual !== 'boolean') {
    throw new TypeError('varEqual option must be a boolean');
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
    if (options.varEqual) {
      return new TwoDataSet(toSummary(left), toSummary(right), options);
    } else {
      return new Welch(toSummary(left), toSummary(right), options);
    }
  } else {
    return new OneDataSet(toSummary(left), options);
  }
}
module.exports = hypothesis;
