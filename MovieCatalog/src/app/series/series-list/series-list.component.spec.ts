import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Store } from '@ngrx/store';
import { SeriesListComponent } from './series-list.component';

describe('SeriesListComponent', () => {
  let component: SeriesListComponent;
  let fixture: ComponentFixture<SeriesListComponent>;

  beforeEach(() => {
    const tmdbServiceStub = () => ({});
    const authServiceStub = () => ({ userState: { subscribe: f => f({}) } });
    const dataStorageServiceStub = () => ({
      addMediaToWatchlist: (show, uid, function0) => ({}),
      addMediaToFavorites: (show, uid, function0) => ({})
    });
    const storeStub = () => ({ pipe: arg => ({}), dispatch: arg => ({}) });

    TestBed.configureTestingModule({
      declarations: [SeriesListComponent],
      providers: [
        { provide: TmdbService, useFactory: tmdbServiceStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: DataStorageService, useFactory: dataStorageServiceStub },
        { provide: Store, useFactory: storeStub }
      ]
    });

    fixture = TestBed.createComponent(SeriesListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(component, 'updateSeries').and.callThrough();
      spyOn(storeStub, 'pipe').and.callThrough();
      component.ngOnInit();
      expect(component.updateSeries).toHaveBeenCalled();
      expect(storeStub.pipe).toHaveBeenCalled();
    });
  });

  describe('updateSeries', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.updateSeries();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
});
