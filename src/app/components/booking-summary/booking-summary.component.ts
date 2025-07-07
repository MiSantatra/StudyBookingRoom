import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

const ROOMS_STORAGE_KEY = 'rooms-state';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-summary.component.html'
})
export class BookingSummaryComponent implements OnInit {
  reservations: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.reservations = this.bookingService.getReservations();
  }

  private loadRooms(): any[] {
    return JSON.parse(localStorage.getItem(ROOMS_STORAGE_KEY) || '[]');
  }

  private saveRooms(rooms: any[]): void {
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms));
  }

  annulerReservation(index: number): void {
    const removed = this.bookingService.removeReservation(index);
    this.reservations = this.bookingService.getReservations();

    if (!removed) { return; }

    const rooms = this.loadRooms();
    const room = rooms.find((r) => r.name === removed.roomName);
    if (!room) { return; }

    room.creneaux = Array.from(new Set([...room.creneaux, ...removed.creneaux])).sort();

    const stillReserved = this.reservations.some((r) => r.roomName === room.name);

    room.status = stillReserved ? 'Reserved'
               : room.creneaux.length > 0 ? 'Available'
               : 'Occupied';

    this.saveRooms(rooms);

    window.dispatchEvent(
      new StorageEvent('storage', { key: ROOMS_STORAGE_KEY })
    );
  }
}
