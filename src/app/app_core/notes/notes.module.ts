import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

import { NgxPicaModule } from 'ngx-pica';

import { ColorPickerModule } from 'ngx-color-picker';

import {NgxImageCompressService} from 'ngx-image-compress';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NotesService } from './notes.service';

import { AnnoncesComponent } from './annonces/annonces.component';
import { CampaignSettingsComponent } from './campaign-settings/campaign-settings.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SettingsComponent } from './campaign-settings/settings/settings.component';
import { AdGroupService } from './ad-groupe.service'

import { Ads } from './ads.service'

import { AnnonceServiceComponentComponent } from '../notes/annonces/annonce-service-component/annonce-service-component.component'




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule ,
    HttpClientModule,
    DatePickerModule ,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPicaModule,

    
    
  ],
  declarations: [NotesListComponent, NoteDetailComponent, CampaignSettingsComponent, AnnoncesComponent, SettingsComponent, CreateCampaignComponent, SpinnerComponent, SpinnerOverlayComponent, AnnonceServiceComponentComponent],
  providers: [NotesService, AdGroupService, Ads, NgxImageCompressService]
})
export class NotesModule { }
