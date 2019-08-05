import { AngularFireModule  } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {  BrowserModule, BrowserTransferStateModule  } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as firebase from 'firebase';

import { ColorPickerModule } from 'ngx-color-picker';

import { NgxFormatFieldModule } from 'ngx-format-field';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { AuthGuard } from './app_core/core/auth.guard';
import { CoreModule } from './app_core/core/core.module';
import { NotesModule } from './app_core/notes/notes.module';
import { UiModule } from './app_core/ui/ui.module';

import { AngularFireDatabaseModule } from '@angular/fire/database'






const credentials = {
     apiKey: "AIzaSyC_cYQskL_dKhkt-aQ1ayHt8ia2NQYEHTs",
    authDomain: "comparez.firebaseapp.com",
    databaseURL: "https://comparez.firebaseio.com",
    projectId: "comparez",
    storageBucket: "gs://comparez.appspot.com/",
    messagingSenderId: "975260713071",
  }
  


firebase.initializeApp(credentials)



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    CoreModule,
    UiModule,
    NotesModule,
    AngularFireModule.initializeApp(credentials, 'firestarter'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ColorPickerModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    NgxFormatFieldModule,


   
    
    
  
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
