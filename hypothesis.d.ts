
type TTestOptions = {
    mu: number,
    varEqual: boolean,
    alpha: number,
    alternative: 'not equal'|'equal'|'less'|'greater'
}

type TTestResult = {
    testValue: () => number,
    pValue: () => number,
    confidence: () => [number, number],
    valid: () => boolean,
    freedom: () => number
}

interface TTestFn {
    (left: number[], right: number[], options:Partial<TTestOptions>|undefined = undefined): TTestResult;
}

declare var ttest: TTestFn;

export default ttest

