import { Distribution, Studentt } from 'distributions';

import { IData, IOptions } from '../ttest.d';
import { AbstractStudentT } from './abstact';


export class StudentT extends AbstractStudentT {
    constructor(left: IData, right: IData, options: IOptions) {
        super(options);
        this._df = left.size + right.size - 2;
        this._dist = new (Studentt as any as {new(distr: number): Distribution})(this._df);

        const commonVariance = ((left.size - 1) * left.variance +
            (right.size - 1) * right.variance
        ) / this._df;

        this._se = Math.sqrt(commonVariance * (1 / left.size + 1 / right.size));
        this._mean = left.mean - right.mean;
    }
}
