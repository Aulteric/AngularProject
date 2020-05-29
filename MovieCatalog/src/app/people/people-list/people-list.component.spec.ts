import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { PeopleListComponent } from './people-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;

  beforeEach(() => {
    const tmdbServiceStub = () => ({});
    const storeStub = () => ({ dispatch: arg => ({}), pipe: arg => ({}) });

    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [PeopleListComponent],
      providers: [
        { provide: TmdbService, useFactory: tmdbServiceStub },
        { provide: Store, useFactory: storeStub }
      ]
    });

    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      spyOn(storeStub, 'pipe').and.callThrough();
      component.ngOnInit();
      expect(storeStub.dispatch).toHaveBeenCalled();
      expect(storeStub.pipe).toHaveBeenCalled();
    });
  });
});
