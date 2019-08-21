import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRoute
} from '@angular/router';

import { Observable } from 'rxjs';

import { NotesService } from '../notes.service';
import { AuthService } from '../../core/auth.service';
import { NoteDetailComponent } from '../note-detail/note-detail.component'
import { AdGroupService } from '../ad-groupe.service'
import Swal from 'sweetalert2'
import * as $ from 'jquery'
import * as moment from 'moment'
import { SERVER } from '../../../../environments/environment'
import { Router } from '@angular/router'
import * as CryptoJS from 'crypto-js'


declare const particlesJS: any; 

declare const pQuery: any
declare const PayExpresse: any
declare var require: any;
//const SERVER_URL = "http://127.0.0.1:5000"
const SERVER_URL = SERVER.url
const REDIRECT_URL = SERVER.url_redirect


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
  montant: any;

  email_letter: any;
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
  dure_campagne= 0
  //Si aucune campagne le bloc pour crÃ©er une nouvelle campagne
  _addCampaign_ = false;

  _init_campagne = false;

  //Le bloc pour afficher la liste des campagnes
  showList = false
  accountValue: any;
  //Le bloc pour afficher la page pour une campagne donnÃ©e
  _showCampaignSettings_ = false
  isCreating = false
  notificationAccountValue: any;
  numberOfNotifications = 0

  constructor(private notesService: NotesService, public auth: AuthService, private http: HttpClient, private adgroup_service: AdGroupService, private route: ActivatedRoute, private router: Router) {
      var self = this
    

    
    this.auth.notificationAccount.forEach((value) => {
      if(value.notification != ""){
        this.numberOfNotifications = 1
        this.notificationAccountValue = value.notification
      }
    })
  }
  ngAfterViewInit() {
  //var init_note = new NotesService(this.uid)
  
    this._showCampaignSettings_ = this.child._showCampaignSettings_


   

 
    
   
  }

  decryptMoney(encrypted: string, uid: string): Promise<any> {

    return new Promise(resolve => {
      var status = []
      var CryptoJS = require( 'crypto-js' );
    var cipherParams = CryptoJS.lib.CipherParams.create(
               {ciphertext: CryptoJS.enc.Hex.parse(encrypted.toString())});
localStorage.getItem("")
var bytes = CryptoJS.AES.decrypt(cipherParams,CryptoJS.enc.Hex.parse(uid),
            { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding });

    console.log('Decrypted:' + bytes.toString(CryptoJS.enc.Utf8));
   
      status.push({
        "status": "ok",
        "content":  bytes.toString(CryptoJS.enc.Utf8)
      })
      resolve(status)
   })
  }
  ngOnInit() {
     document.getElementById('body').classList.remove('adafri-background')
       this.auth.user.forEach((value) => {
        
         this.uid = value.uid
         this.email = value.email
         this.accountValue = value.account_value
         this.email_letter = value.email.charAt(0)
         this.notes = this.notesService.getListCampaign(value.uid)
         this.notes.forEach(child => {
      //console.log(child.length)
      if (child.length > 0) {
        //console.log(child.length)
        this.toggleListCampaign()
      } else {
        this.initCampagne()
        setTimeout(() => {
             particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 380,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#ffffff"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "../../../../assets/img/images/campaign.png",
        "width": 1000,
        "height": 1000
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": true
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}); 
        }, 2000)
      }
    })
       })
    

     

    this.route.params.subscribe(params => {
  
      if (typeof (params['money']) != "undefined") {
        this.isCreating = true
        
        this.auth.user.forEach(data => {
          alert(data.uid)
          var mystr = this.decrypted(params['money'], data.uid)

          alert(mystr)
          
                
                this.auth.updateUser(data.uid, { account_value: parseInt(mystr) })
              this.auth.getInfos(data.uid).subscribe(el => {
                this.auth.updateNotification(el[0]['id'], { notification: "" }).then(() => {
                  Swal.fire({
                    title: 'Service Rechargement!',
                    text: 'Compte mis à jour avec succès.',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                  }).then((result) => {
                    if (result.value) {
                      //window.location.replace(REDIRECT_URL)
                      window.history.pushState("", "", REDIRECT_URL)
              
                      this.isCreating = false
                    }
                  })
                })
          
       
              })
         
           
          
        })
        
        

        // In a real app: dispatch action to load the details here.
      }


      if (typeof (params['money']) != "undefined" && typeof (params['idC']) != "undefined") {
         
         if (params['money'] == 0) {
          
            setTimeout(() => {
                   
                    document.getElementById(params['idC']).click()
                  }, 2000)
            setTimeout(() => {
                   
              document.getElementById("v-pills-timeline-tab").click()
              this.isCreating = false
              
                  }, 2000)
        }else{
           this.isCreating = true
        this.auth.user.forEach(data => {
          this.auth.updateUser(data.uid, { account_value: params['money'] })
          this.auth.getInfos(data.uid).subscribe(el => {
            this.auth.updateNotification(el[0]['id'], { notification: "" }).then(() => {
              Swal.fire({
                title: 'Service Rechargement!',
                text: 'Compte mis à jour avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  //window.location.replace(REDIRECT_URL)
                  window.history.pushState("", "", REDIRECT_URL)
                  this.isCreating = false
                  document.getElementById(params['idC']).click()
                  setTimeout(() => {
                   
                     document.getElementById("v-pills-timeline-tab").click()
                  }, 2000)
            
                }
              })
            })
      
   
          })
        })
        }

        // In a real app: dispatch action to load the details here.
      }

       if (typeof (params['idC']) != "undefined" && typeof(params['campagne_id']) && params['budget'] != "undefined" && params['dailyBudget'] != "undefined" && params['numberOfDays'] != "undefined") {
        this.isCreating = true
    
         
              this.notesService.updateNote(params['idC'], { budget: params["budget"] , dailyBudget: params['dailyBudget'], numberOfDays: params['numberOfDays']}).then(() => {
                Swal.fire({
                  title: 'Service Campagne!',
                  text: 'Budget mis à jour.',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ok'
                }).then((result) => {
                  if (result.value) {
                    //window.location.replace(REDIRECT_URL)
                    window.history.pushState("", "", REDIRECT_URL)
                    this.isCreating = false
                    document.getElementById(params['idC']).click()
                  }
                })
                
              })
     

        // In a real app: dispatch action to load the details here.
      }
    })
   /* $(document).ready(() => {

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('pay');
  var timerInterval;

     if (myParam != undefined) {
       const money = urlParams.get('money');
    this.auth.user.forEach(data=>{
      
      this.auth.updateValueAccount(data.uid, money).then(res => {
                    if (res == "ok") {
                      Swal.fire({
      title: 'Service Rechargement!',
      text: 'Compte mis à jour avec succès.',
      type: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.value) {
        window.history.pushState("", "","/")
      }
    })
                    }
                  })
    })
  } else {
    
  } 
}); */
  }




// INIT
/*  */;


// PROCESS
encrypted(text, password){

  return CryptoJS.AES.encrypt(text, password);
}
  decrypted(encrypted, password) {
    
    return CryptoJS.AES.decrypt(encrypted, password).toString(CryptoJS.enc.Utf8)
    ;
  }




  go1() {
    window.location.reload()
  }

  go() {
    
  window.location.replace(SERVER.url_redirect)
}

  initCampagne() {
    document.getElementById('body').classList.add('adafri-background')
    this._init_campagne = true
    this.title = "Aucune campagne trouvÃ©e"
    this.showList = true
  }

  toggleListCampaign() {
  
    this._addCampaign_ = false
    this.showList = false
    
  
     //this.child._showCampaignSettings_=false

  /*   this.title = "Liste des campagnes" */
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
 
  }
  toggleAddCampaignBlock() {
    /* this._addCampaign_ = true
    this.showList = true
    this.child._showCampaignSettings_ = false
   
    */
   
  this.router.navigate(['createCampaign'])    
  }

  goBack() {
    this._addCampaign_=false
  }

    clickHandler(id: any, name: string, status: string, startDate: string, endDate: string, startDateFrench: string, endDateFrench: string, servingStatus: string, budgetId: any) {
    
      console.log(this.uid)
      console.log(name)
      console.log(status)
      
      this.notesService.createCampaign(id, name, status, startDate, endDate, startDateFrench, endDateFrench, servingStatus, budgetId
      ).then(res => {
        if (res == "ok") {
           Swal.fire({
      title: 'Service Campagne!',
      text: 'Votre campagne a été ajouté avec succès.',
      type: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.value) {
          this.name = '';
    this.id_campagne = '';
    this.isCreating = false
        this._init_campagne = false
        document.getElementById('body').classList.remove('adafri-background')
      } else {
          this.name = '';
    this.id_campagne = '';
    this.isCreating = false
    this._init_campagne = false
      }
    })
        }
      })
  
   
  }
  addCampaign() {   
    
    this.isCreating = true
    var name = $("#campagne").val()
    

    this.http.post(SERVER_URL+'/addCampaign', {
      'email': this.email,
      'campaign_name': name
    })
      .subscribe(
        res => {
          console.log(res)
          console.log(res['budgetId'])
          if (res['status'] == "ok") {
            this.id_campagne = res['id']
            this.status = res['status_campaign']
            this.ad_group_id = res['ad_group_id']
            this.clickHandler(this.id_campagne, name, this.status, res['startDate'], res['endDate'], res['startDateFrench'], res['endDateFrench'], res['servingStatus'], res['budgetId'])
            
          } else {
          
            Swal.fire({
              title: 'Service Campagne!',
              text: 'Erreur.',
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) { }
            })
          
          
          }
        
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

  defineAmountAccount() {
    var self = this
    this.montant = $("#montant").val()
    if (this.montant < 10000) {
      $('#error_recharge').show()
    } else {
      
      $('#closeModalRecharge').trigger('click')
      var self = this
      this.isCreating = true
      setTimeout(function () {
    
        var btn = document.getElementById("budgetSet");
        var selector = pQuery(btn);
        (new PayExpresse({
          item_id: 1,
        })).withOption({
            requestTokenUrl: SERVER_URL+'/rechargeAmount/'+ self.montant,
            method: 'POST',
            headers: {
                "Accept": "application/json"
          },
       
          
            //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
            prensentationMode: PayExpresse.OPEN_IN_POPUP,
            didPopupClosed: function (is_completed, success_url, cancel_url) {
              self.isCreating = false
              if (is_completed === true) {
                  alert(success_url)
                
                  //window.location.href = success_url; 
                } else {
                  self.isCreating = false
                    //window.location.href = cancel_url
                }
            },
            willGetToken: function () {
                console.log("Je me prepare a obtenir un token");
                selector.prop('disabled', true);
                //var ads = []


            },
            didGetToken: function (token, redirectUrl) {
                console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                selector.prop('disabled', false);
            },
            didReceiveError: function (error) {
                alert('erreur inconnu');
                selector.prop('disabled', false);
            },
            didReceiveNonSuccessResponse: function (jsonResponse) {
                console.log('non success response ', jsonResponse);
                alert(jsonResponse.errors);
                selector.prop('disabled', false);
            }
        }).send({
            pageBackgroundRadianStart: '#0178bc',
            pageBackgroundRadianEnd: '#00bdda',
            pageTextPrimaryColor: '#333',
            paymentFormBackground: '#fff',
            navControlNextBackgroundRadianStart: '#608d93',
            navControlNextBackgroundRadianEnd: '#28314e',
            navControlCancelBackgroundRadianStar: '#28314e',
            navControlCancelBackgroundRadianEnd: '#608d93',
            navControlTextColor: '#fff',
            paymentListItemTextColor: '#555',
            paymentListItemSelectedBackground: '#eee',
            commingIconBackgroundRadianStart: '#0178bc',
            commingIconBackgroundRadianEnd: '#00bdda',
            commingIconTextColor: '#fff',
            formInputBackgroundColor: '#eff1f2',
            formInputBorderTopColor: '#e3e7eb',
            formInputBorderLeftColor: '#7c7c7c',
            totalIconBackgroundRadianStart: '#0178bc',
            totalIconBackgroundRadianEnd: '#00bdda',
            formLabelTextColor: '#292b2c',
            alertDialogTextColor: '#333',
            alertDialogConfirmButtonBackgroundColor: '#0178bc',
          alertDialogConfirmButtonTextColor: '#fff',
          
        });
    }, 500)

      
      
      
    }
  }
  
}
