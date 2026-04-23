import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { CryptoService } from "./crypto.service";
import { CheckResult } from "../models/check-result.model";

@Injectable({
    providedIn: 'root'
})
export class HibpService {

    private readonly API_URL = 'https://api.pwnedpasswords.com/range';

    constructor(
        private http: HttpClient,
        private cryptoService: CryptoService
    ) {}

    async checkPassword(password: string): Promise<CheckResult> {
        const hash = await this.cryptoService.generateSHA1(password);
        const prefix = this.cryptoService.getPrefix(hash);
        const suffix = this.cryptoService.getSuffix(hash);

        const response = await firstValueFrom(
            this.http.get(`${this.API_URL}/${prefix}`, { responseType: 'text' })
        );

        const timesFound = this.findSuffix(response, suffix);

        return {
            password,
            hash,
            isCompromised: timesFound > 0,
            timesFound,
            checkedAt: new Date()
        };
    }

    private findSuffix(responseText: string, suffix: string): number {
        const lines = responseText.split('\n');
        for (const line of lines) {
            const [hashSuffix, count] = line.split(':');
            if (hashSuffix.trim().toUpperCase() === suffix.toUpperCase()) {
                return parseInt(count.trim(), 10);
            }
        }
        return 0;
    }
}