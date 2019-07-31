'use strict';

const test = require('tap').test;
const ttest = require('../../hypothesis.js');
const equals = require('../equals.js');

const summary = require('summary');

test('testing not equal alternative', function (t) {
  const res = ttest([1, 2, 2, 2, 4], [0, 3, 3, 3, 2], {
    mu: 1,
    varEqual: false,
    alpha: 0.05,
    alternative: 'not equal'
  });

  equals(t, res, {
    valid: true,
    freedom: 7.769053117782910966582,

    pValue: 0.22661539838413605,
    testValue: -1.313064328597225660644,

    confidence: [
      -1.7653291692417925,
      1.7653291692417925
    ]
  });

  t.end();
});

test('testing not equal alternative with summary', function (t) {
  const res = ttest(summary([1, 2, 2, 2, 4]), summary([0, 3, 3, 3, 2]), {
    mu: 1,
    varEqual: false,
    alpha: 0.05,
    alternative: 'not equal'
  });

  equals(t, res, {
    valid: true,
    freedom: 7.769053117782910966582,

    pValue: 0.22661539838413605,
    testValue: -1.313064328597225660644,

    confidence: [
      -1.7653291692417925,
      1.7653291692417925
    ]
  });

  t.end();
});

test('testing less alternative', function (t) {
  const res = ttest([1, 2, 2, 2, 4], [0, 3, 3, 3, 2], {
    mu: 1,
    varEqual: false,
    alpha: 0.05,
    alternative: 'less'
  });

  equals(t, res, {
    valid: true,
    freedom: 7.769053117782910966582,

    pValue: 0.11330769919206803,
    testValue: -1.313064328597225660644,

    confidence: [
      -Infinity,
      1.4216665293566955
    ]
  });

  t.end();
});

test('testing greater alternative', function (t) {
  const res = ttest([1, 2, 2, 2, 4], [0, 3, 3, 3, 2], {
    mu: 1,
    varEqual: false,
    alpha: 0.05,
    alternative: 'greater'
  });

  equals(t, res, {
    valid: true,
    freedom: 7.769053117782910966582,

    pValue: 0.8866923008079319,
    testValue: -1.313064328597225660644,

    confidence: [
      -1.4216665293566955,
      Infinity
    ]
  });

  t.end();
});
