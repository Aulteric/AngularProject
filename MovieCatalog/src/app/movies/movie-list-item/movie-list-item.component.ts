import { Component, OnInit, Input, Output } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss'],
})

export class MovieListItemComponent{

  @Input() movie: IMovie;
  @Output() addedToWatchlist: EventEmitter<IMovie> = new EventEmitter<IMovie>();
  @Output() addedToFavorite: EventEmitter<IMovie> = new EventEmitter<IMovie>();

  constructor(private router: Router) { }

  redirect(): void {
    this.router.navigate(['/movies', this.movie.id]);
  }

  addToWatchlist(): void {
    this.addedToWatchlist.emit(this.movie);
  }
  addToFavorite(): void {
    this.addedToFavorite.emit(this.movie);
  }
}
