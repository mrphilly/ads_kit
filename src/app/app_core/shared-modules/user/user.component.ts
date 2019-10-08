import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import {MatDialog} from "@angular/material"
import { UserManagementComponent } from '../user-management/user-management.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  photoURL = ""
  email = ""
  username = ""
  uid = ""
  accountValue = 0
  constructor(public auth: AuthService, private dialog: MatDialog) { 
     this.auth.user.forEach(data => {
      this.photoURL = data.photoURL
      this.accountValue = data.account_value
      this.username = data.displayName
      this.email = data.email
      this.uid = data.uid
    })
  }
 openDialogusername(): void {
    this.auth.changeusername = true
    let dialogRef = this.dialog.open(UserManagementComponent ,{
      width: '300px',
      data: { changeusername: this.auth.changeusername }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     /*  this.getemail.email = result; */
    });
  }
  ngOnInit() {
  }

}
