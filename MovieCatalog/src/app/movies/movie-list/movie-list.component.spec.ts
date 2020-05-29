import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { MovieListComponent } from './movie-list.component';
describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(() => {
    const dataStorageServiceStub = () => ({});
    const authServiceStub = () => ({ userState: { subscribe: f => f({}) } });
    const storeStub = () => ({ pipe: arg => ({}), dispatch: arg => ({}) });

    TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      providers: [
        { provide: DataStorageService, useFactory: dataStorageServiceStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: Store, useFactory: storeStub }
      ]
    });
    
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(component, 'updateMovies').and.callThrough();
      spyOn(storeStub, 'pipe').and.callThrough();
      component.ngOnInit();
      expect(component.updateMovies).toHaveBeenCalled();
      expect(storeStub.pipe).toHaveBeenCalled();
    });
  });
  
  describe('updateMovies', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.updateMovies();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
});
