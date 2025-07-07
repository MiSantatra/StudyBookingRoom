import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private storageKey = 'reservations';
  private reservations: any[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    this.reservations = stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.reservations));
  }

  getReservations(): any[] {
    return [...this.reservations]; 
  }

  addReservation(reservation: any): void {
    this.reservations.push(reservation);
    this.saveToStorage();
  }

  removeReservation(index: number): any | null {
  if (index >= 0 && index < this.reservations.length) {
    const [removed] = this.reservations.splice(index, 1); 
    this.saveToStorage();
    return removed;                                      
  }
  return null;
}

  clearReservations(): void {
    this.reservations = [];
    this.saveToStorage();
  }
}
