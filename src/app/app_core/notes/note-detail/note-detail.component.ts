import { Component, Input, OnInit, Injectable, ViewChild, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';

import { NotesService } from '../notes.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

import { AdGroupService } from '../ad-groupe.service'


@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
  
@Injectable()
export class NoteDetailComponent implements OnInit {

  @Input() note: any;
   @Input()
  notes: Observable<any[]>;
  user: any;
  goCampaign = false
 
  title = "Liste des campagnes";
  id: any;
  id_campagne: any;
  name: any;
  status: any;
  ad_group_id: any;
  _showCampaignSettings_ = false
  budget: any;
  uid: any;
  budgetId: any;
  dailyBudget: any;
  numberOfDays: any;
  display_visuel = true

  constructor(private notesService: NotesService, private router: Router, private adgroup_service: AdGroupService,private auth: AuthService) { 
    
   
    
    
  }
  ngOnInit() {
     this.auth.user.forEach(child=>{
       this.uid = child.uid
       //console.log(child.uid)
       this.notes = this.notesService.getListCampaign(child.uid);
       this.notes.forEach(data => {
         if (data.length > 2) {
           this.display_visuel = false
         }
       })
    })
  
}
  addHeartToNote(val: number) {
    if (this.note.id) {
      this.notesService.updateNote(this.note.id, { hearts: val + 1 });
    } else {
      console.error('Note missing ID!');
    }
  }
  createCampaign() {
  this.router.navigate(['createCampaign'])
   
    
  }

  getDate(timestamp: string) {
      var time = parseInt(timestamp)
      return new Date(time).getDate() + "/" + new Date(time).getMonth() + "/" + new Date(time).getFullYear();
  }
 /*  deleteNote(id_campaign: string, id: string) {
    var data = {
      "id": id_campaign
    }
    $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:5000/deleteCampaign",
                    datatype: "json",
                    contentType: 'application/json',
                  success: function (response) {
                    //console.log(response)
                    if (response.status == "ok") {
                     //console.log(response.handler)

                    }
                  },
                  error: function(err) {
                      //console.log(err)
                    },

                    data: JSON.stringify(data),
                }).then((res) => {
                 
                  this.notesService.deleteNote(id);
                })
  } */

  goCampaignSettings(id: string,id_campagne: string, name: string, status: string, ad_group_id: string, budget: any, budgetId: any, dailyBudget: any, numberOfDays: any) {
    //console.log(id + " " + id_campagne + " " + name + " " + status + " "+dailyBudget+" "+numberOfDays);
    this.id_campagne = id_campagne;
    
    this.id = id;
    this.name = name;
    this.status = status;
    this.ad_group_id = ad_group_id
    this.adgroup_service.campaign_id = id_campagne
    this.budget = budget
    this.budgetId = budgetId
    this.dailyBudget = dailyBudget
    this.numberOfDays = numberOfDays
    this._showCampaignSettings_ = true
  }
 /*  async loadScript(src){
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
    script.src = src;
    $("body").css("background-image", "url('')")
  } */
}
