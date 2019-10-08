import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatChipsModule, MatCardModule, MatExpansionModule, MatListModule, MatMenuModule, MatPaginatorModule, MatPaginatorIntl, MatToolbarModule, MatSidenavModule, MatGridListModule, MatStepperModule, MatSelectModule, MAT_LABEL_GLOBAL_OPTIONS, MatSnackBarModule, MatProgressBarModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatDatepickerModule, MatDatepickerIntl, MAT_DATE_LOCALE, MatRadioModule} from '@angular/material';
import { UserComponent } from './user/user.component'
import { PageprincipaleComponent } from './pageprincipale/pageprincipale.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { InscriptionConfirmComponent } from './inscription-confirm/inscription-confirm.component';
import { getFrenchPaginatorIntl, getDatePickerIntl } from './MatPaginatorTranslate'
import {MccScrollspyModule, MccScrollspyService, MccTimerPickerModule} from 'material-community-components'
/* import {UiModule} from '../ui/ui.module' */

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatChipsModule, MatCardModule, MatExpansionModule, MatListModule, MatMenuModule, MatPaginatorModule, MatToolbarModule, MatSidenavModule, MatGridListModule, MatStepperModule, MatSelectModule, MatSnackBarModule, MatProgressBarModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatDatepickerModule,
    MatRadioModule,
    MccTimerPickerModule,
     MccScrollspyModule,
    FormsModule,
    ReactiveFormsModule,
     HttpClientModule
   /*  UiModule */
  ],
  declarations: [UserComponent,   
    PageprincipaleComponent,


    UserManagementComponent,


    InscriptionConfirmComponent,],
  exports: [UserComponent,MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatChipsModule, MatCardModule, MatExpansionModule, MatListModule, MatMenuModule, MatPaginatorModule, MatToolbarModule, MatSidenavModule, MatGridListModule, MatStepperModule, MatSelectModule, MatSnackBarModule, MatProgressBarModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatDatepickerModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  MccScrollspyModule],
  entryComponents: [
      
    PageprincipaleComponent,


    UserManagementComponent,


    InscriptionConfirmComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() }, { provide: MatDatepickerIntl, useValue: getDatePickerIntl() }, { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }, { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },],
  
})
export class SharedModulesModule { }
