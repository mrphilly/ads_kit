import { Injectable, OnInit, Self, Optional } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import * as firebase from 'firebase/app';

import { AuthService } from '../../app_core/core/auth.service';

import { Note } from './note.models';
import {map} from 'rxjs/operators'
import * as moment from 'moment'

import { AdGroupService } from './ad-groupe.service'
import {Ads} from './ads.service'


@Injectable()
export class NotesService implements OnInit {
  currentUser: any;
  uid: any;
  isLoading: boolean;
  note: Note;
  today: Date = new Date();
  item: any;
  text_error_date = "Cette campagne a déjà commencé"
  error_end_date = "Date invalide ou campagne déjà terminée"
  private notesCollection: AngularFirestoreCollection<Note>;
  
 
  
   

  constructor(private auth: AuthService, private afs: AngularFirestore, private http: HttpClient,  private adGroupService: AdGroupService, private adsService : Ads) {
    this.auth.user.forEach(child => {
      this.uid =child.uid
      this.notesCollection = this.afs.collection('notes', (ref) => ref.where('owner', '==', child.uid)); 
    })
  }
  ngOnInit() { 

  }

  campaignVerification(user_id: string, name: string) {
     return new Promise(resolve => {
      setTimeout(() => {
        this.afs.collection('notes', (ref) => ref.where('owner', '==', `${user_id}`).where('name', '==', `${name}`)).snapshotChanges().subscribe(data => {
          this.item = data
          resolve(data.length)
      })
      }, 2000);
    });
  }

  
  
  async addCampaign(email: string, user_id: string, name: string) {
 
    return await this.campaignVerification(user_id, name).then(value => {
      console.log(`promise result: ${value}`)

      if (`${value}` == '0') {
        
        this.http.post('http://127.0.0.1:5000/addCampaign', {
       'email': email,
       'campaign_name': name
    })
      .subscribe(
        res => {
          console.log(res)
         
          var startDate = moment(res['startDate'], "YYYYMMDD").fromNow()
          var endDate = moment(res['endDate'], "YYYYMMDD").fromNow()
         this.createCampaign(res['id'], name, res['status_campaign'], res['startDate'], res['endDate'], res['startDateFrench'], res['endDateFrench'], res['servingStatus'], res['budgetId']).then(res=>{
            Swal.fire({
              title: 'Ajouter une nouvelle campagne',
              text: 'Campagne ajoutée avec succès',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {}
            })
         })
          
        },
        err => {
          Swal.fire({
          title: 'Ajouter une nouvelle campagne',
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        }
      );

      } else{
        Swal.fire({
          title: 'Ajouter une nouvelle campagne',
          text: 'Cette camapagne exite déjà',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        
      }
    })
   
  }
    targetLocation(id: string, campaign_id: string, name: string, location: any) {
 
    return this.getCampaignZones(campaign_id, name).then(value => {
      console.log(`promise result: ${value}`)

      
        
        this.http.post('http://127.0.0.1:5000/targetLocation', {
       'campaign_id': campaign_id,
       'location_id': location[0].item_id
    })
      .subscribe(
        res => {
          console.log(`res from location backend: ${res}`)
          this.updateNote(id, {zones: location })
        },
        err => {
          Swal.fire({
          title: 'Ciblage',
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
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
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        
      } */
    })
   
  }
  getListCampaign(uid: any) {
   
   
   console.log(uid)
 return this.afs.collection('notes', (ref) => ref.where('owner','==',`${uid}`)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );

    
  
  }
  updateTargetLocation(id: string, campaign_id: string, name: string, location: any) {
 
    return this.getCampaignZones(campaign_id, name).then(value => {
      

      console.log(`promise result: ${value['item_id']}`)
      console.log(`location id from me ${location[0].item_id}`)
      console.log(`location id from firestore ${value[0].item_id}`)
      
        
        this.http.post('http://127.0.0.1:5000/updateLocation', {
          'campaign_id': campaign_id,
          'previous_location': value[0].item_id,
          'location_id': location[0].item_id
       
    })
      .subscribe(
        res => {
          console.log(`res from location backend: ${res}`)
          this.updateNote(id, {zones: location })
        },
        err => {
          Swal.fire({
          title: 'Ciblage',
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
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
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        
      } */
    })
   
  }


  getSingleCampaign(campaign_id: string, name: string) {
    
   
 return this.afs.collection('notes', (ref) => ref.where('name', '==', `${name}`).where('owner', '==', this.uid).where('id_campagne','==',parseInt(`${campaign_id}`))).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );

    
  
  }

  getCampaignZones(campaign_id: string, name: string) {
    return new Promise(resolve => {
        setTimeout(() => {
       
          this.afs.collection('notes', (ref) => ref.where('name', '==', `${name}`).where('owner', '==', this.uid).where('id_campagne', '==', parseInt(`${campaign_id}`))).valueChanges().subscribe(el => {
            console.log(el[0]['zones'])
          resolve(el[0]['zones'])
        })
      }, 2000);
    });
  }
  
  getCampaignDates(campaign_id: string, name: string){
      return new Promise(resolve => {
        setTimeout(() => {
       
          this.afs.collection('notes', (ref) => ref.where('name', '==', `${name}`).where('owner', '==', this.uid).where('id_campagne', '==', parseInt(`${campaign_id}`))).valueChanges().subscribe(el => {
            console.log(el)
          resolve(el[0])
        })
      }, 2000);
    });
  }

  
  updateStartDate(id: string, campaign_id: string, startDate: string, startDateFrench: string) {
      return      this.http.post('http://127.0.0.1:5000/upDateCampaignStartDate', {
       'campaign_id': campaign_id,
       'startDate': startDate
    })
      .subscribe(
        res => {
          console.log(res)
         
         
        this.updateNote(id, {startDate: res[0]['startDate'], startDateFrench: startDateFrench, servingStatus: res[0]['servingStatus']}).then(res=>{
           /*  Swal.fire({
              title: 'Modification date de début',
              text: 'Date de début modifiée',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {}
            }) */
         })
          
        },
        err => {
          Swal.fire({
          title: 'Modification date de début',
          text: this.text_error_date,
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        }
      );
  }
  
    updateEndDate(id: string, campaign_id: string, endDate: string, endDateFrench: string) {
       return     this.http.post('http://127.0.0.1:5000/upDateCampaignEndDate', {
       'campaign_id': campaign_id,
       'endDate': endDate
    })
      .subscribe(
        res => {
          console.log(res)
         
         
        this.updateNote(id, {endDate: res[0]['endDate'], endDateFrench: endDateFrench, servingStatus: res[0]['servingStatus']}).then(res=>{
           /*  Swal.fire({
              title: 'Modification date de fin',
              text: 'Date de fin modifiée',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {}
            }) */
         })
          
        },
        err => {
          Swal.fire({
          title: 'Modification date de fin',
          text: this.error_end_date,
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        }
      );
  }


  getCampaignRealTimeData(id, campaign_id: string) {
          return      this.http.post('http://127.0.0.1:5000/getCampaignData', {
       'campaign_id': campaign_id,
    
    })
      .subscribe(
        res => {
          
        /* console.log(res[0]['name']) */
          console.log(res[0]['servingStatus'])
          this.getSingleCampaign(campaign_id, res[0]['name']).subscribe(data => {
            if (data[0]['servingStatus'] != res[0]['servingStatus']) {
              if (res[0]['servingStatus'] == null) {
                this.updateNote(id, {servingStatus:  'None'})
                
              } else {
                 this.updateNote(id, {servingStatus: res[0]['servingStatus']})
              }
            }
              
              
            
          })
        
          
         
        
          
        },
        err => {
        
        }
      );
  }

  


  prepareSaveCampaign(id: any, name: string, status: string, startDate: string, endDate: string, startDateFrench: string, endDateFrench: string ,servingStatus: string, budgetId: any): Note {
    const userDoc = this.afs.doc(`users/${this.uid}`);
      const newCampaign = {
      id_campagne: id,
      name: name,
        status: status,
      startDate: startDate,
        endDate: endDate,
        startDateFrench: startDateFrench,
        endDateFrench: endDateFrench,
        servingStatus: servingStatus,
        account_money: 0, 
      budgetId: budgetId,
      zones: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: userDoc.ref,
      owner: this.uid,  
    };
    return {...newCampaign};
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.notesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }







  getNote(id: string) {
    return this.afs.doc<any>(`notes/${id}`);
  }

  async createTarget(id: string, data: any) {
      return this.getNote(id).update(data);
  }

  async createCampaign(id_campagne: any, name: string, status: string, startDate: string,endDate: string, startDateFrench: string, endDateFrench: string, servingSatus: string, budgetId: any) {
    this.note = this.prepareSaveCampaign(id_campagne, name, status, startDate, endDate, startDateFrench, endDateFrench, servingSatus, budgetId);
    const docRef = await this.notesCollection.add(this.note);
  }

  updateNote(id: string, data: any) {
    return this.getNote(id).update(data);
  }

  deleteNote(id: string, ad_groups_list_id: any, ads_list_id: any) {
    console.log(ad_groups_list_id.length)
    console.log(ads_list_id.length)

    console.log(ad_groups_list_id)
    console.log(ads_list_id)
    if (ad_groups_list_id.length == 0) {
      console.log("pas de groupe , pas d'annonce")
          return this.getNote(id).delete()

    } else if (ad_groups_list_id.length == 1) {
              console.log("un groupe d'annonce")
      if (ads_list_id.length == 0) {
        console.log("groupe d'annonce n'a aucune annonce")
        this.deleteAdGroupList(ad_groups_list_id).then(res => {
          if(res=="ok"){
            return this.getNote(id).delete()

          }
        })
      } else {
         console.log(`ads list len ${ads_list_id.length}`)
        console.log("groupe d'annonce a plusieurs annonces")
         this.deleteAdList(ads_list_id).then(res => {
          this.deleteAdGroupList(ad_groups_list_id).then(res => {
          return this.getNote(id).delete()
         
          })
        })
      }
    
      
     
    } else if (ad_groups_list_id.length > 1) {
      console.log('plusieurs groupes')
      if (ads_list_id.length == 0) {
         this.deleteAdGroupList(ad_groups_list_id).then(res => {
          return this.getNote(id).delete()
         
          })
      } else {
        
        this.deleteAdList(ads_list_id).then(res => {
             this.deleteAdGroupList(ad_groups_list_id).then(res => {
             return this.getNote(id).delete()
            
             })
           })
      }
    } 
  }

  deleteAdList(ads_list_id: any): Promise<any> {
    return new Promise(resolve => {
      if (ads_list_id.length == 1) {
          
        this.adsService.deleteAd(ads_list_id[0]).then(res => {
          
          resolve('ok')
        })
        
          
        }else {
         let i = 0
         console.log('groupe')
         console.log(ads_list_id)
         for (let i = 0; i < ads_list_id.length; i++){
             console.log('removing')
            this.adsService.deleteAd(ads_list_id[i]).then(res => {
          
          resolve('ok')
        })
         }
       
      }
      
    })
  }
   deleteAdGroupList(ad_groups_list_id: any): Promise<any> {
     return new Promise(resolve => {
       if (ad_groups_list_id.length == 1) {
         this.adGroupService.deleteAdGroup(ad_groups_list_id[0]).then(res => {
           
             
           resolve('ok')
         })
          
        }else {
         let i = 0
         console.log('groupe')
         console.log(ad_groups_list_id)
         for (let i = 0; i < ad_groups_list_id.length; i++){
             console.log('removing')
            this.adGroupService.deleteAdGroup(ad_groups_list_id[i]).then(res => {
              resolve('ok')
           
            })
         }
       
      }
       
      
    })
  }
  
}
