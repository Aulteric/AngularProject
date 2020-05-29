import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie';
import { MOVIES } from 'src/data/movies';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie$: Observable<IMovie>;
  routerParameterId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tmdbService: TmdbService
  ) {
    this.routerParameterId = activatedRoute.snapshot.params.id;
    this.movie$ = this.tmdbService.movies(this.routerParameterId);
   }

  ngOnInit(): void {
  }

}
