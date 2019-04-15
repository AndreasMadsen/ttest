import { Distribution } from 'distributions';

import { IOptions } from '../ttest.d';


export abstract class AbstractStudentT {
    _mean!: number;
    _se!: number;
    _df!: number;
    _dist!: Distribution;

    protected constructor(private _options: IOptions) {}

    testValue() {
        const diff = this._mean - this._options.mu;
        return diff / this._se;
    }

    pValue(): number {
        const t = this.testValue();

        switch (this._options.alternative) {
            case 1: // mu > mu[0]
                return 1 - this._dist.cdf(t);
            case -1: // mu < mu[0]
                return this._dist.cdf(t);
            case 0: // mu != mu[0]
                return 2 * (1 - this._dist.cdf(Math.abs(t)));
        }
        return 0;
    };

    confidence(): [number, number] {
        let pm;
        switch (this._options.alternative) {
            case 1: // mu > mu[0]
                pm = Math.abs(this._dist.inv(this._options.alpha)) * this._se;
                return [this._mean - pm, Infinity];
            case -1: // mu < mu[0]
                pm = Math.abs(this._dist.inv(this._options.alpha)) * this._se;
                return [-Infinity, this._mean + pm];
            case 0: // mu != mu[0]
                pm = Math.abs(this._dist.inv(this._options.alpha / 2)) * this._se;
                return [this._mean - pm, this._mean + pm];
        }
        return [0, 0];
    };

    valid() {
        return this.pValue() >= this._options.alpha;
    }

    freedom() {
        return this._df;
    }
}
