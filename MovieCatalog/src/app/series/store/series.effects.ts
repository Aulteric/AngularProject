import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import * as fromSeriesActions from './series.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SeriesEffects {

    loadSeries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSeriesActions.loadSeries),
            mergeMap(payload =>
                this.tmdbService.discoverSeries(payload.filters)
                    .pipe(
                        map(response => fromSeriesActions.loadSeriesSuccess({ series: response.results })),
                        catchError(error => of(fromSeriesActions.loadSeriesFailure({ error: error.message })))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private tmdbService: TmdbService
    ) { }
}