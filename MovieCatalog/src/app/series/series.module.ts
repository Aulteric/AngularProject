import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesListItemComponent } from './series-list-item/series-list-item.component';
import { SeriesDetailsComponent } from './series-details/series-details.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SeriesEffects } from './store/series.effects';
import * as fromSeriesState from './store/series.reducers';



@NgModule({
  declarations: [
    SeriesListComponent,
    SeriesListItemComponent,
    SeriesDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromSeriesState.seriesStateFeatureKey, fromSeriesState.redusers),
    EffectsModule.forFeature([SeriesEffects]),
    SeriesRoutingModule
  ]
})
export class SeriesModule { }
