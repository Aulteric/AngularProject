import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import * as fromPeopleActions from './people.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PeopleEffects {

    loadMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPeopleActions.loadPeople),
            mergeMap(payload =>
                this.tmdbService.popularPeople()
                    .pipe(
                        map(response => fromPeopleActions.loadPeopleSuccess({ people: response.results })),
                        catchError(error => of(fromPeopleActions.loadPeopleFailure({ error: error.message })))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private tmdbService: TmdbService
    ) { }
}