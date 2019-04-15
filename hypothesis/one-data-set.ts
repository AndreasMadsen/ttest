import { Distribution, Studentt } from 'distributions';

import { AbstractStudentT } from './abstact';
import { IData, IOptions } from '../ttest.d';


export class StudentT extends AbstractStudentT {
    constructor(data: IData, options: IOptions) {
        super(options);

        this._df = data.size - 1;
        this._dist = new (Studentt as any as {new(distr: number): Distribution})(this._df);

        this._se = Math.sqrt(data.variance / data.size);
        this._mean = data.mean;
    }
}
