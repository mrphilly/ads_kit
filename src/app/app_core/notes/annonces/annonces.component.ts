import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';

import {
  Observable
} from 'rxjs';

import 'fabric';

import {
  NotesService
} from '../notes.service';
import {
  AuthService
} from '../../core/auth.service';

import Swal from 'sweetalert2'




declare const fabric: any;

import {AdGroupService} from '../ad-groupe.service'


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  campagne_name: any;
  campagne_id: any;
  ad_group_id: any;
  criteria: any;
  adgroups: any;
  status: any;
  id: any;
  ages = []
  sexes = [];
  zones = [];
  devices = []
  ad_group_name: any;
  label_enabled = 'Actif'
  label_paused = "Non Actif"
  text_create = "Annonce"
  constructor(private notesService: NotesService, private auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private adGroupService: AdGroupService) {

  }
  dropdownListAges = [];
  dropdownListSexes = [];
  dropdownListZones = [];
  dropdownListDevices = [];
  selectedItems = [];
  dropdownSettingsAges = {};
  dropdownSettingsSexes = {};
  dropdownSettingsZones = {};
   dropdownSettingsDevices = {};
  text_no_genre = "Aucun genre ciblé"
  text_no_age = "Aucune tranche d'âge ciblée"
   text_no_devices = "Aucun appareils ciblé"
  text_cibled = "Genre(s) ciblé(s)"
  text_cibled_age = "Tranches d'âges ciblées"
  text_cibled_devices = "Appareils Ciblé(s)"
  modify_gender_text = "Modifier le ciblage des genres"
  modify_age_text = "Modifier le ciblage des âges"
   modify_devices_text = "Modifier le ciblage des appareils"
  genres: any;
  populations: any;
  appareils: any;
  isCiblageGenre = false
  isCiblageAge = false
  isCiblageDevices = false
  isCreating = false
  


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.ad_group_name = params['name']
      this.campagne_id = params['campaign_id']
      this.ad_group_id = params['ad_group_id']
      this.id = params['id']


      // In a real app: dispatch action to load the details here.
    });
    this.adgroups = this.adGroupService.getAdGroup(this.id).valueChanges().subscribe(res => {
      this.status = res['status']
      this.genres = res['sexes']
      this.populations = res['ages']
      this.appareils = res['devices']
      console.log('populations')
      /* console.log(this.genres) */
      console.log(this.populations)
    })
    
    this.dropdownListAges = [{
        item_id: 503999,
        item_text: 'indéterminé'
      },
      {
        item_id: 503001,
        item_text: '18-24 ans'
      },
      {
        item_id: 503002,
        item_text: '25-34 ans'
      },
      {
        item_id: 503003,
        item_text: '35-44 ans'
      },
      {
        item_id: 503004,
        item_text: '45-54 ans'
      },
      {
        item_id: 503005,
        item_text: '55-64 ans'
      },
      {
        item_id: 503006,
        item_text: '+64 ans'
      }
    ];
    this.dropdownListSexes = [{
        item_id: 20,
        item_text: 'indéterminé'
      },
      {
        item_id: 10,
        item_text: 'Hommes'
      },
      {
        item_id: 11,
        item_text: 'Femmes'
      },
    ];
    this.dropdownListDevices = [{
        item_id: 30000,
        item_text: 'Ordinateurs'
      },
      {
        item_id: 30001,
        item_text: 'Mobiles'
      },
      {
        item_id: 30002,
        item_text: 'Tablettes'
      },
      {
        item_id: 30004,
        item_text: "Tv Connectée"
      }
    ];
    this.dropdownListZones = [{
      item_id: 9070424,
      item_text: 'Dakar'
    }, ];
    this.dropdownSettingsAges = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'annuler',
      itemsShowLimit: 8,
      allowSearchFilter: false,
      searchPlaceholderText: 'Rechercher',

    };
    this.dropdownSettingsSexes = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Rechercher',

    };
    this.dropdownSettingsZones = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Rechercher',

    };
     this.dropdownSettingsDevices = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'annuler',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      searchPlaceholderText: 'Rechercher',

    };
    //setup front side canvas

    

  }
  openAddCiblageGenre() {
    this.isCiblageGenre = true;

  }
  openAddCiblageDevices() {
    this.isCiblageDevices = true;

  }
  targetGender() {
    console.log(this.sexes)
    this.isCreating = true
    if (this.sexes.length == 0) {
       this.isCreating = false
       Swal.fire({
          title: 'Ciblage',
          text: 'Aucun genre séléctionné',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) { }
          
          })
    } else {
       this.adGroupService.targetGenre(this.id, this.campagne_id, this.ad_group_id, this.sexes).then(res => {
         this.sexes = []
        }).then(res => {
          this.isCiblageGenre = false
        this.isCreating = false
      })
      
    } 
  }

   targetDevices() {
     console.log(this.devices)
     this.isCreating = true
     if (this.devices.length == 0) {
       this.isCreating = false
       Swal.fire({
          title: 'Ciblage',
          text: 'Aucun appareil séléctionné',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
    } else {
       this.adGroupService.targetDevices(this.id, this.campagne_id, this.ad_group_id, this.devices).then(res => {
         this.devices = []
        }).then(res => {
          this.isCreating = false
          this.isCiblageDevices = false
        
      })
      
    } 
  }

  closeAddCiblageGenre() {
    this.isCiblageGenre = false
  }
  closeAddCiblageDevices() {
    this.isCiblageDevices = false
  }


 openAddCiblageAge() {
    this.isCiblageAge = true;

  }
  targetAge() {
    console.log(this.ages)
    this.isCreating = true
     if (this.ages.length == 0) {
       this.isCreating = false
       Swal.fire({
          title: 'Ciblage',
          text: 'Aucun genre séléctionné',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
    } else {
       this.adGroupService.targetAge(this.id, this.campagne_id, this.ad_group_id, this.ages).then(res => {
         this.ages = []
        }).then(res => {
          this.isCiblageAge = false
          this.isCreating = false
         
       })
      
    } 
  }

  closeAddCiblageAges() {
    this.isCiblageAge = false
  }
  
  onAgeSelect(item: any) {
    this.ages.push(item)
    console.log(this.ages)
  }
  onAgeSelectAll(items: any) {
    console.log(items);
    this.ages = []
    this.ages = items
  }
  onAgeDeSelect(item: any) {
    console.log(item)
    for (var i = 0; i < this.ages.length; i++) {
      if (this.ages[i]['item_id'] == item.item_id) {
        this.ages.splice(i, 1)
      }
    }
    console.log(this.ages)

  }
  onDeSelectAllAge() {
    this.ages = []
    console.log(this.ages)
  }



  onDevicesSelect(item: any) {
    this.devices.push(item)
    console.log(this.devices)
  }
  onDevicesSelectAll(items: any) {
    console.log(items);
    this.devices = []
    this.devices = items
  }
  onDevicesDeSelect(item: any) {
    console.log(item)
    for (var i = 0; i < this.devices.length; i++) {
      if (this.devices[i]['item_id'] == item.item_id) {
        this.devices.splice(i, 1)
      }
    }
    console.log(this.devices)

  }
  onDeSelectAllDevices() {
    this.devices = []
    console.log(this.devices)
  }
  
  onSexeSelect(item: any) {
    this.sexes.push(item)
    console.log(this.sexes)
  }
  onSexeSelectAll(items: any) {
    console.log(items);
    this.sexes = []
    this.sexes = items
  }
  onSexeDeSelect(item: any) {
    console.log(item)
    for (var i = 0; i < this.sexes.length; i++) {
      if (this.sexes[i]['item_id'] == item.item_id) {
        this.sexes.splice(i, 1)
      }
    }
    console.log(this.sexes)

  }
  onDeSelectAllSexe() {
    this.sexes = []
    console.log(this.sexes)
  }

  onZoneSelect(item: any) {
    this.zones.push(item)
    console.log(this.zones)
  }
  onZoneSelectAll(items: any) {
    console.log(items);
  }
  onZoneDeSelect(item: any) {
    console.log(item)
    for (var i = 0; i < this.zones.length; i++) {
      if (this.zones[i]['item_id'] == item.item_id) {
        this.zones.splice(i, 1)
      }
    }
    console.log(this.zones)

  }
  onDeSelectAllZone() {
    this.zones = []
    console.log(this.zones)
  }



  //Block "Size"

 
}
