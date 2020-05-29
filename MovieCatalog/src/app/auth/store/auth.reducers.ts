import { createReducer, on } from '@ngrx/store';
import * as fromAuthActions from './auth.actions';
import { IFirestoreUser } from 'src/app/interfaces/user';

export const userStateFeatureKey = 'userState';

export interface IAuthState {
    user: IFirestoreUser;
    error: any;
    isLoading: boolean;
    filters: any;
}

export const initialState: IAuthState = {
    user: null,
    error: null,
    isLoading: false,
    filters: null
};

export const redusers = createReducer(
    initialState,

    on(fromAuthActions.getUser, (state, action) => {
        return {
            ...state,
            isLoading: true,
        };
    }),

    on(fromAuthActions.authenticateSuccess, (state, action) => {
        return {
            ...state,
            isLoading: false,
            user: action.user
        };
    }),

    on(fromAuthActions.getUserFailure, (state, action) => {
        return {
            ...state,
            isLoading: false,
            error: action.type
        };
    }),

    on(fromAuthActions.logOutSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        };
    }),

    on(fromAuthActions.logOutFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    })
)