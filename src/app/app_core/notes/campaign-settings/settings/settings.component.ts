import {
  Component,
  OnInit,
  Input,
  AfterViewInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import {
  loadCldr,
  L10n
} from "@syncfusion/ej2-base";

import {
  database
} from 'firebase';

import {
  NotesService
} from '../../notes.service';
import {
  AuthService
} from '../../../core/auth.service';



import * as $ from 'jquery'
import {
  Observable
} from 'rxjs'
import {
  AdGroupService
} from '../../ad-groupe.service'
import Swal from 'sweetalert2'
import {
  AdGroup
} from '../../ad_group.models'
import {
  map
} from 'rxjs/operators'


import {Router} from '@angular/router'

declare var require: any;
export interface JSONDATE {
  selectedDate: string;
}


const MONTH = [{
  "Jan": {
    "name": "January",
    "short": "Jan",
    "number": '01',
    "days": '31'
  },
  "Feb": {
    "name": "February",
    "short": "Feb",
    "number": '2',
    "days": '28'
  },
  "Mar": {
    "name": "March",
    "short": "Mar",
    "number": '03',
    "days": '31'
  },
  "Apr": {
    "name": "April",
    "short": "Apr",
    "number": '04',
    "days": '30'
  },
  "May": {
    "name": "May",
    "short": "May",
    "number": '05',
    "days": '31'
  },
  "Jun": {
    "name": "June",
    "short": "Jun",
    "number": '06',
    "days": '30'
  },
  "Jul": {
    "name": "July",
    "short": "Jul",
    "number": '07',
    "days": '31'
  },
  "Aug": {
    "name": "August",
    "short": "Aug",
    "number": '08',
    "days": '31'
  },
  "Sep": {
    "name": "September",
    "short": "Sep",
    "number": '09',
    "days": '30'
  },
  "Oct": {
    "name": "October",
    "short": "Oct",
    "number": '10',
    "days": '31'
  },
  "Nov": {
    "name": "November",
    "short": "Nov",
    "number": '11',
    "days": '30'
  },
  "Dec": {
    "name": "December",
    "short": "Dec",
    "number": '12',
    "days": '31'
  }
}]

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public today: number = new Date().getUTCDay()
  public minDate: Date = new Date(this.fullYear, this.month, this.today);
  public maxDate: Date = new Date(this.fullYear, this.month, 31);
  public dateValue: Date = new Date();
  private adGroupCollection: AngularFirestoreCollection < AdGroup > ;
  public JSONData: JSONDATE = JSON.parse(`{ "selectedDate":  "2018-12-18T08:56:00+00:00"}`);
  public model_result: string = JSON.stringify(this.JSONData);
  @Input() id_campagne: string;
  @Input() id: string;
  @Input() name: string;
  @Input() status: string;
  @Input() ad_group_id: string;
  @Input() uid: string;

  email: string;

  user: Observable < any > ;
  number_ad_groups: any;
  isCreating = false
  isAdGroup = false
  isCiblage = false
  startDate: any;
  endDate: any;
  ad_group_name: any;
  servingStatus: any;
  adgroups: Observable < any[] > ;
  labelDateStart = "Date de début";
  labelDateEnd = "Date de fin"
  labelServing = "Actuellemnt en diffusion"
  labelNotServing = "Non diffusée, changer la date de début pour commencer la diffusion"
  labelSuspended = "Suspendu"
  labelNone = "Pas assez de fonds displonible pour démarrer une campagne"
  labelEnded = "Campagne publicitaire terminée"
  text_status_deactive_campaign = "Désactivée"
  text_status_active_campaign = "Activée"
  text_no_zone = "Aucune zone ciblée"
  sn = 'Tout le Sénégal'
  dk = 'Dakar'
  generale='Général'
  zone: any;
  zones = [];
  selectedZones = []
  dropdownListZones = [];
  selectedItems = [];
  dropdownSettingsZones = {};
  


  constructor(private notesService: NotesService, private auth: AuthService, private adGroupService: AdGroupService, private http: HttpClient, private afs: AngularFirestore, private router: Router) {
    this.getUser().then(res => {
      console.log(res)
      console.log(this.id_campagne)

    })
  }
  getUser() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.auth.user.forEach(data => {
          this.email = data.email
          resolve(data.uid)
        })
      }, 2000);
    });
  }
  ngOnInit() {
    /*        L10n.load({
          'fr': {
            'datepicker': {
              placeholder: 'Date de début',
              today:"Aujourd'hui"
            }
          }
        }) */
    ;
 
    console.log('init')
    this.notesService.getCampaignRealTimeData(this.id, this.id_campagne)
    this.notesService.getSingleCampaign(this.id_campagne, this.name).subscribe(res => {
      res.forEach(data => {
            this.startDate = data['startDateFrench']
        this.endDate = data['endDateFrench'] 
        this.servingStatus = data['servingStatus']
        var result = data['zones']
        this.zone = result
        console.log(this.zone[0])
      })
    })

    this.adgroups = this.adGroupService.getListAdGroup(this.id_campagne)
    this.adgroups.forEach(child => {
      console.log(child)
      if (child.length > 0) {
        this.number_ad_groups = child.length
      } else {
        this.number_ad_groups = "0"
      }

    })
       this.dropdownListZones = [{
      item_id: 9067846,
      item_text: this.dk
       },
         {
           item_id: 2686,
           item_text: this.sn
       }];
     this.dropdownSettingsZones = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      searchPlaceholderText: 'Rechercher',

    };

  }

  /*  this.adgroups = this.getData();
   
    
   })  */

  onZoneSelect(item: any) {
    this.selectedZones = []
    this.selectedZones.push(item)
    console.log(this.selectedZones)
  }
/*   onZoneSelectAll(items: any) {
    console.log(items);
  } */
  onZoneDeSelect(item: any) {
    console.log(item)
    this.selectedZones = []
    console.log(this.selectedZones)

  }
/*   onDeSelectAllZone() {
    this.zones = []
    console.log(this.zones)
  } */


  getData(): Observable < any[] > {
    // ['added', 'modified', 'removed']

    return this.adGroupCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return {
            id: a.payload.doc.id,
            ...data
          };
        });
      })
    );
  }
  addAdGroup() {
    this.isCreating = true;
    var name = $('#adgroup').val()
    console.log(this.id_campagne)
    this.adGroupService.addAdGroup(this.id_campagne, this.uid, name).then(res => {
      this.isCreating = false
      this.isAdGroup = false
    }).catch(err => {
      this.isCreating = false
      alert('Opération échouée')
    })
  }

  onDateStartChange(args) {
    var DATE = args.value.toString().split(' ')
    console.log(DATE)
    var parsed = JSON.parse(JSON.stringify(MONTH))
    var DATE_ELEMENT = parsed[0][DATE[1]]
    var day = DATE[2]
    var month = DATE_ELEMENT.number
    var years = DATE[3]
    this.startDate = `${day}/${month}/${years} `
    var date = `${years}${month}${day}`
    
    this.isCreating = true
    this.notesService.getCampaignDates(this.id_campagne, this.name).then(value => {

      if (value['startDate'] == date || value['endDate'] == date) {
        alert('erreur de date de début')
        this.isCreating = false
      } else {
        this.notesService.updateStartDate(this.id, this.id_campagne, date, this.startDate)
        
        this.isCreating = false

      }
      

    })
    
    
  }
  onEndDateChange(args) {
  var DATE = args.value.toString().split(' ')
  
    var parsed = JSON.parse(JSON.stringify(MONTH))
    var DATE_ELEMENT = parsed[0][DATE[1]]
    var day = DATE[2]
    var month = DATE_ELEMENT.number
    var years = DATE[3]


    this.endDate = `${day}/${month}/${years} `
    var date = `${years}${month}${day}`
    this.isCreating = true
    this.notesService.getCampaignDates(this.id_campagne, this.name).then(value => {

      /* console.log(`start date from firebase: ${value['startDate']} end date from firebase: ${value['endDate']}`)
      console.log(`end date from me: ${date}`) */
      if (value['startDate'] == date || value['endDate'] == date) {
     /*    console.log(`start date from firebase: ${value['startDate']} end date from firebase: ${value['endDate']}`)
      console.log(`end date from me: ${date}`)  */
          this.isCreating = false
        alert('erreur de date de fin')
        

      } else {
        this.notesService.updateEndDate(this.id, this.id_campagne, date, this.endDate)

        this.isCreating = false
      }

    })
  }
  openAddLocation() {
    this.isCiblage = true;
  }
  closeAddLocation() {
    this.isCiblage = false
  }
  targetZones() {
    this.isCreating = true
  
    this.notesService.targetLocation(this.id, this.id_campagne, this.name, this.selectedZones).then(res => {
      this.isCiblage = false
      this.isCreating = false
    })
  }

  updateTargetZones() {
    this.isCreating = true
    this.notesService.updateTargetLocation(this.id, this.id_campagne, this.name, this.selectedZones).then(res => {
      this.isCiblage = false
      this.isCreating = false
    })
  }

  toggleAddNewAdGroup() {
    this.isAdGroup = true
  }
  closeAddAdGroup() {
    this.isAdGroup = false
  }
  
  updateCampaign() {

    console.log(this.id_campagne)
    console.log(this.name)
    Swal.fire({
      title: '',
      type: 'info',
      html: ' <div class="card shadow no-b r-0"><div class="card-header text-center white b-0"><h6>Modifier la campagne</h6></div>' +
        ' <div class="card-body"><form class="needs-validation" novalidate><div class="form-row">' +
        '<div class="col-md-6"> <label for="validationCustom01">Nom</label> <input type="text" class="form-control"  placeholder="Nom de la campagne" id="campagne_name" value=' + this.name + ' required><div class="valid-feedback">Looks good!</div></div>' +
        '<div class="col-md-6"> <label for="validationCustom01">Status</label>  <select class="custom-select select2" required><option value=""></option> <option value="PAUSED">Désactiver</option><option value="ENABLED">Activer</option> </select></div>' +
        '</form></div></div></div>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="icon-check"></i> Valider',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="icon-remove"></i>',
      cancelButtonAriaLabel: 'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

      if (result.dismiss) {
        this.isCreating = false
      } else {
        var data = []
        this.isCreating = true
        //Si nom inshangé et status inchangé
        if (this.name == $("#campagne_name").val() && this.status == $('.custom-select').val()) {
          Swal.fire({
            title: 'Modification!',
            text: 'Aucune modification détectée',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })
          this.isCreating = false
          //Si nom inchangé et status changé
        } else if (this.name == $("#campagne_name").val() && this.status != $('.custom-select').val() && $('.custom-select').val() != "") {
          data.push({
            "id": this.id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": this.name,
            "email": this.email,
            "status": $('.custom-select').val(),
            "state": "1"
          })
          $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(this.id, {
                status: response[0].status
              })
              this.isCreating = false

              Swal.fire({
                title: 'Modification!',
                text: 'Status de la campagne modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                this.isCreating = false
                if (result.value) {
                  window.location.reload()

                }
              })



            } else {
              this.isCreating = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              })
            }
          })
          //Si nom changé et status inchangé
        } else if (this.name != $("#campagne_name").val() && this.status == $('.custom-select').val()) {
          data.push({
            "id": this.id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": this.name,
            "email": this.email,
            "status": this.status,
            "state": "2"
          })
          $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(this.id, {
                name: response[0].name
              })
              this.isCreating = false
              Swal.fire({
                title: 'Modification!',
                text: 'Nom de la campagne modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  window.location.reload()

                }
              })
            } else {
              this.isCreating = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              })

            }
          })
          //Si nom et status modifés
        } else if (this.name != $("#campagne_name").val() && this.status != $('.custom-select').val() && $('.custom-select').val() != "" && $("#campagne_name").val() != "") {
          data.push({
            "id": this.id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": this.name,
            "email": this.email,
            "status": $('.custom-select').val(),
            "state": "3"
          })
          $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            console.log(response)
            if (response[0].status != "error") {

              this.notesService.updateNote(this.id, {
                name: response[0].name,
                status: response[0].status
              })

              Swal.fire({
                title: 'Modification!',
                text: 'Le nom et le status de votre campagne ont été modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  window.location.reload()

                }
              })

            } else {
              this.isCreating = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              })
            }
          })
          //Si nom changé et status vide
        } else if (this.name != $("#campagne_name").val() && $('.custom-select').val() == "") {
          data.push({
            "id": this.id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": this.name,
            "email": this.email,
            "status": this.status,
            "state": "4"
          })
          $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(this.id, {
                name: response[0].name
              })
              this.isCreating = false
              Swal.fire({
                title: 'Modification!',
                text: 'Nom de la campagne a été modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  window.location.reload()

                }
              })
            } else {
              this.isCreating = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              })

            }
          })

        } else if ($("#campagne_name").val() == "" && $('.custom-select').val() == "") {
          Swal.fire({
            title: 'Modification!',
            text: 'Aucune Modification détectée',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })


        } else {
          this.isCreating = false
          Swal.fire({
            title: 'Errur!',
            text: 'Données invalides',
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })
        }
      }
    })
  }




  changeAdGroupStatus(id: string, adgroup_id: string, last_status: string) {
    Swal.fire({
      title: "Status groupe d'annonce",
      text: "Voulez vous modifier le status de votre groupe d'annonce!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier!'
    }).then((result) => {
      if (result.value) {
        /*  */
        this.isCreating = true
        this.http.post('http://127.0.0.1:5000/updateAdGroupStatus', {
            'adgroup_id': adgroup_id,
            'last_status': last_status
          })

          .subscribe(
            res => {
              console.log(res)

              this.adGroupService.updateAdgroup(id, {
                status: res['status_adgroup']
              }).then(res => {
                Swal.fire(
                  'Modifier!',
                  'Status du groupe modifié.',
                  'success'
                ).then(res => {
                  this.isCreating = false
                })
              })

            },
            err => {
              this.isCreating = false
              Swal.fire({
                title: "Service Groupe d'annonce!",
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


      }
    })
  }


  removeAdGroup(id: string, adgroup_id: string) {
    Swal.fire({
      title: "Service groupe d'annonce",
      text: "Voulez vous supprimer votre groupe d'annonce!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        /*  */
        this.isCreating = true
        this.http.post('http://127.0.0.1:5000/deleteAdGroup', {
            'adgroup_id': adgroup_id,

          })

          .subscribe(
            res => {
              console.log(res)

              this.adGroupService.deleteAdGroup(id).then(res => {
                Swal.fire(
                  'Supprimer!',
                  "Groupe d'annonce supprimé avec succès!",
                  'success'
                ).then(res => {
                  this.isCreating = false
                })
              })

            },
            err => {
              this.isCreating = false
              Swal.fire({
                title: "Service Groupe d'annonce!",
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

      }
    })
  }


  deleteCampaign() {
    Swal.fire({
      title: 'Vous voulez vraiment supprimer cette campagne?',
      text: "Cette action sera irréversible!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        var data = {
          "id": this.id_campagne
        }
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:5000/deleteCampaign",
          datatype: "json",
          contentType: 'application/json',
          success: function (response) {
            console.log(response)
            if (response.status == "ok") {
              console.log(response.handler)

            }
          },
          error: function (err) {
            console.log(err)
          },

          data: JSON.stringify(data),
        }).then((res) => {

          this.notesService.deleteNote(this.id);
          Swal.fire({
            title: 'Supprimer!',
            text: 'Votre campagne a été supprimée avec succès.',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              window.location.reload()

            }
          })


        }).catch(err => {
          Swal.fire(
            'Erreur!',
            'Une erreur est survenue lors de la suppression de votre campagne',
            'error'
          )
        })

        /*   Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ) */
      }
    })

  }

  goAdGroups(ad_group_name: string, id: string, ad_group_id: string) {
     this.router.navigate(['ads', ad_group_name, id, ad_group_id, this.id_campagne])
   
  }
}
