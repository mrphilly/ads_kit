import {  BrowserModule, BrowserTransferStateModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule  } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { ColorPickerModule } from 'ngx-color-picker';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { AuthGuard } from './app_core/core/auth.guard';
import { CoreModule } from './app_core/core/core.module';
import { NotesModule } from './app_core/notes/notes.module';
import { UiModule } from './app_core/ui/ui.module';


import { AngularFirestoreModule} from '@angular/fire/firestore';







@NgModule({
  declarations: [
    AppComponent,


  

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
