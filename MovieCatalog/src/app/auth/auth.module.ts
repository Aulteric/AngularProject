import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAuthState from './store/auth.reducers';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuthState.userStateFeatureKey, fromAuthState.redusers),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule,

  ]
})
export class AuthModule { }
