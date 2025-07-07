// src/app/components/room-list/room-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomPopupComponent } from '../room-popup/room-popup.component';
import { RoomDetailPopupComponent } from '../room-detail-popup/room-detail-popup.component';
import { BookingService } from '../../services/booking.service';
import { RoomFilterPipe } from '../../pipes/room-filter.pipe';
import { Room } from '../../models/room.model';
import { SearchService } from '../../services/search.service';

const ROOMS_STORAGE_KEY = 'rooms-state';
@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    FormsModule,
    RoomPopupComponent,
    RoomDetailPopupComponent,
    RoomFilterPipe
  ],
  templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit {
  searchTerm: string = '';
  rooms: Room[] = [
    {
      name: 'Room A',
      imageUrl: 'https://cinemathequeafricaine.org/wp-content/uploads/2022/12/salle-projection-01.png',
      location: '1st Floor',
      capacity: 20,
      equipment: ['Projector'],
      status: 'Available',
      creneaux: ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00']
    },
    {
      name: 'Room B',
      imageUrl: 'https://www.cinematheque.ch/sites/default/files/2022-07/casino_de_montbenon-salle_de_projection-13.09.2012-3.jpg',
      location: '2nd Floor',
      capacity: 15,
      equipment: ['TV'],
      status: 'Occupied',
      creneaux: []
    },
    {
      name: 'Room C',
      imageUrl: 'https://img.freepik.com/premium-photo/projector-screen-wall-ready-presentation-modern-meeting-room-created-with-generative-ai_124507-168572.jpg?w=2000',
      location: 'Ground floor',
      capacity: 25,
      equipment: ['WhiteBoard', 'Camera'],
      status: 'Maintenance',
      creneaux: []
    },
    {
      name: 'Room D',
      imageUrl: 'https://fairspace.fr/wp-content/uploads/2023/06/salle-de-reunion-design-et-sobre.jpg',
      location: '3st Floor',
      capacity: 10,
      equipment: ['Conférence audio', 'TV'],
      status: 'Available',
      creneaux: ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00']
    },
    {
    name: 'Room E',
    imageUrl: 'https://fairspace.fr/wp-content/uploads/2023/06/salle-de-reunion-design-et-sobre.jpg',
    location: '1st Floor',
    capacity: 8,
    equipment: ['Projector', 'WhiteBoard'],
    status: 'Available',
    creneaux: ['08:00 - 09:00', '09:00 - 10:00', '11:00 - 12:00']
  },
  {
    name: 'Room F',
    imageUrl: 'https://cinemathequeafricaine.org/wp-content/uploads/2022/12/salle-projection-01.png',
    location: '2nd Floor',
    capacity: 12,
    equipment: ['TV', 'Videoconference', 'Air Conditioning'],
    status: 'Reserved',
    creneaux: ['14:00 - 15:00', '15:00 - 16:00']
  }
  ];

  selectedRoom: Room | null = null;
  selectedDate: string = '';
  selectedTimeslot: string[] = [];
  showDetailPopup = false;
  showReservationPopup = false;

  constructor(
    private bookingService: BookingService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem(ROOMS_STORAGE_KEY);
    if (stored) {
      this.rooms = JSON.parse(stored);
    }

    this.searchService.searchTerm$.subscribe(term => (this.searchTerm = term));

    window.addEventListener('storage', (e) => {
    if (e.key === ROOMS_STORAGE_KEY) {
      this.rooms = e.newValue ? JSON.parse(e.newValue) : this.rooms;
    }
  });
  }

  closePopup() {
    this.selectedRoom = null;
    this.selectedTimeslot = [];
    this.showReservationPopup = false;
  }

  cancelBooking() {
    this.closePopup();
  }

  private saveRoomsToStorage() {
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(this.rooms));
  }

openPopup(room: Room) {
  if (room.status === 'Maintenance' || room.creneaux.length === 0) {
    return;                             
  }
  this.selectedRoom = room;
  this.selectedTimeslot = [];
  this.showReservationPopup = true;
}

confirmBooking() {
  if (!this.selectedRoom || this.selectedTimeslot.length === 0) {
    return;
  }
  this.reserverSalle(this.selectedRoom, this.selectedTimeslot);
  this.closePopup();
}

reserverSalle(room: Room, creneauxChoisis: string[]) {
    room.creneaux = room.creneaux.filter(
      cr => !creneauxChoisis.includes(cr)
    );

    room.status = room.creneaux.length === 0 ? 'Occupied' : 'Reserved';

    this.bookingService.addReservation({
      roomName: room.name,
      imageUrl: room.imageUrl,
      date: this.selectedDate,
      creneaux: [...creneauxChoisis],
      status: 'Reserved',
    });

    this.saveRoomsToStorage();
  }

  openDetailPopup(room: Room) {
    this.selectedRoom = room;
    this.showDetailPopup = true;
  }

  closeDetailPopup() {
    this.showDetailPopup = false;
    this.selectedRoom = null;
  }
}
