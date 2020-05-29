import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MovieListItemComponent } from './movie-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MOVIES } from 'src/data/movies';

describe('MovieListItemComponent', () => {
  let component: MovieListItemComponent;
  let fixture: ComponentFixture<MovieListItemComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MovieListItemComponent],
      providers: [{ provide: Router, useFactory: routerStub }]
    });

    fixture = TestBed.createComponent(MovieListItemComponent);
    component = fixture.componentInstance;
    component.movie = {...MOVIES.results[0]};
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  
  describe('redirect', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.redirect();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
