export interface ITestFunctions {
    valid(): any;

    freedom(): number;

    confidence(): number[];

    testValue(): any;

    pValue(): number;
}

export interface ITestProperties {
    mean?: number;
    variance?: number;
    size?: number;
    valid?: any;
    freedom?: number;
    confidence: number[];
    testValue?: any;
    pValue?: number;
}
