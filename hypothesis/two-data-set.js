'use strict';

const util = require('util');
const AbstactStudentT = require('./abstact.js');

function StudentT(left, right, options) {
  AbstactStudentT.call(this, options);

  this._one = false;
  this._df = left.size + right.size - 2;

  const commonVariance = ((left.size - 1) * left.variance +
                          (right.size - 1) * right.variance
                         ) / this._df;

  this._se = Math.sqrt(commonVariance * (1 / left.size + 1 / right.size));
  this._mean = left.mean - right.mean;
}
util.inherits(StudentT, AbstactStudentT);
module.exports = StudentT;
