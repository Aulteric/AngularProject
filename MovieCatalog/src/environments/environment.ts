// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tmdb: {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: 'a65998875e6739b6304a1c0323366801'
  },
  firebase: {
    apiKey: "AIzaSyDaPBs05qHeSpG01NLfoTLABaMUc1xN86c",
    authDomain: "mentormateangularproject.firebaseapp.com",
    databaseURL: "https://mentormateangularproject.firebaseio.com",
    projectId: "mentormateangularproject",
    storageBucket: "mentormateangularproject.appspot.com",
    messagingSenderId: "676350770865",
    appId: "1:676350770865:web:02c3d65135a2022d9fec90",
    measurementId: "G-YYWY2VVNZZ"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
