import { createReducer, on } from '@ngrx/store';
import * as fromPeopleActions from './people.actions';
import { IPerson } from 'src/app/interfaces/people';

export const peopleStateFeatureKey = 'peopleState';

export interface IPeopleState {
    people: IPerson[];
    error: any;
    isLoading: boolean;
}

export const initialState: IPeopleState = {
    people: null,
    error: null,
    isLoading: false,
};

export const redusers = createReducer(
    initialState,

    on(fromPeopleActions.loadPeople, (state, action) => {
        return {
            ...state,
            isLoading: true,
        };
    }),

    on(fromPeopleActions.loadPeopleSuccess, (state, action) => {
        return {
            ...state,
            isLoading: false,
            people: action.people
        };
    }),

    on(fromPeopleActions.loadPeopleFailure, (state, action) => {
        return {
            ...state,
            isLoading: false,
            error: action.type
        };
    })
)