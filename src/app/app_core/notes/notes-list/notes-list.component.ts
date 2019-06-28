import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { NotesService } from '../notes.service';
import { AuthService } from '../../core/auth.service';
import { NoteDetailComponent } from '../note-detail/note-detail.component'
import { AdGroupService } from '../ad-groupe.service'
import Swal from 'sweetalert2'
import * as $ from 'jquery'
import * as moment from 'moment'



@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  providers: [NoteDetailComponent]
})
export class NotesListComponent implements AfterViewInit {

   @ViewChild(NoteDetailComponent) child: NoteDetailComponent;

  

  @Input() icon_1 = "icon icon-inbox text-purple s-18"
  @Input() icon_2 = "icon icon-star-o lime-text s-18"
  @Input() icon_3 = ""
  @Input() icon_4 = ""
  @Input() icon_5 = ""

  text_1 = "Liste des camapagnes"
  text_2 = "Ajouter une campagne"
  text_3 = ""
  text_4 = ""
  text_5 = ""

   @Input() icon_retour = "icon-long-arrow-left"
  @Input() btn_retour = "btn-fab btn-fab-sm shadow btn-primary"

  action_2 = () => {this.toggleAddCampaignBlock()}



  @Input()
  notes: Observable<any[]>;
  name: string;
  id: string;
  id_campagne: string;
  status: string;
  uid: string;
  email: string;
  title = "";
  isCampaign = false;
  ad_group_id: string;
  adgroups: any;
  //Si aucune campagne le bloc pour crÃ©er une nouvelle campagne
  _addCampaign_ = false;

  _init_campagne = false;

  //Le bloc pour afficher la liste des campagnes
  showList = false

  //Le bloc pour afficher la page pour une campagne donnÃ©e
  _showCampaignSettings_ = false
  isCreating = false


  constructor(private notesService: NotesService, private auth: AuthService, private http: HttpClient, private adgroup_service: AdGroupService) {
    
    
       this.auth.user.forEach((value) => {
         this.uid = value.uid
         this.email = value.email
    
    })
  }
  ngAfterViewInit() {
  this.notes = this.notesService.getData();


    this.notes.forEach(child => {
      console.log(child.length)
      if (child.length > 0) {
        console.log(child.length)
        this.toggleListCampaign()
      } else {
        this.initCampagne()
      }
    })

 
    
   
  }

   ngOnInit() {
   
  }


  initCampagne() {
    this._init_campagne = true
    this.title = "Aucune campagne trouvÃ©e"
    this.showList = true
  }

  toggleListCampaign() {
    this.showList = false
     this.child._showCampaignSettings_=false
    this._addCampaign_ = false
  /*   this.title = "Liste des campagnes" */
  }
  toggleSignleCampaign(/* name: string, id: string, id_campagne: string */) {
    this._showCampaignSettings_ = true
    this.showList = false
    this._addCampaign_ = false
   /*  this.id = id
    this.id_campagne = id_campagne
    this.name = name */
   
    
  }
  newCampaign() {
    this._addCampaign_ = true 
    this.title = "Ajouter une nouvelle campagne"
  }

  showCampaign() {
    this._showCampaignSettings_=true
    this.showList = false
    this._addCampaign_ = false
    this.title = "Paramètre de campagne"
  }


  toggleCampaign() {
    this.isCampaign = true
    return this.isCampaign
  }
  toggleAddCampaignBlock() {
    this._addCampaign_ = true
    this.showList = true
    this.child._showCampaignSettings_ = false
   
    
  }

  goBack() {
    this._addCampaign_=false
  }

    clickHandler(id: string, name: string, status: string, startDate: string, endDate: string, servingStatus: string) {
    
      console.log(this.uid)
      console.log(name)
      console.log(status)
      
      this.notesService.createCampaign(id, name, status, startDate, endDate, servingStatus
      );
    this.name = '';
    this.id_campagne = '';
    this.isCreating = false
    this._init_campagne = false
    Swal.fire({
      title: 'Service Campagne!',
      text: 'Votre campagne a été ajouté avec succès.',
      type: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.value) {}
    })
  }
  addCampaign() {   
    
    this.isCreating = true
    var name = $("#campagne").val()
    

    this.http.post('http://127.0.0.1:5000/addCampaign', {
      'email': this.email,
      'campaign_name': name
    })
      .subscribe(
        res => {
          moment.locale('fr')
        
           var startDate = moment(res['startDate'], "YYYYMMDD").fromNow()
          var endDate = moment(res['endDate'], "YYYYMMDD").fromNow()
          this.id_campagne = res['id']
          this.status = res['status_campaign']
          this.ad_group_id = res['ad_group_id']
          this.clickHandler(this.id_campagne, name, this.status,startDate, endDate, res['servingStatus'])
          
        },
        err => {
          Swal.fire({
      title: 'Service Campagne!',
      text: 'Erreur.',
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.value) {}
    })
        }
      );
 
    return;              
  }
    async loadScript(src){
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
    script.src = src;
    $("body").css("background-image", "url('')")
  }

}
