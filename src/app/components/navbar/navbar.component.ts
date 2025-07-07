// src/app/components/navbar/navbar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(value: Event) {
    const target = value.target as HTMLInputElement;
    this.search.emit(target.value);
  }
}
