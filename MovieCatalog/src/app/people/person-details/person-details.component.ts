import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { IPersonDetails, IPersonCredits } from 'src/app/interfaces/people';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  person$: Observable<IPersonDetails>;
  routerParameterId: number;
  credits: {
    cast: IPersonCredits[],
    crew: IPersonCredits[]
  } = {cast: [], crew: []};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tmdbService: TmdbService
  ) {
    this.routerParameterId = activatedRoute.snapshot.params.id;
  }
  ngOnInit(): void {
    this.person$ = this.tmdbService.person(this.routerParameterId).pipe();
    this.tmdbService.personCombinedCredits(this.routerParameterId)
    .subscribe(response => {
      this.credits = {
        cast: response.cast,
        crew: response.crew
      }
    });
  }

  redirectToMedia(mediaType: string, castId: number): void{
    const route = mediaType === 'movie' ? '/movies' : '/tv-shows';
    this.router.navigate([route, castId]);
  }

}
