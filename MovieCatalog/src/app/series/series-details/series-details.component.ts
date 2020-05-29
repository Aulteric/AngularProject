import { Component, OnInit } from '@angular/core';
import { ISeries } from 'src/app/interfaces/series';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss']
})
export class SeriesDetailsComponent implements OnInit {
  show$: Observable<ISeries>;
  routerParameterId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tmdbService: TmdbService
  ) {
    this.routerParameterId = activatedRoute.snapshot.params.id;
    this.show$ = this.tmdbService.series(this.routerParameterId);
   }

  ngOnInit(): void {
  }

}
