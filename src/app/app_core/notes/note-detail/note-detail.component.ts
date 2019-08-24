import { Component, Input, OnInit, Injectable, ViewChild, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';

import { NotesService } from '../notes.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

import { AdGroupService } from '../ad-groupe.service'
import Swal from 'sweetalert2'
import {SERVER} from '../../../../environments/environment'
import { b } from '@angular/core/src/render3';


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
  isRoller = false
  email: any

  constructor(private notesService: NotesService, private router: Router, private adgroup_service: AdGroupService,private auth: AuthService) { 
    
   
    
    
  }
  ngOnInit() {
     this.auth.user.forEach(child=>{
       this.uid = child.uid
       this.email = child.email
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
      //console.error('Note missing ID!');
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

  updateCampaign(id, id_campagne, name, status, budget) {
      
    var html = ""
    if (status === "PAUSED" && budget > 0) {
      html = ' <div class="card shadow no-b r-0"><div class="card-header text-center white b-0"><h6>Modifier la campagne</h6></div>' +
        ' <div class="card-body"><form class="needs-validation" novalidate><div class="form-row">' +
        '<div class="col-md-6"> <label for="validationCustom01">Nom</label> <input type="text" class="form-control"  placeholder="Nom de la campagne" id="campagne_name" value=' + name + ' required><div class="valid-feedback">Looks good!</div></div>' +
        '<div class="col-md-6"> <label for="validationCustom01">Status</label>  <select class="custom-select select2" required><option value=""></option><option value="ENABLED">Activer</option> </select></div>' +
        '</form></div></div></div>'
    } else if (status === "PAUSED" && budget === 0) {
           html = ' <div class="card shadow no-b r-0"><div class="card-header text-center white b-0"><h6>Modifier la campagne</h6></div>' +
        ' <div class="card-body"><form class="needs-validation" novalidate><div class="form-row">' +
        '<div class="col-md-6"> <label for="validationCustom01">Nom</label> <input type="text" class="form-control"  placeholder="Nom de la campagne" id="campagne_name" value=' + name + ' required><div class="valid-feedback">Looks good!</div></div>' +
        '<div class="col-md-6"> <label for="validationCustom01">Status</label>  <select class="custom-select select2" required><option value=""></option></select></div>' +
        '</form></div></div></div>'
    }else {
     
      html = ' <div class="card shadow no-b r-0"><div class="card-header text-center white b-0"><h6>Modifier la campagne</h6></div>' +
        ' <div class="card-body"><form class="needs-validation" novalidate><div class="form-row">' +
        '<div class="col-md-6"> <label for="validationCustom01">Nom</label> <input type="text" class="form-control"  placeholder="Nom de la campagne" id="campagne_name" value=' + name + ' required><div class="valid-feedback">Looks good!</div></div>' +
        '<div class="col-md-6"> <label for="validationCustom01">Status</label>  <select class="custom-select select2" required><option value=""></option> <option value="PAUSED" >Désactiver</option></select></div>' +
        '</form></div></div></div>'
    }

    //console.log(id_campagne)
    //console.log(name)
    Swal.fire({
      title: '',
      type: 'info',
      html: html ,
    
      confirmButtonText: '<i class="icon-check"></i> Valider',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="icon-remove"></i> Annuler',
      showCloseButton: false,
      buttonsStyling: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",

      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

      if (result.dismiss) {
        this.isRoller = false
      } else {
        var data = []
        this.isRoller = true
        
        //Si nom inshangé et status inchangé
        if (name == $("#campagne_name").val() && $('.custom-select').val()=="") {
          Swal.fire({
            title: 'Modification!',
            text: 'Aucune modification détectée',
            type: 'warning',
            showCancelButton: false,
           confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
            confirmButtonText: 'Ok',
            focusConfirm: false,
          })
          this.isRoller = false
          //Si nom inchangé et status changé
        } else if (name == $("#campagne_name").val() && status != $('.custom-select').val() && $('.custom-select').val() != "") {
          data.push({
            "id": id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": name,
            "email": this.email,
            "status": $('.custom-select').val(),
            "state": "1"
          })
          $.ajax({
            type: "POST",
            url: SERVER.url+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            //console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(id, {
                status: response[0].status
              })
              this.isRoller = false

              Swal.fire({
                title: 'Modification!',
                text: 'Status de la campagne modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              }).then((result) => {
                this.isRoller = false
                                if (result.value) {
                  this.isRoller = false

                } else {
                  this.isRoller = false
                }
              })



            } else {
              this.isRoller = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              })
            }
          })
          //Si nom changé et status inchangé
        } else if (name != $("#campagne_name").val() && $('.custom-select').val()=="") {
          data.push({
            "id": id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": name,
            "email": this.email,
            "status": status,
            "state": "2"
          })
          $.ajax({
            type: "POST",
            url: SERVER.url+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            //console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(id, {
                name: response[0].name
              })
              this.isRoller = false
              Swal.fire({
                title: 'Modification!',
                text: 'Nom de la campagne modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              }).then((result) => {
                                if (result.value) {
                  this.isRoller = false

                } else {
                  this.isRoller = false
                }
              })
            } else {
              this.isRoller = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              })

            }
          })
          //Si nom et status modifés
        } else if (name != $("#campagne_name").val() && status != $('.custom-select').val() && $('.custom-select').val() != "" && $("#campagne_name").val() != "") {
          data.push({
            "id": id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": name,
            "email": this.email,
            "status": $('.custom-select').val(),
            "state": "3"
          })
          $.ajax({
            type: "POST",
            url: SERVER.url+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            //console.log(response)
            if (response[0].status != "error") {

              this.notesService.updateNote(id, {
                name: response[0].name,
                status: response[0].status
              })

              Swal.fire({
                title: 'Modification!',
                text: 'Le nom et le status de votre campagne ont été modifié avec succès.',
                type: 'success',
                focusConfirm: false,
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  this.isRoller = false

                } else {
                  this.isRoller = false
                }
              })

            } else {
              this.isRoller = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                focusConfirm: false,
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              })
            }
          })
          //Si nom changé et status vide
        } else if (name != $("#campagne_name").val() && $('.custom-select').val() == "") {
          data.push({
            "id": id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": name,
            "email": this.email,
            "status": status,
            "state": "4"
          })
          $.ajax({
            type: "POST",
            url: SERVER.url+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            //console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(id, {
                name: response[0].name
              })
              this.isRoller = false
              Swal.fire({
                title: 'Modification!',
                text: 'Nom de la campagne a été modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              }).then((result) => {
                if (result.value) {
                  window.location.reload()

                }
              })
            } else {
              this.isRoller = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
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
          this.isRoller = false
          Swal.fire({
            title: 'Errur!',
            text: 'Données invalides',
            type: 'error',
            focusConfirm: false,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })
        }
      }
    })
  }
  
  deleteCampaign(id, id_campagne) {
    
    
     Swal.fire({
      title: 'Vous voulez vraiment supprimer cette campagne?',
      text: "Cette action sera irréversible!",
       type: 'warning',
       focusConfirm: false,
      buttonsStyling: true,
       showCancelButton: true,
       cancelButtonText: '<i class="icon-remove"></i> Annuler',
       confirmButtonText: 'Oui, supprimer!',
       confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
       cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
    }).then((result) => {
      if (result.value) {
        this.isRoller = true
        var data = {
          "id": id_campagne
        }
        $.ajax({
          type: "POST",
          url: SERVER.url+"/deleteCampaign",
          datatype: "json",
          contentType: 'application/json',
          success: function (response) {
            //console.log(response)
            if (response.status == "ok") {
              //console.log(response.handler)

            }
          },
          error: function (err) {
            //console.log(err)
          },

          data: JSON.stringify(data),
        }).then((res) => {

      //console.log(this.ad_groups_list_id)
    
      
          this.notesService.deleteNote(id).then(res => {
            if (res == "ok") {
       
              Swal.fire({
                title: 'Supprimer!',
                text: 'Votre campagne a été supprimée avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                 focusConfirm: false,
              }).then((result) => {
                if (result.value) {
                this.isRoller = false
           
                } else {
                  this.isRoller = false
                }
              })
            } else {
              this.isRoller
     }
   })
      


        }).catch(err => {
          Swal.fire(
            'Erreur!',
            'Une erreur est survenue lors de la suppression de votre campagne',
            'error'
          )
        })

      
      }
    })  

  }

  goCampaignSettings(id: string,id_campagne: string, name: string, status: string, ad_group_id: string, budget: any, budgetId: any, dailyBudget: any, numberOfDays: any) {
    //console.log(id + " " + id_campagne + " " + name + " " + status + " "+dailyBudget+" "+numberOfDays);
    id_campagne = id_campagne;
    
    this.id = id;
    this.name = name;
    this.status = status;
    this.ad_group_id = ad_group_id
    this.id_campagne = id_campagne
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
