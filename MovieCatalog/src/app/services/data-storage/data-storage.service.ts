import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IMovie } from 'src/app/interfaces/movie';
import { ISeries } from 'src/app/interfaces/series';
import { IFirestoreMedia } from 'src/app/interfaces/firestore';
import { isMovie } from 'src/app/interfaces/people';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
  ) { }

  addMediaToWatchlist(media: IMovie | ISeries, userId: string, callback: (error?: string) => void): void {
    const mediaDetails: IFirestoreMedia = {
      id: media.id,
      createdAt: new Date(),
      title: isMovie(media) ? media.title : media.original_name,
      poster_path: media.poster_path,
      isWatched: false,
      mediaType: isMovie(media) ? 'movie' : 'series'
    };

    this.angularFirestore.doc(`Lists/${userId}`)
      .collection<IFirestoreMedia[]>('watchlist')
      .doc<IFirestoreMedia>(`${media.id}`).set(mediaDetails)
      .then(success => callback()).catch(er => callback(er));
  }

  addMediaToFavorites(media: IMovie | ISeries, userId: string, callback: (error?: string) => void): void {
    const mediaDetails: IFirestoreMedia = {
      id: media.id,
      createdAt: new Date(),
      title: isMovie(media) ? media.title : media.original_name,
      poster_path: media.poster_path,
      isWatched: false,
      mediaType: isMovie(media) ? 'movie' : 'series'
    };

    this.angularFirestore.doc(`Lists/${userId}`)
      .collection<IFirestoreMedia[]>('favorites')
      .doc<IFirestoreMedia>(`${media.id}`).set(mediaDetails)
      .then(success => callback()).catch(er => callback(er));
  }
}

