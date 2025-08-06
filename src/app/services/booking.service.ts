import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}

export interface BookingDetails {
  name: string;
  email: string;
  subject: string;
  timeSlot: TimeSlot;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private availableSlots = new BehaviorSubject<TimeSlot[]>([]);
  private selectedSlot = new BehaviorSubject<TimeSlot | null>(null);

  // Simulate available time slots (replace with actual Google Calendar integration)
  generateTimeSlots(date: Date): void {
    const slots: TimeSlot[] = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    const slotDuration = 60; // 60 minutes per slot
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    // Don't allow past dates
    if (selectedDate < today) {
      this.availableSlots.next([]);
      return;
    }

    // Don't allow weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      this.availableSlots.next([]);
      return;
    }

    const currentHour = today.getTime() === selectedDate.getTime() ? new Date().getHours() : 0;

    for (let hour = startHour; hour < endHour; hour++) {
      // Skip past hours for today
      if (today.getTime() === selectedDate.getTime() && hour <= currentHour) {
        continue;
      }

      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotStart.getMinutes() + slotDuration);

      slots.push({
        start: slotStart,
        end: slotEnd,
        available: Math.random() > 0.3 // Simulate some slots being unavailable
      });
    }

    this.availableSlots.next(slots);
  }

  getAvailableSlots(): Observable<TimeSlot[]> {
    return this.availableSlots.asObservable();
  }

  setSelectedSlot(slot: TimeSlot): void {
    this.selectedSlot.next(slot);
  }

  getSelectedSlot(): Observable<TimeSlot | null> {
    return this.selectedSlot.asObservable();
  }

  // Simulate booking confirmation (replace with actual implementation)
  confirmBooking(details: BookingDetails): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        // Simulate API call
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }
}
