import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirmation-container">
      <mat-card class="confirmation-card">
        <mat-card-content>
          <div class="success-icon">
            <mat-icon color="primary" class="check-icon">check_circle</mat-icon>
          </div>
          <h1>Booking Confirmed!</h1>
          <p>
            Your interview slot has been successfully booked. You will receive a calendar invitation
            and confirmation email shortly.
          </p>
          <div class="actions">
            <button mat-raised-button color="primary" routerLink="/">
              Back to Home
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .confirmation-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 2rem;
    }

    .confirmation-card {
      max-width: 500px;
      width: 100%;
      text-align: center;
      padding: 2rem;
    }

    .success-icon {
      margin-bottom: 1.5rem;
    }

    .check-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #4CAF50;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    p {
      color: #34495e;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .actions {
      margin-top: 2rem;
    }

    button {
      min-width: 150px;
      font-size: 1.1rem;
    }
  `]
})
export class BookingConfirmationComponent {}
