import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TMDB_SORTING_OPTIONS } from 'src/app/services/tmdb/tmdb.service';
import { TMDB_GENRE_OPTIONS } from 'src/app/services/tmdb/tmdb.service';
import { TMDB_YEARS_LIST } from 'src/app/services/tmdb/tmdb.service';
import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent]
    });

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('filterSortByOptions defaults to: TMDB_SORTING_OPTIONS', () => {
    expect(component.filterSortByOptions).toEqual(TMDB_SORTING_OPTIONS);
  });
  
  it('filterGenreOptions defaults to: TMDB_GENRE_OPTIONS', () => {
    expect(component.filterGenreOptions).toEqual(TMDB_GENRE_OPTIONS);
  });
  
  it('filterYearOptions defaults to: TMDB_YEARS_LIST', () => {
    expect(component.filterYearOptions).toEqual(TMDB_YEARS_LIST);
  });
});
