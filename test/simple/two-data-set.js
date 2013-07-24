
var test = require('tap').test;
var ttest = require('../../hypothesis.js');
var equals = require('../equals.js');

var summary = require('summary');

test('testing not equal alternative', function (t) {
  var res = ttest([1, 2, 2, 2, 4], [0, 3, 3, 3, 2], {
    mu: 1,
    alpha: 0.05,
    alternative: "not equal"
  });

  equals(t, res, {
    valid: true,
    freedom: 8,

    pValue: 0.225571973816597132200811870462,
    testValue: -1.313064328597225660644198796945,

    confidence: [
      -1.756200427489884585696700014523,
      1.756200427489884585696700014523
    ]
  });

  t.end();
});

test('testing not equal alternative', function (t) {
  var res = ttest(summary([1, 2, 2, 2, 4]), summary([0, 3, 3, 3, 2]), {
    mu: 1,
    alpha: 0.05,
    alternative: "not equal"
  });

  equals(t, res, {
    valid: true,
    freedom: 8,

    pValue: 0.225571973816597132200811870462,
    testValue: -1.313064328597225660644198796945,

    confidence: [
      -1.756200427489884585696700014523,
      1.756200427489884585696700014523
    ]
  });

  t.end();
});

test('testing less alternative', function (t) {
  var res = ttest([1, 2, 2, 2, 4], [0, 3, 3, 3, 2], {
    mu: 1,
    alpha: 0.05,
    alternative: "less"
  });

  equals(t, res, {
    valid: true,
    freedom: 8,

    pValue: 0.112785986908298566100405935231,
    testValue: -1.313064328597225660644198796945,

    confidence: [
      -Infinity,
      1.416189593328981199960026060580
    ]
  });

  t.end();
});

test('testing greater alternative', function (t) {
  var res = ttest([1, 2, 2, 2, 4], [0, 3, 3, 3, 2], {
    mu: 1,
    alpha: 0.05,
    alternative: "greater"
  });

  equals(t, res, {
    valid: true,
    freedom: 8,

    pValue: 0.887214013091701447777381872584,
    testValue: -1.313064328597225660644198796945,

    confidence: [
      -1.416189593328981199960026060580,
      Infinity
    ]
  });

  t.end();
});
