'use strict';

function equals(t, actual, expected) {

  t.strictEqual(actual.valid(), expected.valid, 'valid result match');

  t.equal(actual.freedom(), expected.freedom, 'degree of freedom match');

  match(t, actual.testValue(), expected.testValue, 'test value');

  match(t, actual.pValue(), expected.pValue, 'p-value');

  if (Number.isFinite(expected.confidence[0])) {
    match(t, actual.confidence()[0], expected.confidence[0], 'left confidence');
  } else {
    t.equal(actual.confidence()[0], expected.confidence[0], 'left confidence match');
  }

  if (Number.isFinite(expected.confidence[1])) {
    match(t, actual.confidence()[1], expected.confidence[1], 'right confidence');
  } else {
    t.equal(actual.confidence()[1], expected.confidence[1], 'right confidence match');
  }
}
module.exports = equals;

function match(t, actual, expected, name) {
  t.ok(Math.abs(actual - expected) <= 0.0000005, `${name} ${actual} match ${expected}`);
}
