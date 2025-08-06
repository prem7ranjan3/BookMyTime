import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { BookingService, TimeSlot, BookingDetails } from '../../services/booking.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <div class="calendar-container">
      <mat-card class="booking-card">
        <mat-card-content>
          <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
            <div class="form-fields">
              <mat-form-field appearance="outline" floatLabel="always">
                <mat-label>Your Name</mat-label>
                <input matInput formControlName="name" required placeholder="Enter your full name">
                <mat-error *ngIf="bookingForm.get('name')?.hasError('required') && bookingForm.get('name')?.touched">
                  Name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" floatLabel="always">
                <mat-label>Email Address</mat-label>
                <input matInput type="email" formControlName="email" required placeholder="Enter your email address">
                <mat-error *ngIf="bookingForm.get('email')?.hasError('required') && bookingForm.get('email')?.touched">
                  Email is required
                </mat-error>
                <mat-error *ngIf="bookingForm.get('email')?.hasError('email') && bookingForm.get('email')?.touched">
                  Please enter a valid email address
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" floatLabel="always">
                <mat-label>Interview Subject</mat-label>
                <input matInput formControlName="subject" required placeholder="Enter interview subject">
                <mat-error *ngIf="bookingForm.get('subject')?.hasError('required') && bookingForm.get('subject')?.touched">
                  Subject is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" floatLabel="always">
                <mat-label>Select Date</mat-label>
                <input matInput [matDatepicker]="picker" 
                       [min]="minDate"
                       [matDatepickerFilter]="dateFilter"
                       (dateChange)="onDateSelected($event)" 
                       formControlName="date" 
                       required
                       placeholder="MM/DD/YYYY"
                       readonly>
                <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="bookingForm.get('date')?.hasError('required') && bookingForm.get('date')?.touched">
                  Date is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" floatLabel="always">
                <mat-label>Select Time Slot</mat-label>
                <mat-select formControlName="timeSlot" required>
                  <mat-option *ngFor="let slot of availableSlots$ | async" [value]="slot" [disabled]="!slot.available">
                    {{ slot.start | date:'shortTime' }} - {{ slot.end | date:'shortTime' }}
                    {{ !slot.available ? '(Not Available)' : '' }}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="bookingForm.get('timeSlot')?.hasError('required') && bookingForm.get('timeSlot')?.touched">
                  Time slot is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="!bookingForm.valid">
                Book Appointment
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .calendar-container {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .booking-card {
      width: 100%;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    mat-card-content {
      padding: 24px !important;
    }

    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .mat-mdc-form-field {
      width: 100%;
    }

    .mat-mdc-form-field-wrapper {
      padding-bottom: 0;
    }

    ::ng-deep {
      .mat-mdc-form-field {
        display: inline-flex;
        flex-direction: column;
        min-width: 0;
        text-align: left;
      }

      .mat-mdc-text-field-wrapper {
        background-color: white;
      }

      .mdc-text-field--outlined {
        --mdc-outlined-text-field-container-height: 56px;
      }

      .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
        padding-right: 0;
      }

      .mat-mdc-form-field-subscript-wrapper {
        height: 0;
      }

      .mat-mdc-form-field-error-wrapper {
        padding: 0;
        position: absolute;
        top: 100%;
      }

      .mat-mdc-select-trigger {
        height: 56px;
        padding: 0 12px;
        display: flex;
        align-items: center;
      }

      .mat-mdc-select-value {
        display: flex;
        align-items: center;
        padding: 0;
      }

      .mat-mdc-select-arrow-wrapper {
        transform: translateY(0);
      }

      .mat-mdc-select-panel {
        background: white;
        border-radius: 4px;
        margin-top: 4px;
        min-width: calc(100% + 32px);
        transform-origin: top center;
        position: relative;
      }

      .mat-mdc-option {
        min-height: 48px;
      }
    }

    .form-actions {
      margin-top: 32px;
      display: flex;
      justify-content: center;
    }

    button[type="submit"] {
      min-width: 200px;
      height: 48px;
      font-size: 16px;
      border-radius: 24px;
    }
  `]
})
export class CalendarComponent implements OnInit {
  bookingForm: FormGroup;
  availableSlots$: Observable<TimeSlot[]>;
  minDate = new Date();

  // Filter out weekends
  dateFilter: (date: Date | null) => boolean = (date: Date | null): boolean => {
    if (!date) return false;
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.availableSlots$ = this.bookingService.getAvailableSlots();
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required]
    });
  }

  ngOnInit() {
    const today = new Date();
    this.bookingService.generateTimeSlots(today);
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.bookingService.generateTimeSlots(event.value);
    }
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;
      const bookingDetails: BookingDetails = {
        name: formValue.name,
        email: formValue.email,
        subject: formValue.subject,
        timeSlot: formValue.timeSlot
      };

      this.bookingService.confirmBooking(bookingDetails).subscribe(success => {
        if (success) {
          this.router.navigate(['/confirmation']);
        }
      });
    }
  }
}
