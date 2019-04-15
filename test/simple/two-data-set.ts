import { ttest } from '../../hypothesis';
import { equals } from '../equals';

const summary = require('summary');

describe('two-data-set', () => {
    it('testing not equal alternative', (done) => {
        const res = ttest([1, 2, 2, 2, 4], [0, 3, 3, 3, 2], {
            mu: 1,
            varEqual: true,
            alpha: 0.05,
            alternative: 'not equal'
        });

        equals(res, {
            valid: true,
            freedom: 8,

            pValue: 0.225571973816597132200811870462,
            testValue: -1.313064328597225660644198796945,

            confidence: [
                -1.756200427489884585696700014523,
                1.756200427489884585696700014523
            ]
        });

        done();
    });

    it('testing not equal alternative', (done) => {
        const res = ttest(summary([1, 2, 2, 2, 4]), summary([0, 3, 3, 3, 2]), {
            mu: 1,
            varEqual: true,
            alpha: 0.05,
            alternative: 'not equal'
        });

        equals(res, {
            valid: true,
            freedom: 8,

            pValue: 0.225571973816597132200811870462,
            testValue: -1.313064328597225660644198796945,

            confidence: [
                -1.756200427489884585696700014523,
                1.756200427489884585696700014523
            ]
        });

        done();
    });

    it('testing less alternative', (done) => {
        const res = ttest([1, 2, 2, 2, 4], [0, 3, 3, 3, 2], {
            mu: 1,
            varEqual: true,
            alpha: 0.05,
            alternative: 'less'
        });

        equals(res, {
            valid: true,
            freedom: 8,

            pValue: 0.112785986908298566100405935231,
            testValue: -1.313064328597225660644198796945,

            confidence: [
                -Infinity,
                1.416189593328981199960026060580
            ]
        });

        done();
    });

    it('testing greater alternative', (done) => {
        const res = ttest([1, 2, 2, 2, 4], [0, 3, 3, 3, 2], {
            mu: 1,
            varEqual: true,
            alpha: 0.05,
            alternative: 'greater'
        });

        equals(res, {
            valid: true,
            freedom: 8,

            pValue: 0.887214013091701447777381872584,
            testValue: -1.313064328597225660644198796945,

            confidence: [
                -1.416189593328981199960026060580,
                Infinity
            ]
        });

        done();
    });
});
