import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState, userStateFeatureKey } from './auth.reducers';

export const selectAuthFeature = createFeatureSelector<IAuthState>(
    userStateFeatureKey
);

export const selectUser = createSelector(
    selectAuthFeature,
    (state: IAuthState) => state.user
);


