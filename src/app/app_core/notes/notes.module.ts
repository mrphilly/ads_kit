import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

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


import { ColorPickerModule } from 'ngx-color-picker';
import { AnnonceServiceComponentComponent } from './annonces/annonce-service-component/annonce-service-component.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule ,
    HttpClientModule,
    DatePickerModule ,
     NgMultiSelectDropDownModule.forRoot()
    
  ],
  declarations: [NotesListComponent, NoteDetailComponent, CampaignSettingsComponent, AnnoncesComponent, SettingsComponent, CreateCampaignComponent, SpinnerComponent, SpinnerOverlayComponent, AnnonceServiceComponentComponent],
  providers: [NotesService, AdGroupService, Ads]
})
export class NotesModule { }
