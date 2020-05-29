import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISeries } from 'src/app/interfaces/series';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series-list-item',
  templateUrl: './series-list-item.component.html',
  styleUrls: ['./series-list-item.component.scss']
})
export class SeriesListItemComponent implements OnInit {

  @Input() show: ISeries;
  @Output() addedToWatchlist: EventEmitter<ISeries> = new EventEmitter<ISeries>();
  @Output() addedToFavorite: EventEmitter<ISeries> = new EventEmitter<ISeries>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect(): void {
    this.router.navigate(['/tv-series', this.show.id]);
  }

  addToWatchlist(): void {
    this.addedToWatchlist.emit(this.show);
  }
  addToFavorite(): void {
    this.addedToFavorite.emit(this.show);
  }
}
