import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { PersonDetailsComponent } from './person-details.component';

describe('PersonDetailsComponent', () => {
  let component: PersonDetailsComponent;
  let fixture: ComponentFixture<PersonDetailsComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ snapshot: { params: { id: {} } } });
    const routerStub = () => ({ navigate: array => ({}) });
    const tmdbServiceStub = () => ({
      person: routerParameterId => ({ pipe: () => ({}) }),
      personCombinedCredits: routerParameterId => ({ subscribe: f => f({}) })
    });

    TestBed.configureTestingModule({
      declarations: [PersonDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: TmdbService, useFactory: tmdbServiceStub }
      ]
    });

    fixture = TestBed.createComponent(PersonDetailsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const tmdbServiceStub: TmdbService = fixture.debugElement.injector.get(
        TmdbService
      );
      spyOn(tmdbServiceStub, 'person').and.callThrough();
      spyOn(tmdbServiceStub, 'personCombinedCredits').and.callThrough();
      component.ngOnInit();
      expect(tmdbServiceStub.person).toHaveBeenCalled();
      expect(tmdbServiceStub.personCombinedCredits).toHaveBeenCalled();
    });
  });
});
