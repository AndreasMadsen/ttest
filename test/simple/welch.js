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

    pValue: 0.23056556843894693,
    testValue: -1.313064328597225660644,

    confidence: [
      -1.80084417807539,
      1.80084417807539
    ]
  });

  t.end();
});

test('testing not equal alternative', function (t) {
  const res = ttest(summary([1, 2, 2, 2, 4]), summary([0, 3, 3, 3, 2]), {
    mu: 1,
    varEqual: false,
    alpha: 0.05,
    alternative: 'not equal'
  });

  equals(t, res, {
    valid: true,
    freedom: 7.769053117782910966582,

    pValue: 0.23056556843894693,
    testValue: -1.313064328597225660644,

    confidence: [
      -1.80084417807539,
      1.80084417807539
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

    pValue: 0.11528278421947352,
    testValue: -1.313064328597225660644,

    confidence: [
      -Infinity,
      1.4428680787589634
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

    pValue: 0.8847172157805265,
    testValue: -1.313064328597225660644,

    confidence: [
      -1.4428680787589634,
      Infinity
    ]
  });

  t.end();
});
