import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { ImageFallbackDirective } from './directives/image-fallback/image-fallback.directive';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { FiltersComponent } from './filters/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FilterPipe,
    ImageFallbackDirective,
    DropdownDirective,
    FiltersComponent
  ],
  exports: [
    FilterPipe,
    FiltersComponent,
    ImageFallbackDirective,
    DropdownDirective,
    FontAwesomeModule,
    AlertModule,
    ButtonsModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    FontAwesomeModule,
  ]
})
export class SharedModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
