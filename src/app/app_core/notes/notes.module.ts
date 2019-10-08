import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import {MAT_LABEL_GLOBAL_OPTIONS, MatDatepickerIntl, MAT_DATE_LOCALE,  DateAdapter, MAT_DATE_FORMATS} from '@angular/material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { SidebarModule, TreeViewModule  } from '@syncfusion/ej2-angular-navigations';

import { DndModule } from 'ng2-dnd';

import { NgxPicaModule } from 'ngx-pica';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { NouisliderModule } from 'ng2-nouislider';

import { FontPickerConfigInterface } from 'ngx-font-picker';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';

import { ColorPickerModule } from 'ngx-color-picker';

import { NgxFormatFieldModule } from 'ngx-format-field';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { NgxImageCompressService } from 'ngx-image-compress';

import { FusionChartsModule } from 'angular-fusioncharts';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NotesService } from './notes.service';

import { AnnoncesComponent, DialogOverviewExampleDialog } from './annonces/annonces.component';
import { CampaignSettingsComponent } from './campaign-settings/campaign-settings.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { SettingsComponent, DeletePlacementConfirm, StartDateCalendar, EndDateCalendar } from './campaign-settings/settings/settings.component';
import { AdGroupService } from '../notes/ad-groupe.service'
import { Ads } from '../notes/ads.service'
import { SpinnerOverlayComponent } from '../notes/spinner-overlay-notes/spinner-overlay.component'


import { MccColorPickerModule, MccSpeedDialModule } from 'material-community-components'
import { ImageModifedComponent } from "../notes/campaign-settings/image-modified.component"
import { ImageCreateComponent } from "../notes/campaign-settings/image-create.component"
import { WTimeDialogComponent } from './w-time-dialog/w-time-dialog.component'
import { WClockComponent } from './w-clock/w-clock.component'
import { WMatTimePickerComponent } from './w-mat-timepicker/w-mat-timepicker.component'
import { WTimeComponent } from './w-time/w-time.component'
import { MccScrollspyModule, MccScrollspyService, MccTimerPickerModule } from 'material-community-components'
import {SharedModulesModule} from '../shared-modules/shared-modules.module'
import { getFrenchPaginatorIntl, getDatePickerIntl } from './MatPaginatorTranslate'
 import {APP_DATE_FORMATS, AppDateAdapter} from './datepicker-format'

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Google API Key
  apiKey: 'AIzaSyAN1VolxTqz1jn1Fzr5LdVneCjJ-FC6JT4'
};



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule ,
    HttpClientModule,
    DatePickerModule ,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPicaModule,
    NouisliderModule,
    DndModule.forRoot(),
    NgbModule,
    FontPickerModule,
    LazyLoadImageModule,
    NgxFormatFieldModule,
    FusionChartsModule,
    NgxDropzoneModule,
SharedModulesModule,
    SidebarModule,
    TreeViewModule,
    BrowserAnimationsModule,
   MccScrollspyModule,MccColorPickerModule.forRoot({
      empty_color: 'transparent',
        used_colors: ['#000000', '#FFF555']
    }),
    MccSpeedDialModule,
  
    /* ChartsModule */
 

    
    
  ],
    entryComponents: [
      DialogOverviewExampleDialog,
      ImageModifedComponent,
      ImageCreateComponent,
      StartDateCalendar,
      EndDateCalendar,
         WMatTimePickerComponent,
    WTimeDialogComponent,
    WClockComponent,
      WTimeComponent,
    DeletePlacementConfirm
  ],
  declarations: [NotesListComponent, NoteDetailComponent, CampaignSettingsComponent, AnnoncesComponent, SettingsComponent, CreateCampaignComponent, SpinnerOverlayComponent, DialogOverviewExampleDialog, ImageModifedComponent, ImageCreateComponent, StartDateCalendar,    WMatTimePickerComponent,
    WTimeDialogComponent,
    WClockComponent,
    WTimeComponent, DeletePlacementConfirm, EndDateCalendar],
  providers: [NotesService, AdGroupService, Ads, NgxImageCompressService,MccScrollspyService, { provide:MatDatepickerIntl, useValue: getDatePickerIntl()},  {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},  { provide: DateAdapter, useClass: AppDateAdapter }, {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},  {provide: MAT_DATE_LOCALE, useValue: 'fr-fr'}],/*  ThemeService, { provide: FONT_PICKER_CONFIG,
  providers: [NotesService, AdGroupService, Ads, NgxImageCompressService,MccScrollspyService, /*  ThemeService, { provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG} */
  exports: [CreateCampaignComponent]
})
export class NotesModule { }
