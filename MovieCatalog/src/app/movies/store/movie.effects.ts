import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import * as fromMovieActions from './movie.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MovieEffects {

    loadMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromMovieActions.loadMovies),
            mergeMap(payload =>
                this.tmdbService.discoverMovies(payload.filters)
                    .pipe(
                        map(response => fromMovieActions.loadMoviesSuccess({ movies: response.results })),
                        catchError(error => of(fromMovieActions.loadMoviesFailure({ error: error.message })))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private tmdbService: TmdbService
    ) { }
}