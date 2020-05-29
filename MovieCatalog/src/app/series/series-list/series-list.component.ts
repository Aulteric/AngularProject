import { Component, OnInit } from '@angular/core';
import { TmdbService, TMDB_SORTING_OPTIONS, TMDB_YEARS_LIST, TMDB_GENRE_OPTIONS } from 'src/app/services/tmdb/tmdb.service';
import { ISeries } from 'src/app/interfaces/series';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Observable } from 'rxjs';
import * as fromSeriesActions from '../store/series.actions';
import { map } from 'rxjs/operators';
import { ISeriesState } from '../store/series.reducers';
import { Store, select } from '@ngrx/store';
import { selectSeries, selectError } from '../store/series.selectors';
import { IFirestoreUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {
  series$: Observable<ISeries[]>;
  loadError$: Observable<any>;
  currentUser: IFirestoreUser;
  filterSetting = {
    sort_by: TMDB_SORTING_OPTIONS[0].value.toString(),
    first_air_date_year: TMDB_YEARS_LIST[0].value.toString(),
    with_genres: TMDB_GENRE_OPTIONS[0].value.toString()
  };

  constructor(
    private tmdbService: TmdbService,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private store: Store<ISeriesState>
  ) { }

  ngOnInit(): void {

    this.updateSeries();

    this.series$ = this.store.pipe(select(selectSeries));
    this.loadError$ = this.store.pipe(select(selectError));

    this.authService.userState.subscribe(user => {
      this.currentUser = user;
    });
  }


  OnGenreChanged(genre: string) {
    this.filterSetting.with_genres = genre;
    this.updateSeries();
  }
  OnYearsChanged(releaseYear: string) {
    this.filterSetting.first_air_date_year = releaseYear;
    this.updateSeries();
  }
  OnSortByChanged(sortOptions: string) {
    this.filterSetting.sort_by = sortOptions;
    this.updateSeries();
  }


  updateSeries(): void {
    this.store.dispatch(fromSeriesActions.loadSeries({ filters: { ...this.filterSetting } }));

    // this.series$ = this.tmdbService.discoverSeries(this.filterSetting).pipe(map(response => {
    //   return response.results;
    //  }));

    //   this.tmdbService.discoverSeries(filterSetting).subscribe(response => {
    //     this.series = response.results;
    // });
  }

  addToWatchlist(show: ISeries) {
    this.dataStorageService.addMediaToWatchlist(show, this.currentUser.uid, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('added successfully to watch list');
      }
    });
  }

  addToFavorite(show: ISeries) {
    this.dataStorageService.addMediaToFavorites(show, this.currentUser.uid, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('added successfully to favorites');
      }
    });
  }
}
