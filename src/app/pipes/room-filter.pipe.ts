// src/app/pipes/room-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

interface Room {
  name: string;
  location: string;
  equipment: string[];
}

@Pipe({
  name: 'roomFilter',
  standalone: true
})
export class RoomFilterPipe implements PipeTransform {
  transform(rooms: Room[], searchTerm: string): Room[] {
    if (!searchTerm) return rooms;

    const lowerTerm = searchTerm.toLowerCase();

    return rooms.filter(room =>
      room.name.toLowerCase().includes(lowerTerm) ||
      room.location.toLowerCase().includes(lowerTerm) ||
      room.equipment.some(eq => eq.toLowerCase().includes(lowerTerm))
    );
  }
}
