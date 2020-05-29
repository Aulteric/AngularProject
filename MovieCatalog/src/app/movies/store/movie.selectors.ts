import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMoviesState, movieStateFeatureKey } from './movie.reducers';

export const selectMoviesFeature = createFeatureSelector<IMoviesState>(
    movieStateFeatureKey
);

export const selectMovies = createSelector(
    selectMoviesFeature,
    (state: IMoviesState) => state.movies
);

export const selectError = createSelector(
    selectMoviesFeature,
    (state: IMoviesState) => state.error
);

export const selectFilters = createSelector(
    selectMoviesFeature,
    (state: IMoviesState) => state.filters
)