import { createFeatureSelector, createSelector } from '@ngrx/store';
import { peopleStateFeatureKey, IPeopleState } from './people.reducers';

export const selectPeopleFeature = createFeatureSelector<IPeopleState>(
    peopleStateFeatureKey
);

export const selectPeople = createSelector(
    selectPeopleFeature,
    (state: IPeopleState) => state.people
);

export const selectError = createSelector(
    selectPeopleFeature,
    (state: IPeopleState) => state.error
);
