export interface IOptions {
    mu: number;
    alternative: ('not equal' | 'less' | 'greater') | (0 | -1 | 1);
    alpha: number;
    varEqual?: boolean;
}

export interface ISummary {
    size: () => number;
    variance: () => number;
    mean: () => number;
}

export interface IData {
    size: number;
    variance: number;
    mean: number;

}
