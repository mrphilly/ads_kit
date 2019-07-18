import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import * as $ from 'jquery';

import { NotesService } from '../notes.service';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2'

import { Router } from '@angular/router'

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
  
export class CreateCampaignComponent implements OnInit {
  
  uid: string;
  notes: any;
  email: string;
  name: string;
  status: string;
  id_campagne: string;
  title: string;
  message = "Creation de la campagne en cours"
  isCreating = false;
  isExist: boolean = false
  
  constructor(private router: Router, private notesService: NotesService, private auth: AuthService,) { 
     this.title = "CrÃ©er une campagne"
       this.auth.user.forEach((value) => {
         this.uid = value.uid
         this.email = value.email
    })
  }



  ngOnInit() {
    this.notes = this.notesService.getData()
      this.auth.user.forEach((value) => {
         this.uid = value.uid
         this.email = value.email
    })
  }

  addCampaign() {
    this.isCreating = true
    var name = $("#campagne").val()
    this.notesService.addCampaign(this.email, this.uid, name).then(result => {
      console.log(result)
      this.isCreating = false
    })
    
  }

}
