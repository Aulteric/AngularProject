import { IMovie } from './movie';
import { ISeries } from './series';
import { IPerson, IPersonDetails, IPersonCredits } from './people';

export interface IDiscoverMovieResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: IMovie[];
}

export interface IDiscoverSeriesResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: ISeries[];
}

export interface IDiscoverPeopleResponse{
    page: number;
    total_results: number;
    total_pages: number;
    results: IPerson[];
}

export interface IPersonCombinedCreditResponse{
    id: number;
    crew: Array<IPersonCredits>;
    cast: Array<IPersonCredits>;
}