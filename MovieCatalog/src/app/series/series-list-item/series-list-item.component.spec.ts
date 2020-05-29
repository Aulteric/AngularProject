import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SeriesListItemComponent } from './series-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SERIES } from 'src/data/series';

describe('SeriesListItemComponent', () => {
  let component: SeriesListItemComponent;
  let fixture: ComponentFixture<SeriesListItemComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SeriesListItemComponent],
      providers: [{ provide: Router, useFactory: routerStub }]
    });

    fixture = TestBed.createComponent(SeriesListItemComponent);
    component = fixture.componentInstance;
    component.show = {...SERIES};
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
