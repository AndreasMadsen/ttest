'use strict';

const test = require('tap').test;
const ttest = require('../../hypothesis.js');

test('throws if left value is not compatible', function (t) {
  t.throws(() => ttest('string'), {
    message: 'left value in hypothesis test must be an array or data summary'
  });
  t.end();
});

test('throws if mu is not a number', function (t) {
  t.throws(() => ttest([0, 1, 2], { mu: 'string' }), {
    message: 'mu option must be a number'
  });
  t.end();
});

test('throws if varEqual is not a boolean', function (t) {
  t.throws(() => ttest([0, 1, 2], { varEqual: 'string' }), {
    message: 'varEqual option must be a boolean'
  });
  t.end();
});

test('throws if alpha is not a number or out of range', function (t) {
  t.throws(() => ttest([0, 1, 2], { alpha: 'string' }), {
    message: 'alpha option must be a number'
  });
  t.throws(() => ttest([0, 1, 2], { alpha: 1 }), {
    message: 'alpha must be below 1.0'
  });
  t.end();
});

test('throws if alternative is wrong', function (t) {
  t.throws(() => ttest([0, 1, 2], { alternative: 'bigger' }), {
    message: 'alternative must be either "not equal", "less" or "greater"'
  });
  t.end();
});
