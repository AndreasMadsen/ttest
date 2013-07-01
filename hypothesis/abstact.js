
function AbstactStudentT(options) {
  this._options = options;
}
module.exports = AbstactStudentT;

AbstactStudentT.prototype.testValue = function () {
  var dif = (this._mean - this._options.mu);
  return dif / this._fac;
};

AbstactStudentT.prototype.pValue = function () {
  var t = this.testValue();

  switch (this._options.alternative) {
    case 1: // mu > mu[0]
      return 1 - this._dist.cdf(t);
    case -1: // mu < mu[0]
      return this._dist.cdf(t);
    case 0: // mu != mu[0]
      return 2 * (1 - this._dist.cdf(Math.abs(t)));
  }
};

AbstactStudentT.prototype.confidence = function () {
  var pm;
  switch (this._options.alternative) {
    case 1: // mu > mu[0]
      pm = Math.abs(this._dist.inv(this._options.alpha)) * this._fac;
      return [this._mean - pm, Infinity];
    case -1: // mu < mu[0]
      pm = Math.abs(this._dist.inv(this._options.alpha)) * this._fac;
      return [-Infinity, this._mean + pm];
    case 0: // mu != mu[0]
      pm = Math.abs(this._dist.inv(this._options.alpha / 2)) * this._fac;
      return [this._mean - pm, this._mean + pm];
  }
};

AbstactStudentT.prototype.valid = function () {
  return this.pValue() >= this._options.alpha;
};

AbstactStudentT.prototype.freedom = function () {
  return this._freedom;
}