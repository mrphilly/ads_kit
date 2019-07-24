import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './app_core/core/auth.guard';
import { NotesListComponent } from './app_core/notes/notes-list/notes-list.component';
import { HomePageComponent } from './app_core/ui/home-page/home-page.component';
import { SsrPageComponent } from './app_core/ui/ssr-page/ssr-page.component';
import { UserLoginComponent } from './app_core/ui/user-login/user-login.component';
import { CampaignSettingsComponent } from './app_core/notes/campaign-settings/campaign-settings.component'
import { AnnoncesComponent } from './app_core/notes/annonces/annonces.component'


const routes: Routes = [
 /*  { path: '', component: HomePageComponent, canActivate: [AuthGuard] }, */
  { path: 'login', component: UserLoginComponent },
/*   { path: 'editor', component: EditorComponent}, */
  { path: '', component: NotesListComponent, canActivate: [AuthGuard] },
  { path: ':money', component: NotesListComponent, canActivate: [AuthGuard] },
   { path: ':idC/:budget/:dailyBudget/:numberOfDays', component: NotesListComponent,  canActivate: [AuthGuard] },
   
 /*  { path: 'uploads',  component: UploadPageComponent,  canActivate: [AuthGuard] }, */
  {path: 'ads/:name/:idC/:idA/:ad_group_id/:campaign_id', component: AnnoncesComponent},
  {path: 'ads/:name/:idC/:idA/:ad_group_id/:campaign_id/:budget/:dailyBudget/:numberOfDays/:id_ad_firebase', component: AnnoncesComponent},
  { path: 'ssr', component: SsrPageComponent },
  { path: 'campaign/:id', component: CampaignSettingsComponent, canActivate: [AuthGuard]}
];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
