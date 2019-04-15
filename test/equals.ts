import * as assert from 'assert';

import { ITestFunctions, ITestProperties } from './test';


export const equals = (actual: ITestFunctions, expected: ITestProperties) => {
    assert.strictEqual(actual.valid(), expected.valid, 'valid result match');

    assert.strictEqual(actual.freedom(), expected.freedom, 'degree of freedom match');

    match(actual.testValue(), expected.testValue, 'test value');

    match(actual.pValue(), expected.pValue as number, 'p-value');

    if (Number.isFinite((expected.confidence)[0])) {
        match(actual.confidence()[0], (expected.confidence)[0], 'left confidence');
    } else {
        assert.strictEqual(actual.confidence()[0], (expected.confidence)[0], 'left confidence match');
    }

    if (Number.isFinite((expected.confidence)[1])) {
        match(actual.confidence()[1], (expected.confidence)[1], 'right confidence');
    } else {
        assert.strictEqual(actual.confidence()[1], (expected.confidence)[1], 'right confidence match');
    }
};

const match = (actual: number, expected: number, name: string) =>
    assert.ok(Math.abs(actual - expected) <= 0.0000005, `${name} ${actual} match ${expected}`);
