// src/app/app.component.ts
import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private searchService: SearchService) {}

  updateSearchTerm(term: string) {
    this.searchService.setSearchTerm(term);
  }
}
