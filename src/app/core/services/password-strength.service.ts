import { Injectable } from "@angular/core";
import { console } from "inspector";

export interface StrengthResult {
    score: number;
    label: string;
    color: string;
    criteria: {
        minLength: boolean;
        hasUppercase: boolean;
        hasLowercase: boolean;
        hasNumbers: boolean;
        hasSpecialChars: boolean;
    };
}

@Injectable({
    providedIn: 'root'
})
export class PasswordStrengthService {

    evaluate(password: string): StrengthResult {
        const criteria = {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumbers: /[0-9]/.test(password),
            hasSpecialChars: /[!@#$%^&*(),.?"{}|<>]/.test(password)
        };

        const score = Object.values(criteria).filter(Boolean).length;

        const labels: Record<number, string> = {
            0: 'Muy débil',
            1: 'Muy débil',
            2: 'Débil',
            3: 'Regular',
            4: 'Fuerte',
            5: 'Muy fuerte'
        };

        const colors: Record<number, string> = {
            0: '#f44336',
            1: '#f44336',
            2: '#ff9800',
            3: '#ffeb3b',
            4: '#8bc34a',
            5: '#4caf50'
        };

        return {
            score,
            label: labels[score],
            color: colors[score],
            criteria
        };
    }
}