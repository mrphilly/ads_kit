import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import * as $ from 'jquery';


@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
email: string;
  password: string;
 constructor(public auth: AuthService) { }

  ngOnInit() {
  
    this.loadImg()

  }

   signup() {
    this.auth.signup(this.email, this.password);
    this.email = this.password = '';
  }



  logout() {
    this.auth.logout();
  }
  loadImg() {
     $("body").css("background-image", "url('https://utemplates.net/wp-content/uploads/2016/10/utemplates_free-material-design-background-for-you.jpg')")
  }

}
