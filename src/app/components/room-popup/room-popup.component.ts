import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-popup',
  templateUrl: './room-popup.component.html',
  imports : [CommonModule, FormsModule],
  standalone: true
})
export class RoomPopupComponent {
  @Input() room: any;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() timeslotChange = new EventEmitter<string[]>();

  selectedTimeslots: string[] = [];
  selectedDate: string = ''; 

  onCheckboxChange(event: any, creneau: string) {
  if (event.target.checked) {
    this.selectedTimeslots.push(creneau);
  } else {
    this.selectedTimeslots = this.selectedTimeslots.filter(c => c !== creneau);
  }

  this.timeslotChange.emit(this.selectedTimeslots); 
}

  addToCart() {
    if (this.selectedTimeslots.length === 0) {
      alert('Please choose one time slot.');
      return;
    }

    this.timeslotChange.emit(this.selectedTimeslots); 
    this.confirm.emit();  
  }

  onClose() {
    this.cancel.emit();
  }
}
