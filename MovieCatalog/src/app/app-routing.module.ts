import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { SeriesListComponent } from './series/series-list/series-list.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { SeriesDetailsComponent } from './series/series-details/series-details.component';
import { PersonDetailsComponent } from './people/person-details/person-details.component';
import { AuthComponent } from './auth/auth/auth.component';
import { MoviesModule } from './movies/movies.module';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule)
  },
  {
    path: 'tv-series',
    loadChildren: () => import('./series/series.module').then(m => m.SeriesModule)
  },
  {
    path: 'people',
    loadChildren: () => import('./people/people.module').then(m => m.PeopleModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
