import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { HistoryService } from '../../core/services/history.service';
import { HistoryEntry } from '../../core/models/check-result.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class HistoryComponent implements OnInit {
  history: HistoryEntry[] = [];
  private subscription!: Subscription;

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.history = this.historyService.getHistory().slice(0, 5);
    this.subscription = this.historyService.historyUpdated$.subscribe(() => {
      this.history = this.historyService.getHistory().slice(0, 5);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearHistory(): void {
    this.historyService.clearHistory();
    this.history = [];
  }
}