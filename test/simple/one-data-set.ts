import { ttest } from '../../hypothesis';
import { equals } from '../equals';
import { ITestProperties } from '../test';

const summary = require('summary');

describe('one-data-set', () => {
    it('testing not equal alternative', (done) => {
        const res = ttest([1, 2, 2, 2, 4], {
            mu: 2,
            alpha: 0.05,
            alternative: 'not equal'
        });

        let e = undefined;

        try {
            equals(res, {
                valid: true,
                freedom: 4,

                pValue: 0.703999999999999737099187768763,
                testValue: 0.408248290463863405808098150374,

                confidence: [
                    0.839825238683489017077477001294,
                    3.560174761316511560238495803787
                ]
            });
        } catch (err) {
            e = err;
        } finally {
            done(e);
        }
    });

    it('testing summary as argument', (done) => {
        const res = ttest(summary([1, 2, 2, 2, 4]), {
            mu: 2,
            alpha: 0.05,
            alternative: 'not equal'
        });

        let e = undefined;

        try {
            equals(res, {
                valid: true,
                freedom: 4,

                pValue: 0.703999999999999737099187768763,
                testValue: 0.408248290463863405808098150374,

                confidence: [
                    0.839825238683489017077477001294,
                    3.560174761316511560238495803787
                ]
            });
        } catch (err) {
            e = err;
        } finally {
            done(e);
        }
    });

    it('testing plain object as argument', (done) => {
        const sum = summary([1, 2, 2, 2, 4]);
        const obj = ['mean', 'variance', 'size']
            .reduce(
                (a, b) => Object.assign(a, { [b]: sum[b]() }), {}
            ) as ITestProperties;
        const res = ttest(obj, {
            mu: 2,
            alpha: 0.05,
            alternative: 'not equal'
        });

        let e = undefined;

        try {
            equals(res, {
                valid: true,
                freedom: 4,

                pValue: 0.703999999999999737099187768763,
                testValue: 0.408248290463863405808098150374,

                confidence: [
                    0.839825238683489017077477001294,
                    3.560174761316511560238495803787
                ]
            });

        } catch (err) {
            e = err;
        } finally {
            done(e);
        }
    });

    it('testing less alternative', (done) => {
        const res = ttest([1, 2, 2, 2, 4], {
            mu: 2,
            alpha: 0.05,
            alternative: 'less'
        });

        let e = undefined;

        try {
            equals(res, {
                valid: true,
                freedom: 4,

                pValue: 0.648000000000000131450406115619,
                testValue: 0.408248290463863405808098150374,

                confidence: [
                    -Infinity,
                    3.244387367258481980059059424093
                ]
            });
        } catch (err) {
            e = err;
        } finally {
            done(e);
        }
    });

    it('testing greater alternative', (done) => {
        const res = ttest([1, 2, 2, 2, 4], {
            mu: 2,
            alpha: 0.05,
            alternative: 'greater'
        });

        let e = undefined;

        try {
            equals(res, {
                valid: true,
                freedom: 4,

                pValue: 0.351999999999999868549593884381,
                testValue: 0.408248290463863405808098150374,

                confidence: [
                    1.155612632741518375212308455957,
                    Infinity
                ]
            });
        } catch (err) {
            e = err;
        } finally {
            done(e);
        }
    });
});
