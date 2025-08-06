import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" class="header">
      <div class="nav-container">
        <div class="logo">
          <a routerLink="/" class="logo-link">BookMySlot</a>
        </div>
        <nav class="nav-links">
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a mat-button routerLink="/calendar" routerLinkActive="active">Book a Slot</a>
        </nav>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      background-color: #2c3e50;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
    }

    .logo-link {
      color: #ecf0f1;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
    }

    .nav-links a {
      color: #ecf0f1;
      text-decoration: none;
      font-weight: 500;
    }

    .nav-links a.active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class HeaderComponent {}
