import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { SeriesDetailsComponent } from './series-details.component';
describe('SeriesDetailsComponent', () => {
  let component: SeriesDetailsComponent;
  let fixture: ComponentFixture<SeriesDetailsComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ snapshot: { params: { id: {} } } });
    const tmdbServiceStub = () => ({ series: routerParameterId => ({}) });

    TestBed.configureTestingModule({
      declarations: [SeriesDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: TmdbService, useFactory: tmdbServiceStub }
      ]
    });

    fixture = TestBed.createComponent(SeriesDetailsComponent);
    component = fixture.componentInstance;
  });
  
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
