import { Routes } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

export const routes: Routes = [
  { path: '', component: RoomListComponent },
  { path: 'summary', component: BookingSummaryComponent },
  { path: 'confirmation', component: ConfirmationComponent },
];
