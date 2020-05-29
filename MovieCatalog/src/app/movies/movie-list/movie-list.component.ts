import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie';
import { TmdbService, TMDB_SORTING_OPTIONS, TMDB_YEARS_LIST, TMDB_GENRE_OPTIONS } from 'src/app/services/tmdb/tmdb.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IMoviesState } from 'src/app/movies/store/movie.reducers';
import { Store, select } from '@ngrx/store';
import * as fromMovieActions from '../store/movie.actions';
import { Observable } from 'rxjs';
import { selectMovies, selectError } from 'src/app/movies/store/movie.selectors';
import { IMovieFilters } from 'src/app/interfaces/filters';
import { IFirestoreUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies$: Observable<IMovie[]>;
  loadError$: Observable<string>;
  currentUser: IFirestoreUser;
  filterSetting: IMovieFilters = {
    sort_by: TMDB_SORTING_OPTIONS[0].value.toString(),
    primary_release_year: TMDB_YEARS_LIST[0].value.toString(),
    with_genres: TMDB_GENRE_OPTIONS[0].value.toString()
  };

  constructor(
    // private tmdbService: TmdbService,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private store: Store<IMoviesState>
  ) { }
  ngOnInit(): void {

    this.updateMovies();

    // this.tmdbService.discoverMovies(this.filterSetting).subscribe(response => {
    //   this.store.dispatch(fromMovieActions.loadMoviesSuccess({ movies: response.results }));
    // });

    this.movies$ = this.store.pipe(select(selectMovies));
    this.loadError$ = this.store.pipe(select(selectError));

    this.authService.userState.subscribe(user => {
      this.currentUser = user;
    });
  }

  OnGenreChanged(genre: string): void {
    this.filterSetting.with_genres = genre;
    // this.filterSetting = {
    //   ...this.filterSetting,
    //   with_genres: genre
    // };
    this.updateMovies();
  }
  OnYearsChanged(releaseYear: string): void {
    this.filterSetting.primary_release_year = releaseYear;
    // this.filterSetting = {
    //   ...this.filterSetting,
    //   primary_release_year: releaseYear
    // };
    this.updateMovies();
  }
  OnSortByChanged(sortOptions: string): void {
    this.filterSetting.sort_by = sortOptions;
    // this.filterSetting = {
    //   ...this.filterSetting,
    //   sort_by: sortOptions
    // };
    this.updateMovies();
  }


  updateMovies(): void {
    this.store.dispatch(fromMovieActions.loadMovies({ filters: { ...this.filterSetting } }));
  }

  addToWatchlist(movie: IMovie): void {
    this.dataStorageService.addMediaToWatchlist(movie, this.currentUser.uid, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('added successfully to watch list');
      }
    });
  }

  addToFavorite(movie: IMovie): void {
    this.dataStorageService.addMediaToFavorites(movie, this.currentUser.uid, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('added successfully to favorites');
      }
    });
  }
}
