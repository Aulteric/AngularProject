import { createAction, props } from '@ngrx/store';
import { ISeries } from 'src/app/interfaces/series';
import { ISeriesFilters } from 'src/app/interfaces/filters';

export const loadSeries = createAction(
    '[Series List Component] Load Series',
    props<{filters: ISeriesFilters}>()
);

export const loadSeriesSuccess = createAction(
    '[Series List Component] Load Series Success',
    props<{series: ISeries[]}>()
);

export const loadSeriesFailure = createAction(
    '[Series List Component] Load Series Failure',
    props<{error: any}>()
);
