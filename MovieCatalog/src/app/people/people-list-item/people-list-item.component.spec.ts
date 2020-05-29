import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PeopleListItemComponent } from './people-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PERSON } from 'src/data/people';

describe('PeopleListItemComponent', () => {
  let component: PeopleListItemComponent;
  let fixture: ComponentFixture<PeopleListItemComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PeopleListItemComponent],
      providers: [{ provide: Router, useFactory: routerStub }]
    });

    fixture = TestBed.createComponent(PeopleListItemComponent);
    component = fixture.componentInstance;
    component.person = {...PERSON};
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
