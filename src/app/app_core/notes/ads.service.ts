import { Injectable, OnInit, Self,  AfterViewInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';

import { AuthService } from '../../app_core/core/auth.service';

import { Annonces } from './annonces.models';
import Swal from 'sweetalert2'
import * as $ from 'jquery'

import { map } from 'rxjs/operators'
import * as moment from 'moment'
/* import { NoteDetailComponent } from './note-detail/note-detail.component' */

import {AngularFireDatabase} from '@angular/fire/database'

declare var require: any;
var _ = require('lodash');

@Injectable()
export class Ads {
  currentUser: any;
  uid: any;
  isLoading: boolean;
  annonce_model: Annonces;
  today: Date = new Date();
  item: any;
  campaign_id:string;
private basePath = '/uploads';
  private annonceCollection:
    AngularFirestoreCollection<Annonces>;
  
 

  constructor(private afs: AngularFirestore, private auth: AuthService, private http: HttpClient, private db: AngularFireDatabase) {
   
  }


 pushFileToStorage(annonces: Annonces, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${annonces.ad_name}`).put(annonces.url_ad);
 
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        annonces.url_ad = uploadTask.snapshot.downloadURL;
       
        this.saveFileData(annonces);
      }
    );
  }
 
  private saveFileData(annonces: Annonces) {
    this.db.list(`${this.basePath}/`).push(annonces);
  }

  
 getListAnnonces(ad_group_id: string) {
   console.log(parseInt(ad_group_id))
   
   
 return this.afs.collection('adgroup', (ref) => ref.where('campaign_id','==',parseInt(`${ad_group_id}`))).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );

    
  
  }
  

  annonceVerification(ad_name: string,  ad_group_id: string) {
    
     return new Promise(resolve => {
      setTimeout(() => {
        this.afs.collection('ads', (ref) => ref.where('ad_group_id', '==', parseInt(`${ad_group_id}`)).where('ad_name', '==', `${ad_name}`)).snapshotChanges().subscribe(data => {
          console.log(`data ${data}`)
          this.item = data
          resolve(data.length)
      })
      }, 2000);
    });
  }


  
  
  async addAd(ad_group_id: any, ad_name: any, image_ref: any) {
   
  
  
    return await this.annonceVerification(ad_name, ad_group_id).then(value => {
      console.log(`promise result: ${value}`)
      
      if (`${value}` == '0') {
        
        this.http.post('http://127.0.0.1:5000/addAd', {
       'ad_group_id': ad_group_id,
          'ad_image_ref': image_ref,
          'ad_name': ad_name,
          
    })
      .subscribe(
        res => {
          console.log(res)
          
         
        
      /*    this.createAd(res['id'], ad_group_id, ad_name, image_ref, res['status'], res['automated']).then(res=>{
            Swal.fire({
              title: 'Ajouter une annonce',
              text: 'Annonce ajoutée avec succès',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {}
            })
         }) */
          
        },
       /*  err => {
          Swal.fire({
          title: 'Ajouter une annonce',
          text: 'Erreur Service',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value){}
          })
        } */
      );

      } else{
        Swal.fire({
          title: 'Ajouter une nouvelle annonce',
          text: "Il éxiste déjà une annonce portant une des données renseignées !",
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


  prepareSaveAd(ad_id: any,ad_group_id: any, ad_name: any, image_ref: any, status: any, automated: any): Annonces {
    const userDoc = this.afs.doc(`users/${this.uid}`);
    const newAd = {
      ad_id: ad_id,
      ad_group_id: ad_group_id,
      status: status,
      ad_name: ad_name,
      automated: automated,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: userDoc.ref,
      owner: this.uid,  
      url_ad: image_ref
    };
    return {...newAd};
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    
    return this.annonceCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }







  getAd(id: string) {
    return this.afs.doc<any>(`ads/${id}`);
  }



  async createAd(ad_id: any, ad_group_id: any, ad_name: any, image_ref: any, status: any, automated: any) {
    this.annonce_model = this.prepareSaveAd(ad_id, ad_group_id, ad_name, image_ref, status, automated);
    const docRef = await this.afs.collection('ads').add(this.annonce_model);
  }

  updateAd(id: string, data: any) {
    return this.getAd(id).update(data);
  }

  deleteAdGroup(id: string) {
    return this.getAd(id).delete();
  }
  
}
