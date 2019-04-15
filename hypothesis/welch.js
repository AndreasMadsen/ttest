"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const distributions_1 = require("distributions");
const abstact_1 = require("./abstact");
class StudentT extends abstact_1.AbstractStudentT {
    constructor(left, right, options) {
        super(options);
        const leftSE = left.variance / left.size;
        const rightSE = right.variance / right.size;
        const commonVariance = leftSE + rightSE;
        this._df = Math.pow(commonVariance, 2) / (Math.pow(leftSE, 2) / (left.size - 1) +
            Math.pow(rightSE, 2) / (right.size - 1));
        this._dist = new distributions_1.Studentt(this._df);
        this._se = Math.sqrt(commonVariance);
        this._mean = left.mean - right.mean;
    }
}
exports.StudentT = StudentT;
