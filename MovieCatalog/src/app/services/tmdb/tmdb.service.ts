import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IDiscoverMovieResponse, IDiscoverPeopleResponse, IDiscoverSeriesResponse, IPersonCombinedCreditResponse } from 'src/app/interfaces/responses';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/interfaces/movie';
import { ISeries } from 'src/app/interfaces/series';
import { ISelectOption } from 'src/app/interfaces/select-option';
import { IPerson, IPersonDetails } from 'src/app/interfaces/people';
import { environment } from 'src/environments/environment';

export const TMDB_SORTING_OPTIONS: ISelectOption[] = [
  {
    label: 'Popularity Descending',
    value: 'popularity.desc'
  },
  {
    label: 'Popularity Ascending',
    value: 'popularity.asc'
  }
];
export const TMDB_GENRE_OPTIONS: ISelectOption[] = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Action',
    value: '28'
  },
  {
    label: 'Adventure',
    value: '12'
  },
  {
    label: 'Animation',
    value: '16'
  }
];

const generateYearsOptions = () => {
  const yearOptions: ISelectOption[] = [{ label: 'All', value: '' }];
  for (let i: number = new Date().getFullYear(); i >= 1900; i--) {
    yearOptions.push({ label: i.toString(), value: i })
  }
  return yearOptions;
};
export const TMDB_YEARS_LIST: ISelectOption[] = generateYearsOptions();

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private API_KEY = 'a65998875e6739b6304a1c0323366801';
  constructor(
    private httpClient: HttpClient
  ) { }

  private buildUrl(endpoint: string, params?: object): string {
    const queryParams = params ? Object.keys(params).map(key => key + '=' + params[key]).join('&') : '';
    return `${environment.tmdb.baseUrl}${endpoint}?api_key=${environment.tmdb.apiKey}&${queryParams}`;
  }

  discoverMovies(params: any): Observable<IDiscoverMovieResponse> {
    return this.httpClient
      .get<IDiscoverMovieResponse>(`${this.buildUrl('/discover/movie', params)}`);
  }
  movies(id: number): Observable<IMovie> {
    return this.httpClient.get<IMovie>(`${this.buildUrl(`/movie/${id}`)}`);
  }
  discoverSeries(params: any): Observable<IDiscoverSeriesResponse> {
    return this.httpClient
      .get<IDiscoverSeriesResponse>(`${this.buildUrl('/discover/tv', params)}`);
  }
  series(id: number): Observable<ISeries> {
    return this.httpClient.get<ISeries>(`${this.buildUrl(`/tv/${id}`)}`);
  }

  popularPeople(): Observable<IDiscoverPeopleResponse> {
    return this.httpClient.get<IDiscoverPeopleResponse>(`${this.buildUrl('/person/popular')}`);
  }
  person(id: number): Observable<IPersonDetails> {
    return this.httpClient.get<IPersonDetails>(`${this.buildUrl(`/person/${id}`)}`);
  }

  personCombinedCredits(id: number): Observable<IPersonCombinedCreditResponse> {
    return this.httpClient.get<IPersonCombinedCreditResponse>(`${this.buildUrl(`/person/${id}/combined_credits`)}`);
  }
}
