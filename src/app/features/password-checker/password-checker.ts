import { Component, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HibpService } from '../../core/services/hibp.service';
import { HistoryService } from '../../core/services/history.service';
import { PasswordStrengthService, StrengthResult } from '../../core/services/password-strength.service';
import { CheckResult } from '../../core/models/check-result.model';
import { ResultCardComponent } from '../result-card/result-card';

@Component({
  selector: 'app-password-checker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ResultCardComponent
  ],
  templateUrl: './password-checker.html',
  styleUrl: './password-checker.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-30px)' }))
      ])
    ])
  ]
})
export class PasswordCheckerComponent {
  password = '';
  hidePassword = true;
  loading = false;
  result: CheckResult | null = null;
  strength: StrengthResult | null = null;

  constructor(
    private hibpService : HibpService,
    private historyService: HistoryService,
    private strengthService: PasswordStrengthService,
    private cdr: ChangeDetectorRef
  ) {}

  onPasswordChange(value: string): void {
    this.strength = value ? this.strengthService.evaluate(value) : null;
  }

  async checkPassword(): Promise<void> {
    if (!this.password) return;
    this.loading = true;
    this.result = null;
    try {
      this.result = await this.hibpService.checkPassword(this.password);
      this.historyService.addEntry(this.result)
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
    } finally {
      this.loading = false;
      this.password = '';
      this.strength = null
      this.cdr.detectChanges();
    }
  }
}