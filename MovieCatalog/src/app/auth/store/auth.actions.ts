import { createAction, props } from '@ngrx/store';
import { IFirestoreUser } from 'src/app/interfaces/user';

export const getUser = createAction(
    '[Auth Effect] Get User'
);

export const getUserFailure = createAction(
    '[Auth Effect] Get User Failure'
);

export const logInWithOauth = createAction(
    '[Auth Component] Authenticate',
    props<{provider?: string}>()
);

export const authenticateSuccess = createAction(
    '[Auth Effect] Authenticate Success',
    props<{ user: IFirestoreUser}>()
);

export const authenticateFailure = createAction(
    '[Auth Effect] Authenticate Failure',
    props<{error: any}>()
);

export const logOut = createAction(
    '[Auth Effect] Log out'
);

export const logOutSuccess = createAction(
    '[Auth Effect] Log out Success',
    props<{user: IFirestoreUser}>()
);

export const logOutFailure = createAction(
    '[Auth Effect] Log out Failure',
    props<{error: any}>()
);