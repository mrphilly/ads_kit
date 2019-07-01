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
   console.log(parseInt(campaign_id))
   
   
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
    console.log(`owner: ${user_id}, name: ${name}, campaign_id: ${id_campaign}`)
     return new Promise(resolve => {
      setTimeout(() => {
        this.afs.collection('adgroup', (ref) => ref.where('campaign_id', '==', parseInt(`${id_campaign}`)).where('name', '==', `${name}`).where('owner', '==', `${user_id}`)).snapshotChanges().subscribe(data => {
          console.log(`data ${data}`)
          this.item = data
          resolve(data.length)
      })
      }, 2000);
    });
  }
  
  async addAdGroup(campaign_id: any, user_id: string, name: string) {
    console.log(`User id: ${user_id}`)
  
  
    return await this.addGroupVerification(user_id, name, campaign_id).then(value => {
      console.log(`promise result: ${value}`)
      
      if (`${value}` == '0') {
        
        this.http.post('http://127.0.0.1:5000/addAdGroup', {
       'ad_group_name': name,
       'campaign_id': campaign_id
    })
      .subscribe(
        res => {
          console.log(res)
         
        
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
              if (result.value) {}
            })
         })
          
        },
        err => {
          Swal.fire({
          title: 'Ajouter un nouveau groupe',
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


  prepareSaveAdGroup(campaign_id: string, name: string, status: string, ad_group_id: string): AdGroup {
    const userDoc = this.afs.doc(`users/${this.uid}`);
    const newAdGroup = {
       campaign_id: campaign_id,
       ad_group_id: ad_group_id,
      name: name,
      status: status,
          ages: [],
          sexes: [],
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

  updateAdgroup(id: string, data: any) {
    return this.getAdGroup(id).update(data);
  }

  deleteAdGroup(id: string) {
    return this.getAdGroup(id).delete();
  }
  
}
