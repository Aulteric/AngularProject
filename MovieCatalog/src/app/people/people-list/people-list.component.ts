import { Component, OnInit } from '@angular/core';
import { IPerson } from 'src/app/interfaces/people';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { IPeopleState } from '../store/people.reducers';
import { Store, select } from '@ngrx/store';
import { selectPeople, selectError } from '../store/people.selectors';
import { Observable } from 'rxjs';
import { loadPeople } from '../store/people.actions';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people$: Observable<IPerson[]>;
  loadError$: Observable<any>;
  searchText: string;

  constructor(
    private tmdbService: TmdbService,
    private store: Store<IPeopleState>
  ) {  }
  ngOnInit(): void {
    this.store.dispatch(loadPeople());

    this.people$ = this.store.pipe(select(selectPeople));
    this.loadError$ = this.store.pipe(select(selectError));
  }

}
