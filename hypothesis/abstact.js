'use strict';

const cephes = require('cephes');

function AbstactStudentT(options) {
  this._options = options;
}
module.exports = AbstactStudentT;

AbstactStudentT.prototype.testValue = function () {
  const diff = (this._mean - this._options.mu);
  return diff / this._se;
};

AbstactStudentT.prototype.pValue = function () {
  const t = this.testValue();

  const alternative = this._one ? this._options.alternative : -this._options.alternative;
  const x = this._df / (this._df + t * t);
  const cdf = cephes.incbet(0.5 * this._df, 0.5, x);
  switch (alternative) {
  case 1: // mu > mu[0]
    return 0.5 * cdf;
  case -1: // mu < mu[0]
    return 1 - 0.5 * cdf;
  case 0: // mu != mu[0]
    return cdf;
  }
};

AbstactStudentT.prototype.confidence = function () {
  let pm;
  switch (this._options.alternative) {
  case 1: // mu > mu[0]
    pm = Math.abs(inverseStudent(this._df, this._options.alpha)) * this._se;
    return [this._mean - pm, Infinity];
  case -1: // mu < mu[0]
    pm = Math.abs(inverseStudent(this._df, this._options.alpha)) * this._se;
    return [-Infinity, this._mean + pm];
  case 0: // mu != mu[0]
    pm = Math.abs(inverseStudent(this._df, this._options.alpha / 2)) * this._se;
    return [this._mean - pm, this._mean + pm];
  }
};

AbstactStudentT.prototype.valid = function () {
  return this.pValue() >= this._options.alpha;
};

AbstactStudentT.prototype.freedom = function () {
  return this._df;
}

function inverseStudent(k, p) {
  if (p > 0.25 && p < 0.75) {
    if (p === 0.5) {
      return 0;
    }
    let z = 1 - 2 * p;
    z = cephes.incbi(0.5, 0.5 * k, Math.abs(z));
    let t = Math.sqrt(k * z / (1 - z));
    if (p < 0.5) {
      t = -t;
    }
    return t;
  } else {
    let rflg = -1;
    if (p >= 0.5) {
      p = 1 - p;
      rflg = 1;
    }
    const z = cephes.incbi(0.5 * k, 0.5, 2 * p);
    const t = Math.sqrt(k / z - k);
    return rflg * t;
  }
}