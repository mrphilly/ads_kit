/* import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from './auth0-variables';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  userProfile: any;
  sub: any;
  _accessToken = localStorage.getItem("access_token")
 
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.callbackURL,
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  constructor(private router: Router) {
    
   }


public getProfile(cb): void {
  if (!this._accessToken) {
    throw new Error('Access Token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(this._accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
      this.sub = self.userProfile.sub
    }
    cb(err, profile);
  });
}



  public login(username: string, password: string): void {
    this.auth0.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, authResult) => {
      if (err) {
        console.log(err);
        alert(`Error: ${err.error_description}. Check the console for further details.`);
        return;
      } else if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      }
    });
  }

  public signup(username: string, email: string, password: string): void {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      username,
      password,
      email
    }, (err, authResult) => {
      if (err) {
        console.log(err);
        alert(`Error: ${err.description}. Check the console for further details.`);
        return;
      } else if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
      }
    });
  }

  public loginWithGoogle(): void {
    this.auth0.authorize({
      connection: 'google-oauth2',
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this._accessToken = authResult.accessToken
        console.log('handled')
        this.router.navigate(['/home']);
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      (authResult.expiresIn * 1000) + new Date().getTime()
      );
  
      
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
 
     this.router.navigate(['/home']);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    if (new Date().getTime() > expiresAt) {
      this.logout()
    } else {
    
      this.handleAuthentication()
 
      this.router.navigate(['/home']);
      
      return new Date().getTime() < expiresAt;
    }
  }
   public _isAuthenticated_(): boolean {
    // Check whether the current time is past the
    // access token's expiry time

    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    if (new Date().getTime() > expiresAt) {
      this.logout()
    } else {
 
       this.router.navigate(['/editor']);
      return new Date().getTime() < expiresAt;
    }
  }

}
 */

 import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FirebaseError } from 'firebase/app';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';


export enum AuthProviders {
  Github = 0,
  Twitter = 1,
  Facebook = 2,
  Google = 3,
  Password = 4,
  Anonymous = 5,
  Custom = 6
}

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName: string;
}

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }
  isLoggedIn() {
   return this.firebaseAuth.authState.pipe(first()).toPromise();
  }
  

}