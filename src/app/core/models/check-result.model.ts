export interface CheckResult {
    password: string;
    hash: string;
    isCompromised: boolean;
    timesFound: number;
    checkedAt: Date;
}