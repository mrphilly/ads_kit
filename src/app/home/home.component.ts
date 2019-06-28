import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './../auth/auth.service';

import * as $ from 'jquery';
import { Observable } from 'rxjs';
@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
    item: Observable<any>;
  constructor(private auth: AuthService, private router: Router) { 


  }

  ngOnInit() {
  this.handleAuth()
    
  }
  async handleAuth() {
   const user = await this.auth.isLoggedIn()
   if (user) {
     this.router.navigate(['/home'])
   } else {
        this.router.navigate(['/'])
  }
}

  
 
 

  sendUser(email) {
   
        var data = {
                  'email': email
                }
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:5000/addUser",
                    datatype: "json",
                    contentType: 'application/json',
                    success: function (response) {
                        console.log(response)

                  },
                  error: function(err) {
                      console.log(err)
                    },

                    data: JSON.stringify(data),
                });
  }
  

}
