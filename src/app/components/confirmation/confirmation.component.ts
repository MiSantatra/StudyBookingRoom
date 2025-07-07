import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Réservation Confirmée</h2>
             <p>Merci d'avoir réservé une salle.</p>`
})
export class ConfirmationComponent {}
