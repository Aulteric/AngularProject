import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Store, select } from '@ngrx/store';
import { IAuthState } from './auth/store/auth.reducers';
import * as fromAuthActions from './auth/store/auth.actions';
import { Observable } from 'rxjs';
import { IFirestoreUser } from './interfaces/user';
import { selectUser } from './auth/store/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openMenu: boolean;
  user$: Observable<IFirestoreUser>;

  constructor(
    private store: Store<IAuthState>
  ) {}
  ngOnInit(){
    this.store.dispatch(fromAuthActions.getUser());

    this.user$ = this.store.pipe(select(selectUser));
    this.openMenu = false;
  }

  showMenu(){
    this.openMenu = !this.openMenu;
  }

  logOut(): void {
    this.store.dispatch(fromAuthActions.logOut());
  }
}
