import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HibpService } from '../../core/services/hibp.service';
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
  styleUrl: './password-checker.css'
})
export class PasswordCheckerComponent {
  password = '';
  hidePassword = true;
  loading = false;
  result: CheckResult | null = null;

  constructor(
    private hibpService : HibpService,
    private cdr: ChangeDetectorRef
  ) {}

  async checkPassword(): Promise<void> {
    if (!this.password) return;
    this.loading = true;
    this.result = null;
    try {
      this.result = await this.hibpService.checkPassword(this.password);
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
    } finally {
      this.loading = false;
      this.password = '';
      this.cdr.detectChanges();
    }
  }
}