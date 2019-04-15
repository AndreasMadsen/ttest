"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const distributions_1 = require("distributions");
const abstact_1 = require("./abstact");
class StudentT extends abstact_1.AbstractStudentT {
    constructor(left, right, options) {
        super(options);
        this._df = left.size + right.size - 2;
        this._dist = new distributions_1.Studentt(this._df);
        const commonVariance = ((left.size - 1) * left.variance +
            (right.size - 1) * right.variance) / this._df;
        this._se = Math.sqrt(commonVariance * (1 / left.size + 1 / right.size));
        this._mean = left.mean - right.mean;
    }
}
exports.StudentT = StudentT;
