'use strict';

const Distribution = require('distributions').Studentt;
const Summary = require('summary');

const util = require('util');
const AbstactStudentT = require('./abstact.js');

function StudentT(left, right, options) {
  AbstactStudentT.call(this, options);

  const leftsummary = (left instanceof Summary) ? left : new Summary(left);
  const rightsummary = (right instanceof Summary) ? right : new Summary(right);

  this._freedom = leftsummary.size() + rightsummary.size() - 2;
  const commonVariance = ((leftsummary.size() - 1) * leftsummary.variance() +
                        (rightsummary.size() - 1) * rightsummary.variance()) / this._freedom;

  this._fac = Math.sqrt(commonVariance * (1 / leftsummary.size() + 1 / rightsummary.size()));
  this._mean = leftsummary.mean() - rightsummary.mean();

  this._dist = new Distribution(this._freedom);
}
util.inherits(StudentT, AbstactStudentT);
module.exports = StudentT;
