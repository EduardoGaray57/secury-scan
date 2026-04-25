import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header';
import { PasswordCheckerComponent } from './features/password-checker/password-checker';
import { HistoryComponent } from './features/history/history';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PasswordCheckerComponent, HistoryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}
