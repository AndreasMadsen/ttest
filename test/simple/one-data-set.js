
var test = require('tap').test;
var ttest = require('../../hypothesis.js');
var equals = require('../equals.js');

var summary = require('summary');

test('testing not equal alternative', function (t) {
  var res = ttest([1, 2, 2, 2, 4], {
    mu: 2,
    alpha: 0.05,
    alternative: "not equal"
  });

  equals(t, res, {
    valid: true,
    freedom: 4,

    pValue: 0.703999999999999737099187768763,
    testValue: 0.408248290463863405808098150374,

    confidence: [
      0.839825238683489017077477001294,
      3.560174761316511560238495803787
    ]
  });

  t.end();
});

/*
test('testing summary as argument', function (t) {
  var res = ttest(summary([1, 2, 2, 2, 4]), {
    mu: 2,
    alpha: 0.05,
    alternative: "not equal"
  });

  equals(t, res, {
    valid: true,
    freedom: 4,

    pValue: 0.703999999999999737099187768763,
    testValue: 0.408248290463863405808098150374,

    confidence: [
      0.839825238683489017077477001294,
      3.560174761316511560238495803787
    ]
  });

  t.end();
});

test('testing less alternative', function (t) {
  var res = ttest([1, 2, 2, 2, 4], {
    mu: 2,
    alpha: 0.05,
    alternative: "less"
  });

  equals(t, res, {
    valid: true,
    freedom: 4,

    pValue: 0.648000000000000131450406115619,
    testValue: 0.408248290463863405808098150374,

    confidence: [
      -Infinity,
      3.244387367258481980059059424093
    ]
  });

  t.end();
});

test('testing greater alternative', function (t) {
  var res = ttest([1, 2, 2, 2, 4], {
    mu: 2,
    alpha: 0.05,
    alternative: "greater"
  });

  equals(t, res, {
    valid: true,
    freedom: 4,

    pValue: 0.351999999999999868549593884381,
    testValue: 0.408248290463863405808098150374,

    confidence: [
      1.155612632741518375212308455957,
      Infinity
    ]
  });

  t.end();
});
*/
