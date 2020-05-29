import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    const authServiceStub = () => ({
      loginWithEmailAndPassword: (value, function0) => ({}),
      RegisterWithEmailAndPassword: (value, function0) => ({})
    });

    const storeStub = () => ({ dispatch: arg => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AuthComponent],
      providers: [
        { provide: AuthService, useFactory: authServiceStub },
        { provide: Store, useFactory: storeStub }
      ]
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('authChoice defaults to: login', () => {
    expect(component.authChoice).toEqual('login');
  });

  describe('loginWithOauth', () => {
    it('makes expected calls', () => {
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.loginWithOauth();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });

  describe('onSubmitLoginForm', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authServiceStub, 'loginWithEmailAndPassword').and.callThrough();
      component.onSubmitLoginForm();
      expect(authServiceStub.loginWithEmailAndPassword).toHaveBeenCalled();
    });
  });

  describe('onSubmitRegisterForm', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authServiceStub, 'RegisterWithEmailAndPassword').and.callThrough();
      component.onSubmitRegisterForm();
      expect(authServiceStub.RegisterWithEmailAndPassword).toHaveBeenCalled();
    });
  });
});
