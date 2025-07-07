import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./card.component.html`
})
export class CardComponent {
  @Input() room: any;
  @Output() chooseSlot = new EventEmitter<any>();
  @Output() showDetails = new EventEmitter<any>();

  onChooseSlot() {
    this.chooseSlot.emit(this.room); 
  }

  onCardClick() {
  this.showDetails.emit(this.room); 
}
}
