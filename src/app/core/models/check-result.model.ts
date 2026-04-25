export interface CheckResult {
    password: string;
    hash: string;
    isCompromised: boolean;
    timesFound: number;
    checkedAt: Date;
}

export interface HistoryEntry {
    maskedPassword: string;
    isCompromised: boolean;
    timesFound: number;
    checkedAt: Date;
}