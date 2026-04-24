import { Component, signal } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header';
import { PasswordCheckerComponent } from './features/password-checker/password-checker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PasswordCheckerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}
