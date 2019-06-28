import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router'
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 email: string;
  password: string;
  constructor(public auth: AuthService, private router: Router) {
  
   }

  ngOnInit() {
   this.handleAuth()
    
    this.loadImg()
  }

  loadImg() {
     $("body").css("background-image", "url('https://utemplates.net/wp-content/uploads/2016/10/utemplates_free-material-design-background-for-you.jpg')")
  }

  login() {
    this.auth.login(this.email, this.password);
    this.email = this.password = '';    
  }

  logout() {
    this.auth.logout();
  }
  async handleAuth() {
   const user = await this.auth.isLoggedIn()
   if (user) {
     this.router.navigate(['/'])
   } else {
        this.router.navigate(['/'])
  }
}
}
