import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
    email: any
  constructor(public auth: AuthService,
    private router: Router) { 
   
              }

  /// Social Login
  ngOnInit() {
    
    this.auth.user.forEach(value => {
      if (value) {
        this.email = value.email
           
         }
      
    })

  }
  
  async signInWithGithub() {
    await this.auth.githubLogin();
    return await this.afterSignIn();
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  async signInWithFacebook() {
    await this.auth.facebookLogin();
    await this.afterSignIn();
  }

  async signInWithTwitter() {
    await this.auth.twitterLogin();
    return await this.afterSignIn();
  }

  /// Anonymous Sign In

  async signInAnonymously() {
    await this.auth.anonymousLogin();
    return await this.afterSignIn();
  }

  /// Shared

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return this.router.navigate(['/']);
  }

  logout() {
    this.auth.signOut()
  }

  

}
