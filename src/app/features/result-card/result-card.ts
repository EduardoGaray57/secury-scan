import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { CheckResult } from '../../core/models/check-result.model';

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './result-card.html',
  styleUrl: './result-card.css'
})
export class ResultCardComponent {
  @Input() result!: CheckResult;
}