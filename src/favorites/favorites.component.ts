import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getFavorites().subscribe({
      next: (res) => this.favorites = res.data || res,
      error: (err) => console.error(err)
    });
  }
}

