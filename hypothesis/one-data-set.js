'use strict';

const util = require('util');
const AbstactStudentT = require('./abstact.js');

function StudentT(data, options) {
  AbstactStudentT.call(this, options);

  this._one = true;
  this._df = data.size - 1;

  this._se = Math.sqrt(data.variance / data.size);
  this._mean = data.mean;
}
util.inherits(StudentT, AbstactStudentT);
module.exports = StudentT;
