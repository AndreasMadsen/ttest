
var Distribution = require('distributions').Studentt;
var Summary = require('summary');

var util = require('util');
var AbstactStudentT = require('./abstact.js');

function StudentT(data, options) {
  AbstactStudentT.call(this, options);

  var summary = (data instanceof Summary) ? data : new Summary(data);

  this._freedom = summary.size() - 1;
  var variance = summary.variance();

  this._fac = Math.sqrt(variance* (1 / summary.size()));
  this._mean = summary.mean();

  this._dist = new Distribution(this._freedom);
}
util.inherits(StudentT, AbstactStudentT);
module.exports = StudentT;
