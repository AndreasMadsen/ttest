'use strict';

const Distribution = require('distributions').Studentt;

const AbstactStudentT = require('./abstact.js');

class StudentT extends AbstactStudentT {

  constructor(data, options) {
    super(options);
    this._df = data.size - 1;
    this._dist = new Distribution(this._df);
  
    this._se = Math.sqrt(data.variance / data.size);
    this._mean = data.mean;
  }

}

module.exports = StudentT;
