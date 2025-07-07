export interface Room {
  name: string;
  imageUrl: string;
  location: string;
  capacity: number;
  equipment: string[];
  status: 'Available' | 'Reserved' | 'Occupied' | 'Maintenance';
  creneaux: string[];
}
