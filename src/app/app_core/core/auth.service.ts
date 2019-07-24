import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { firebase } from '@firebase/app';

import { Observable, of } from 'rxjs';

import { auth } from 'firebase';

import { switchMap, startWith, tap, filter } from 'rxjs/operators';

import { NotifyService } from './notify.service';

import {map} from 'rxjs/operators'

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  account_value?: any;
}

interface NotificationAccountValue {
  uid: string;
  notification?: any;
}

@Injectable()
export class AuthService {
  user: Observable<User | null>;
  notificationAccount: Observable<NotificationAccountValue | null>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
      // tap(user => localStorage.setItem('user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('user')))
    );

     this.notificationAccount = this.afAuth.authState.pipe(
      switchMap(amount => {
        if (amount) {
          return this.afs.doc<NotificationAccountValue>(`notifications_account_value/${amount.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
      // tap(user => localStorage.setItem('user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('user')))
    );
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome new user!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string):Promise<User[]> {
    var response = []
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome back!', 'success');
        this.updateUserData(credential.user);
        response.push(credential.user)
        
      })
      .catch(error => { this.handleError(error); });
    return Promise.resolve(response)
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}` 
    );
    const notificationRef: AngularFirestoreDocument<User> = this.afs.doc(
      `notifications_account_value/${user.uid}`
    );
    const data_notification: NotificationAccountValue = {
      uid: user.uid,
      notification: "Veuillez définir vos paramètres de facturation en cliquant ici"
    };
    notificationRef.set(data_notification)
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
      account_value: 0
    };
    return userRef.set(data);
  }

  getInfos(user_id: any) {
        return  this.afs.collection('notifications_account_value', (ref) => ref.where('uid', '==', `${user_id}`)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

   
getUser(id: string) {
    return this.afs.doc<any>(`users/${id}`);
  }

   updateUser(id: string, data: any) {
    return this.getUser(id).update(data);
  }

  getNotification(id: string) {
    return this.afs.doc<any>(`notifications_account_value/${id}`);
  }

   updateNotification(id: string, data: any) {
    return this.getNotification(id).update(data);
  }
  public updateValueAccount(uid: any, account_value: any):Promise<any> {
    return new Promise(resolve => {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}` 
    );
    const data: User = {
     uid: uid,
      account_value: account_value
    };
    const notificationRef: AngularFirestoreDocument<User> = this.afs.doc(
      `notifications_account_value/${uid}`
      );
      const data_notification: NotificationAccountValue = {
        uid: uid,
        notification: ""
      };
      userRef.set(data).then(() => {
        notificationRef.set(data_notification).then(() => {
          resolve("ok")
        })
        
      })
    })
  
  }
}
