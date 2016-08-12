'use strict';

const Distribution = require('distributions').Studentt;
const Summary = require('summary');

const util = require('util');
const AbstactStudentT = require('./abstact.js');

function StudentT(data, options) {
  AbstactStudentT.call(this, options);

  const summary = (data instanceof Summary) ? data : new Summary(data);

  this._freedom = summary.size() - 1;
  const variance = summary.variance();

  this._fac = Math.sqrt(variance* (1 / summary.size()));
  this._mean = summary.mean();

  this._dist = new Distribution(this._freedom);
}
util.inherits(StudentT, AbstactStudentT);
module.exports = StudentT;
