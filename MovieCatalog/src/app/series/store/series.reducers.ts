import { ISeries } from '../../interfaces/series';
import { createReducer, on } from '@ngrx/store';
import * as fromSeriesActions from './series.actions';

export const seriesStateFeatureKey = 'seriesState';

export interface ISeriesState {
    series: ISeries[];
    error: any;
    isLoading: boolean;
    filters: any;
}

export const initialState: ISeriesState = {
    series: null,
    error: null,
    isLoading: false,
    filters: null
};

export const redusers = createReducer(
    initialState,

    on(fromSeriesActions.loadSeries, (state, action) => {
        return {
            ...state,
            isLoading: true,
            filters: action.filters
        };
    }),

    on(fromSeriesActions.loadSeriesSuccess, (state, action) => {
        return {
            ...state,
            isLoading: false,
            series: action.series
        };
    }),

    on(fromSeriesActions.loadSeriesFailure, (state, action) => {
        return {
            ...state,
            isLoading: false,
            error: action.type
        };
    })
)