import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EditorComponent } from './editor/editor.component';
import {CampaignComponent } from './campaign/campaign.component'
import { CallbackComponent } from './callback/callback.component';
import { AuthComponent } from './project/auth/auth.component';
import { AuthGuard } from './project/core/auth.guard';
import { NgModule } from '@angular/core';
const routes: Routes = [
  /* { path: '', component: HomeComponent }, */
 /*  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'home', component: HomeComponent },
  { path: 'campaign', component: CampaignComponent},
  { path: '**', redirectTo: '' } */
   {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }