import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    async generateSHA1(text: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    }

    getPrefix(hash : string): string {
        return hash.substring(0, 5);
    }

    getSuffix(hash: string): string {
        return hash.substring(5);
    }
}