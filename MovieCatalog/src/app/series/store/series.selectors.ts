import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISeriesState, seriesStateFeatureKey } from './series.reducers';

export const selectSeriesFeature = createFeatureSelector<ISeriesState>(
    seriesStateFeatureKey
);

export const selectSeries = createSelector(
    selectSeriesFeature,
    (state: ISeriesState) => state.series
);

export const selectError = createSelector(
    selectSeriesFeature,
    (state: ISeriesState) => state.error
);

export const selectFilters = createSelector(
    selectSeriesFeature,
    (state: ISeriesState) => state.filters
)