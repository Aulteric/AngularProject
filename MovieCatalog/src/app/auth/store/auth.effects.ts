import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import * as fromAuthActions from './auth.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthEffects {

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromAuthActions.getUser),
            switchMap(payload => this.angularFireAuth.authState
                .pipe(
                    map(response => {
                        if (response) {
                            const { displayName, photoURL, uid, email }: firebase.User = response;
                            return fromAuthActions.authenticateSuccess({ user: { uid, email, photoURL, displayName } })
                        } else {
                            return fromAuthActions.getUserFailure();
                        }
                    }), catchError(error => {
                        console.log(error);
                        return of(fromAuthActions.authenticateFailure({ error }))
                    })
                )
            )
        )
    }
    );

    loginWithOauth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.logInWithOauth),
            mergeMap(payload => from(this.authService.loginWithOauth(payload.provider))
                .pipe(
                    map(response => fromAuthActions.getUser()),
                    catchError(error => of(fromAuthActions.authenticateFailure({ error })))
                )
            )
        )
    );

    logOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.logOut),
            mergeMap(payload => 
                from(this.authService.logOut())
                .pipe(
                    map(response => fromAuthActions.logOutSuccess({user: null})),
                    catchError( error => of(fromAuthActions.logOutFailure({error})))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private angularFireAuth: AngularFireAuth,
    ) { }
}
