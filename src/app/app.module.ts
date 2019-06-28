import {  BrowserModule, BrowserTransferStateModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/firestore'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularFireFunctionsModule } from '@angular/fire/functions';
/* import { AngularFireModule } from '@angular/fire'; */
import { AppRoutes } from './app.routes';

/* mport { environment } from '../environments/environment'; */

/* import { AngularFireAuthModule } from '@angular/fire/auth'; */


/* import { AuthService } from './auth/auth.service'; */
import { CallbackComponent } from './callback/callback.component';
import { SignupComponent } from './signup/signup.component';
import { EditorComponent } from './editor/editor.component';

import { ColorPickerModule } from 'ngx-color-picker';

import { CampaignComponent } from './campaign/campaign.component';
/* import { CoreModule } from './project/core/core.module'; */
/* import { ServiceWorkerModule } from '@angular/service-worker'; */
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './project/auth/auth.component';
/* import { NotesModule } from './project/notes/notes.module'; */

import { CoreModule } from './app_core/core/core.module';

import { UiModule } from './app_core/ui/ui.module';
import { NotesModule } from './app_core/notes/notes.module';
import { AuthService } from './app_core/core/auth.service'
import { AuthGuard } from './app_core/core/auth.guard';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CallbackComponent,
    SignupComponent,
  

  /*   EditorComponent, */
   /*  CampaignComponent, */
   /*   AuthComponent, */
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    CoreModule,
    UiModule,
    NotesModule,
    AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ColorPickerModule
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
