import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromPeopleState from './store/people.reducers';
import { PeopleRoutingModule } from './people-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PeopleEffects } from './store/people.effects';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleListItemComponent } from './people-list-item/people-list-item.component';
import { PersonDetailsComponent } from './person-details/person-details.component';


@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleListItemComponent,
    PersonDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromPeopleState.peopleStateFeatureKey, fromPeopleState.redusers),
    EffectsModule.forFeature([PeopleEffects]),
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
