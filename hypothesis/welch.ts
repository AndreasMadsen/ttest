import { Distribution, Studentt } from 'distributions';

import { IData, IOptions } from '../ttest.d';
import { AbstractStudentT } from './abstact';


export class StudentT extends AbstractStudentT {
    constructor(left: IData, right: IData, options: IOptions) {
        super(options);

        const leftSE = left.variance / left.size;
        const rightSE = right.variance / right.size;
        const commonVariance = leftSE + rightSE;

        this._df = Math.pow(commonVariance, 2) / (
            Math.pow(leftSE, 2) / (left.size - 1) +
            Math.pow(rightSE, 2) / (right.size - 1)
        );
        this._dist = new (Studentt as any as {new(distr: number): Distribution})(this._df);

        this._se = Math.sqrt(commonVariance);
        this._mean = left.mean - right.mean;
    }
}
