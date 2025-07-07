import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-detail-popup',
  templateUrl: './room-detail-popup.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class RoomDetailPopupComponent {
  @Input() room: any;
  @Output() close = new EventEmitter<void>();

  addToCart() {
    console.log('Add to cart:', this.room);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
