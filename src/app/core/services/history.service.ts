import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Subject } from "rxjs";
import { CheckResult, HistoryEntry } from "../models/check-result.model";

@Injectable({
    providedIn: 'root'
})
export class HistoryService {

    private readonly STORAGE_KEY= 'secury-scan-history';
    historyUpdated$ = new Subject<void>();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    getHistory(): HistoryEntry[] {
        if (!isPlatformBrowser(this.platformId)) return []
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) return [];
        const parsed = JSON.parse(data);
        return parsed.map((e: HistoryEntry) => ({
            ...e,
            checkedAt: new Date(e.checkedAt)
        }));
    }

    addEntry(result: CheckResult): void {
        if (!isPlatformBrowser(this.platformId)) return;
        const history = this.getHistory();
        const entry: HistoryEntry = {
            maskedPassword: this.maskPassword(result.password),
            isCompromised: result.isCompromised,
            timesFound: result.timesFound,
            checkedAt: result.checkedAt
        };
        history.unshift(entry);
        const limited = history.slice(0, 20);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limited));
        this.historyUpdated$.next();
    }

    clearHistory(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        localStorage.removeItem(this.STORAGE_KEY)
        this.historyUpdated$.next();
    }

    private maskPassword(password: string): string {
        if (password.length <= 2) return '****';
        return password[0] + '****' + password[password.length - 1];
    }
}