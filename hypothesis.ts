const Summary = require('summary');

import { StudentT as OneDataSet } from './hypothesis/one-data-set';
import { StudentT as TwoDataSet } from './hypothesis/two-data-set.js';
import { StudentT as Welch } from './hypothesis/welch';
import { IData, IOptions, ISummary } from './ttest';
import { ITestProperties } from './test/test';


const ALTERNATIVE_MAP = new Map([
    ['not equal', 0],
    ['less', -1],
    ['greater', 1]
]) as Map<IOptions['alternative'], 0 | -1 | 1>;

const isSummary = (data: IData | ISummary): boolean =>
    data &&
    typeof data.mean === 'function' &&
    typeof data.variance === 'function' &&
    typeof data.size === 'function';


const isCalculated = (data: IData | ISummary): boolean =>
    data &&
    typeof data.mean === 'number' &&
    typeof data.variance === 'number' &&
    typeof data.size === 'number';

const isCompatible = (structure: number[] | ISummary): boolean =>
    Array.isArray(structure) ||
    isSummary(structure) ||
    isCalculated(structure);

const toData = (data: ISummary | IData): IData => {
    if (Array.isArray(data) || isSummary(data)) {
        const summary = isSummary(data) ? data : new Summary(data);
        return {
            mean: summary.mean(),
            variance: summary.variance(),
            size: summary.size()
        };
    } else {
        return data as IData;
    }
};

export function ttest/*hypothesis*/(left: IData | ISummary | number[] | ITestProperties,
                                    right: IData | ISummary | number[] | ITestProperties | IOptions | undefined,
                                    options?: IOptions) {
    // Vertify required arguments
    if (!isCompatible(left as ISummary)) {
        throw new TypeError(
            'left value in hypothesis test must be an array or data summary'
        );
    }

    if (!isCompatible(right as ISummary)) {
        options = right as IOptions;
        right = undefined;
    }

    // Set the default options
    options = Object.assign({
        mu: 0,
        varEqual: false,
        alpha: 0.05,
        alternative: 'not equal'
    }, options);

    // Convert alternative value
    if (ALTERNATIVE_MAP.has(options.alternative))
        options.alternative = ALTERNATIVE_MAP.get(options.alternative) as IOptions['alternative'];

    // Vertify mu option
    if (typeof options.mu !== 'number') {
        throw new TypeError('alpha option must be a number');
    }

    // Vertify varEqual option
    if (typeof options.varEqual !== 'boolean') {
        throw new TypeError('varEqual option must be a boolean');
    }

    // Vertify alpha option
    if (typeof options.alpha !== 'number') {
        throw new TypeError('alpha option must be a number');
    }
    if (options.alpha >= 1) {
        throw new RangeError('alpha must be bellow 1.0');
    }

    // Vertify alternative option
    if (typeof options.alternative === undefined) {
        throw new Error('alternative must be either not equal, less or greater');
    }

    // Perform the student's t test
    if (isCompatible(right as ISummary)) {
        return new (options.varEqual ? TwoDataSet : Welch)(toData(left as ISummary), toData(right as ISummary), options);
    } else {
        return new OneDataSet(toData(left as ISummary), options);
    }
}
