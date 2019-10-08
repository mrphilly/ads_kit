import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
/* import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatChipsModule, MatCardModule, MatExpansionModule, MatListModule, MatMenuModule, MatPaginatorModule, MatPaginatorIntl, MatToolbarModule, MatSidenavModule, MatGridListModule, MatStepperModule, MatSelectModule, MAT_LABEL_GLOBAL_OPTIONS, MatSnackBarModule, MatProgressBarModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatDatepickerModule, MatDatepickerIntl, MAT_DATE_LOCALE,  MatNativeDateModule, DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MatRadioModule, MatRippleModule} from '@angular/material'; */
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotesService } from './notes.service';

import { HomePageComponent } from './home-page/home-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { SpinnerOverlayComponent } from './spinner-overlay-ui/spinner-overlay.component';
import { SsrPageComponent } from './ssr-page/ssr-page.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdGroupService } from './ad-groupe.service'
import { Ads } from './ads.service'

import { getFrenchPaginatorIntl, getDatePickerIntl } from './MatPaginatorTranslate'
import { TermsComponent } from './terms/terms.component'
import { APP_DATE_FORMATS, AppDateAdapter } from './datepicker-format'
import { WTimeDialogComponent } from './w-time-dialog/w-time-dialog.component'
import { WClockComponent } from './w-clock/w-clock.component'
import { WMatTimePickerComponent } from './w-mat-timepicker/w-mat-timepicker.component'
import { WTimeComponent } from './w-time/w-time.component'
import { NotesModule} from "../notes/notes.module"

import {SharedModulesModule} from '../shared-modules/shared-modules.module' 
import { MccScrollspyService } from 'material-community-components'
import {MccScrollspyItemDirective, MccScrollspyGroupDirective} from './scrollspy.directives'

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgbModule, FormsModule, /* MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatTableModule,MatInputModule,MatIconModule,MatChipsModule,MatCardModule,MatExpansionModule, MatListModule,MatMenuModule, MatPaginatorModule,MatToolbarModule, MatSidenavModule, MatGridListModule, MatStepperModule, MatSelectModule,MatSnackBarModule, MatProgressBarModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule ,MatDatepickerModule, MatRadioModule, MatRippleModule,MatNativeDateModule, */ NotesModule, ScrollDispatchModule,SharedModulesModule],
  declarations: [
    UserLoginComponent,
    HomePageComponent,
    MainNavComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent,
    SsrPageComponent,

TermsComponent,
    SpinnerOverlayComponent,
      WMatTimePickerComponent,
    WTimeDialogComponent,
    WClockComponent,
    WTimeComponent,
    MccScrollspyItemDirective,
 MccScrollspyGroupDirective
 



    
   







  ],
  providers: [NotesService, AdGroupService, Ads, MccScrollspyService,/* { provide:MatDatepickerIntl, useValue: getDatePickerIntl()},  {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},  { provide: DateAdapter, useClass: AppDateAdapter }, {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},  {provide: MAT_DATE_LOCALE, useValue: 'fr-fr'} */],
  exports: [
    MainNavComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent,
      WMatTimePickerComponent,
    WTimeDialogComponent,
    WClockComponent,
    WTimeComponent,
  
  

  ],
   entryComponents: [
    WMatTimePickerComponent,
    WTimeDialogComponent,
    WClockComponent,
     WTimeComponent,
    
  ]
  
})
  
export class UiModule {}
