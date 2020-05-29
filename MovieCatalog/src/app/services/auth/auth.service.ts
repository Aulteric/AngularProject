import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userState: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
    this.angularFireAuth.authState.subscribe(
      user => {
        this.userState.next(user);
      }
    );
  }

  loginWithOauth(providerName: string) {
    return this.angularFireAuth.signInWithPopup(
      this.getProvider(providerName)
    ).then(response => {
      this.updateUserInfo(response.user);
    }).catch(error => {
      console.log(error);
    });
  }

  getProvider(providerName: string) {
    switch (providerName) {
      case 'google':
        return new auth.GoogleAuthProvider();
      case 'facebook':
        return new auth.FacebookAuthProvider();
      case 'twitter':
        return new auth.TwitterAuthProvider();
    }
  }

  logOut() {
    return this.angularFireAuth.signOut();
  }

  loginWithEmailAndPassword(credentials: { email: string, password: string }, callback: (error?) => void) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        this.updateUserInfo(response.user);
        callback();
        console.log(response);
      }).catch(error => {
        callback(error);
      });
  }
  registerWithEmailAndPassword(credentials: { email: string, password: string }, callback: (error?) => void) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        this.updateUserInfo(response.user);
        callback();
        console.log(response);
      }).catch(error => {
        callback(error);
      });
  }

  private getUserById(uid: string) {
    this.angularFirestore.doc(`/Users/${uid}`).valueChanges();
  }

  private updateUserInfo({ uid, displayName, email, photoURL }: firebase.User) {
    this.angularFirestore.doc(`/Users/${uid}`).set({
      uid,
      displayName,
      email,
      photoURL
    }, {merge: true});

  }
}
