import { Injectable, OnInit, Self,  AfterViewInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';

import { AuthService } from '../../app_core/core/auth.service';

import { AdGroup } from './ad_group.models';
import Swal from 'sweetalert2'
import * as $ from 'jquery'

import { map } from 'rxjs/operators'
import * as moment from 'moment'
/* import { NoteDetailComponent } from './note-detail/note-detail.component' */
import {SERVER} from '../../../environments/environment'
import { resolveDefinition } from '@angular/core/src/view/util';

declare var require: any;
var _ = require('lodash');

const SERVER_URL = SERVER.url
@Injectable()
export class AdGroupService {
  currentUser: any;
  uid: any;
  isLoading: boolean;
  adgroup: AdGroup;
  today: Date = new Date();
  item: any;
  campaign_id:string;

  private adGroupCollection: AngularFirestoreCollection<AdGroup>;
  
 

  constructor(private afs: AngularFirestore, private auth: AuthService, private http: HttpClient) {
    this.adGroupCollection = this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', parseInt(`${this.campaign_id}`)));
    this.auth.user.forEach(data => {
      this.uid = data.uid
    })
  }
  
 getListAdGroup(campaign_id: string) {
  // console.log(parseInt(campaign_id))
   
   
 return this.afs.collection('adgroup', (ref) => ref.where('campaign_id','==',parseInt(`${campaign_id}`))).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );

    
  
  }
  


  addGroupVerification(user_id: string, name: string, id_campaign: string) {
   // console.log(`owner: ${user_id}, name: ${name}, campaign_id: ${id_campaign}`)
     return new Promise(resolve => {
      setTimeout(() => {
        this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', parseInt(`${id_campaign}`)).where('name', '==', `${name}`).where('owner', '==', `${user_id}`)).snapshotChanges().subscribe(data => {
         // console.log(`data ${data}`)
          this.item = data
          resolve(data.length)
      })
      }, 2000);
    });
  }
  getAdGroupGenre(campaign_id: string, ad_group_id: any) {
    // console.log(`campaign_id: ${campaign_id} ad_group_id: ${ad_group_id}`)
    return new Promise(resolve => {
        setTimeout(() => {
       
          this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', parseInt(`${campaign_id}`)).where('ad_group_id', '==', parseInt(`${ad_group_id}`))).valueChanges().subscribe(el => {
           // console.log(el)
          resolve(el[0]['sexes'])
        })
      }, 2000);
    });
  }

 getAdGroupPlacement(campaign_id: string, ad_group_id: any): Promise<any> {
    // console.log(`campaign_id: ${campaign_id} ad_group_id: ${ad_group_id}`)
    return new Promise(resolve => {
        setTimeout(() => {
       
          this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', parseInt(`${campaign_id}`)).where('ad_group_id', '==', parseInt(`${ad_group_id}`))).valueChanges().subscribe(el => {
           // console.log(el)
          resolve(el[0]['criterion_placement'])
        })
      }, 2000);
    });
  }

  
  getAdGroupAge(campaign_id: string, ad_group_id: any) {
    // console.log(`campaign_id: ${campaign_id} ad_group_id: ${ad_group_id}`)
    return new Promise(resolve => {
        setTimeout(() => {
       
          this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', parseInt(`${campaign_id}`)).where('ad_group_id', '==', parseInt(`${ad_group_id}`))).valueChanges().subscribe(el => {
           // console.log(el)
          resolve(el[0]['ages'])
        })
      }, 2000);
    });
  }

   getAdGroupDevices(campaign_id: string, ad_group_id: any) {
    // console.log(`campaign_id: ${campaign_id} ad_group_id: ${ad_group_id}`)
    return new Promise(resolve => {
        setTimeout(() => {
       
          this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', parseInt(`${campaign_id}`)).where('ad_group_id', '==', parseInt(`${ad_group_id}`))).valueChanges().subscribe(el => {
           // console.log(el)
          resolve(el[0]['devices'])
        })
      }, 2000);
    });
  }
 async targetGenre(id: string, campaign_id: string, ad_group_id: any,  genre: any): Promise<any> {
   new Promise(resolve => {
     var genre_legnth = genre.length;
   this.getAdGroupGenre(campaign_id, ad_group_id).then(value => {
  
    // console.log(`value:`)
    // console.log(value)
    // console.log(`gender:`)
    // console.log(genre)
    // console.log(`concat`)    
    
        this.http.post(SERVER_URL+'/targetGender', {
       'ad_group_id': ad_group_id,
          'sexes': genre,
       'last_genre': value
    })
      .subscribe(
        res => {
         // console.log(`res from location backend: ${res}`)
          this.updateAdgroup(id, { sexes: genre }).then(res => {
            if (res == "ok") {
              resolve('ok')
            }
          })
        },
        err => {
          Swal.fire({
          title: 'Ciblage',
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
           buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        }
      );
    })
   
  })
  }

  removePlacement(id: any, campaign_id: any, ad_group_id: any, criterion: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(SERVER_URL+'/removeSinglePlacement', {
         'ad_group_id': ad_group_id,
          'criterion': criterion,
      
      }).subscribe(
        res => {
          if (res[0]['status'] == "ok") {
            this.getAdGroupPlacement(campaign_id, ad_group_id).then(res => {
              var last_placement = res
              for( var i = 0; i < last_placement.length; i++){ 
   if ( last_placement[i]['criterion_id'] == criterion ) {
     last_placement.splice(i, 1); 
   }
                this.updateAdgroup(id, { placement: last_placement, criterion_placement: last_placement }).then(res => {
                  if (res == "ok") {
                    resolve('ok')
                    
                  }
   })
}
            })
           
         }
        },
        err => {
          Swal.fire({
          title: "Placement de groupe d'annonce",
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
           buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
              resolve('error')
            }
          })
        }
      );
    })
  }

  async targetPlacement(id: string, campaign_id: string, ad_group_id: any,  placement: any): Promise<any> {
    return new Promise(resolve => {
     var genre_legnth = placement.length[0];
    this.getAdGroupPlacement(campaign_id, ad_group_id).then(value => {
      
    
        this.http.post(SERVER_URL+'/setPlacement', {
       'ad_group_id': ad_group_id,
          'placement': placement,
       'last_placement': value
    })
      .subscribe(
        res => {
         // console.log(`res from location backend: ${res}`)
         // console.log(res)
          this.updateAdgroup(id, { placement: res, criterion_placement: res }).then(res => {
            if (res == "ok") {
              
              resolve('ok')
            }
          })
        },
        err => {
          Swal.fire({
          title: "Placement de groupe d'annonce",
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
           buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        }
      );
    })
   })
   
  }

async targetDevices(id: string, campaign_id: string, ad_group_id: any,  devices: any): Promise<any> {
   
  return new Promise(resolve => {
     this.getAdGroupDevices(campaign_id, ad_group_id).then(value => {
  
    // console.log(`value:`)
    // console.log(value)
    // console.log(`devices:`)
    // console.log(devices)
    // console.log(`concat`)    
    
        this.http.post(SERVER_URL+'/targetDevices', {
       'ad_group_id': ad_group_id,
          'devices': devices,
       'last_devices': value
    })
      .subscribe(
        res => {
         // console.log(`res from location backend: ${res}`)
          this.updateAdgroup(id, { devices: devices }).then(res => {
         if (res == "ok") {
              
              resolve('ok')
            }
          })
        },
        err => {
          Swal.fire({
          title: 'Ciblage',
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
           buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        }
      );

     /*  } else{
        Swal.fire({
          title: 'Ciblage',
          text: 'Erreur service1',
          type: 'error',
          showCancelButton: false,
           buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        
      } */
    })
   })
   
  }


  async targetAge(id: string, campaign_id: string, ad_group_id: any,  age: any): Promise<any> {

    return new Promise(resolve => {
      this.getAdGroupAge(campaign_id, ad_group_id).then(value => {
  
    // console.log(`value:`)
    // console.log(value)
    // console.log(`age:`)
    // console.log(age)
  
  /*    var tab = _.differenceWith(value, genre, _.isEqual)
    // console.log(tab)
     if (tab = []) {
      // console.log(`genre déjà ciblé`)
     } else {
        
     }*/
      
        
        this.http.post(SERVER_URL+'/targetAge', {
       'ad_group_id': ad_group_id,
          'ages': age,
       'last_ages': value
    })
      .subscribe(
        res => {
         // console.log(`res from location backend: ${res}`)
          this.updateAdgroup(id, { ages: age }).then(res => {
           if (res == "ok") {
              
              resolve('ok')
            }
          })
        },
        err => {
          Swal.fire({
          title: 'Ciblage',
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
           buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        }
      );

    })
   })
   
  }

  
  async addAdGroup(campaign_id: any, user_id: string, name: string): Promise<any> {
   // console.log(`User id: ${user_id}`)
  
  
    return await new Promise(resolve => {
      this.addGroupVerification(user_id, name, campaign_id).then(value => {
     // console.log(`promise result: ${value}`)
      
      if (`${value}` == '0') {
        
        this.http.post(SERVER_URL+'/addAdGroup', {
       'ad_group_name': name,
       'campaign_id': campaign_id
    })
      .subscribe(
        res => {
         // console.log(`add group ${res}`)
          if (res['status'] == "ok") {
            var id= res['id']
           this.createAdGroup(campaign_id, res['name'], res['status_adgroup'], res['id']).then(res=>{
            Swal.fire({
              title: 'Ajouter un nouveau groupe',
              text: 'Groupe ajouté avec succès',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
               
                resolve(id)
              } else {
                resolve(id)
              }
            })
         })
          } else {
             Swal.fire({
          title: 'Ajouter un nouveau groupe',
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
           buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
              resolve('error')
          } else {
             resolve('error')
            }
          })
         }
        
         
          
        },
        err => {
          Swal.fire({
          title: 'Ajouter un nouveau groupe',
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
           buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
               resolve('error')
          } else {
             resolve('error')
            }
          })
        }
      );

      } else{
        Swal.fire({
          title: 'Ajouter une nouvelle campagne',
          text: 'Cette camapagne exite déjà',
          type: 'error',
          showCancelButton: false,
           buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
               resolve('error')
          } else {
             resolve('error')
            }
          })
        
      }
    })
   
    })
  }


  prepareSaveAdGroup(campaign_id: string, name: string, status: string, ad_group_id: string): AdGroup {
    const userDoc = this.afs.doc(`users/${this.uid}`);
    const newAdGroup = {
      campaign_id: campaign_id,
      ad_group_id: ad_group_id,
      name: name,
      status: status,
      ages: [],
      sexes: [],
      devices: [],
      placement: [],
      criterion_placement: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: userDoc.ref,
      owner: this.uid,  
    };
    return {...newAdGroup};
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    
    return this.adGroupCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }







  getAdGroup(id: string) {
    return this.afs.doc<any>(`adgroup/${id}`);
  }

  async createTarget(id: string, data: any) {
      return this.getAdGroup(id).update(data);
  }

  async createAdGroup(id_campagne: string, name: string, status: string, ad_group_id: string) {
    this.adgroup = this.prepareSaveAdGroup(id_campagne, name, status, ad_group_id);
    const docRef = await this.afs.collection('adgroup').add(this.adgroup);
  }

  updateAdgroup(id: string, data: any): Promise<any> {
    return new Promise(resolve => {
      this.getAdGroup(id).update(data).then(res => {
        resolve("ok")
      })
    })
  
  }

  deleteAdGroup(id: string) {
    return this.getAdGroup(id).delete();
  }
  
}
