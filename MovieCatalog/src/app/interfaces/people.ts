import { IMovie } from './movie';
import { ISeries } from './series';

export interface IPerson {
    profile_path: string;
    adult: boolean;
    id: number;
    known_for: Array<IMovie | ISeries>;
    name: string;
    popularity: number;
}

export const isMovie = (media: ISeries | IMovie): media is IMovie =>{
    return (media as IMovie).title !== undefined;
}

export interface IPersonDetails extends IPerson{
    biography: string;
    place_of_birth: string | null;
    birthday: string | null;
    deathday: string | null;
    known_for_department: string;
    gender: number;
    also_known_as: string[];
}

export interface IPersonCredits{
    id: number;
    department: string;
    original_language: string;
    original_title: string;
    job: string;
    overview: string;
    vote_count: 3;
    video: boolean;
    media_type: string;
    poster_path: string | null;
    backdrop_path: string | null;
    title: string;
    popularity: number;
    genre_ids: number[];
    vote_average: number;
    adult: false;
    release_date: string;
    credit_id: string;
}
