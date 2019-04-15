"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Summary = require('summary');
const one_data_set_1 = require("./hypothesis/one-data-set");
const two_data_set_js_1 = require("./hypothesis/two-data-set.js");
const welch_1 = require("./hypothesis/welch");
const ALTERNATIVE_MAP = new Map([
    ['not equal', 0],
    ['less', -1],
    ['greater', 1]
]);
const isSummary = (data) => data &&
    typeof data.mean === 'function' &&
    typeof data.variance === 'function' &&
    typeof data.size === 'function';
const isCalculated = (data) => data &&
    typeof data.mean === 'number' &&
    typeof data.variance === 'number' &&
    typeof data.size === 'number';
const isCompatible = (structure) => Array.isArray(structure) ||
    isSummary(structure) ||
    isCalculated(structure);
const toData = (data) => {
    if (Array.isArray(data) || isSummary(data)) {
        const summary = isSummary(data) ? data : new Summary(data);
        return {
            mean: summary.mean(),
            variance: summary.variance(),
            size: summary.size()
        };
    }
    else {
        return data;
    }
};
function ttest /*hypothesis*/(left, right, options) {
    // Vertify required arguments
    if (!isCompatible(left)) {
        throw new TypeError('left value in hypothesis test must be an array or data summary');
    }
    if (!isCompatible(right)) {
        options = right;
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
        options.alternative = ALTERNATIVE_MAP.get(options.alternative);
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
    if (isCompatible(right)) {
        return new (options.varEqual ? two_data_set_js_1.StudentT : welch_1.StudentT)(toData(left), toData(right), options);
    }
    else {
        return new one_data_set_1.StudentT(toData(left), options);
    }
}
exports.ttest = ttest;
