import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'confirmation',
    component: BookingConfirmationComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
