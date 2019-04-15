"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const distributions_1 = require("distributions");
const abstact_1 = require("./abstact");
class StudentT extends abstact_1.AbstractStudentT {
    constructor(data, options) {
        super(options);
        this._df = data.size - 1;
        this._dist = new distributions_1.Studentt(this._df);
        this._se = Math.sqrt(data.variance / data.size);
        this._mean = data.mean;
    }
}
exports.StudentT = StudentT;
