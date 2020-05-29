import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/auth.reducers';
import * as fromAuthActinos from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authChoice = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginFormError = '';
  registerFormError = '';

  constructor(private authService: AuthService, private store: Store<IAuthState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  loginWithOauth(): void {
    this.store.dispatch(fromAuthActinos.logInWithOauth({provider: 'google'}));
  }

  onSubmitLoginForm(): void {
    this.authService
      .loginWithEmailAndPassword(this.loginForm.value, (error) => {
        if (error) {
          this.loginFormError = error;
        }
      });
  }

  onSubmitRegisterForm(): void {
    this.authService
      .registerWithEmailAndPassword(this.registerForm.value, (error) => {
        if (error) {
          this.registerFormError = error;
        }
      });
  }
}
