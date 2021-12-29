'use strict';

const Distribution = require('distributions').Studentt;

const AbstactStudentT = require('./abstact.js');

class StudentT extends AbstactStudentT {
  
  constructor(left, right, options) {
    super(options);

    this._df = left.size + right.size - 2;
    this._dist = new Distribution(this._df);

    const commonVariance = ((left.size - 1) * left.variance +
                            (right.size - 1) * right.variance
                          ) / this._df;

    this._se = Math.sqrt(commonVariance * (1 / left.size + 1 / right.size));
    this._mean = left.mean - right.mean;
  }

}

module.exports = StudentT;
