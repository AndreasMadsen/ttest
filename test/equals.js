"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
exports.equals = (actual, expected) => {
    assert.strictEqual(actual.valid(), expected.valid, 'valid result match');
    assert.strictEqual(actual.freedom(), expected.freedom, 'degree of freedom match');
    match(actual.testValue(), expected.testValue, 'test value');
    match(actual.pValue(), expected.pValue, 'p-value');
    if (Number.isFinite((expected.confidence)[0])) {
        match(actual.confidence()[0], (expected.confidence)[0], 'left confidence');
    }
    else {
        assert.strictEqual(actual.confidence()[0], (expected.confidence)[0], 'left confidence match');
    }
    if (Number.isFinite((expected.confidence)[1])) {
        match(actual.confidence()[1], (expected.confidence)[1], 'right confidence');
    }
    else {
        assert.strictEqual(actual.confidence()[1], (expected.confidence)[1], 'right confidence match');
    }
};
const match = (actual, expected, name) => assert.ok(Math.abs(actual - expected) <= 0.0000005, `${name} ${actual} match ${expected}`);
