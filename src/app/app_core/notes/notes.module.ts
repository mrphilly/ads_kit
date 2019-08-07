import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

import { DndModule } from 'ng2-dnd';

import { NgxPicaModule } from 'ngx-pica';

import { NouisliderModule } from 'ng2-nouislider';

import { FontPickerConfigInterface } from 'ngx-font-picker';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';

import { NgxFormatFieldModule } from 'ngx-format-field';

import { ColorPickerModule } from 'ngx-color-picker';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { NgxImageCompressService } from 'ngx-image-compress';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NotesService } from './notes.service';

import { AnnoncesComponent } from './annonces/annonces.component';
import { CampaignSettingsComponent } from './campaign-settings/campaign-settings.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { SettingsComponent } from './campaign-settings/settings/settings.component';
import { AdGroupService } from './ad-groupe.service'

import { Ads } from './ads.service'

import { AnnonceServiceComponentComponent } from '../notes/annonces/annonce-service-component/annonce-service-component.component'


import { SpinnerOverlayComponent } from './spinner-overlay-notes/spinner-overlay.component'

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
    /* ChartsModule */
 

    
    
  ],
  declarations: [NotesListComponent, NoteDetailComponent, CampaignSettingsComponent, AnnoncesComponent, SettingsComponent, CreateCampaignComponent,AnnonceServiceComponentComponent, SpinnerOverlayComponent],
  providers: [NotesService, AdGroupService, Ads, NgxImageCompressService,/*  ThemeService, { provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG} */]
})
export class NotesModule { }
