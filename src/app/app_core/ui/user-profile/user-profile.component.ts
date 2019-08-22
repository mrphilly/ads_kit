import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  photoURL = ""
  numberOfNotifications = 0
  notificationAccountValue = 0
  accountValue = 0
  username = ""
  email = ""
  uid = ""

  constructor(public auth: AuthService) {
    this.auth.user.forEach(data => {
      this.photoURL = data.photoURL
      this.accountValue = data.account_value
      this.username = data.displayName
      this.email = data.email
      this.uid = data.uid
    })
   }

  logout() {
    this.auth.signOut();
  }
  ngOnInit() {
    this.auth.notificationAccount.forEach((value) => {
      if(value.notification != ""){
        this.numberOfNotifications = 1
        this.notificationAccountValue = value.notification
      }
    })
  }
}
