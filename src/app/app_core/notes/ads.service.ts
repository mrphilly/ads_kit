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

  private annonceCollection:
    AngularFirestoreCollection<Annonces>;
  
 

  constructor(private afs: AngularFirestore, private auth: AuthService, private http: HttpClient) {
   
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
  

  annonceVerification(shortHeadline: string, longHeadline: string,  ad_group_id: string) {
    
     return new Promise(resolve => {
      setTimeout(() => {
        this.afs.collection('ads', (ref) => ref.where('ad_group_id', '==', parseInt(`${ad_group_id}`)).where('shortHeadline', '==', `${name}`).where('owner', '==', `${shortHeadline}`).where('longHeadline', '==', `${longHeadline}`)).snapshotChanges().subscribe(data => {
          console.log(`data ${data}`)
          this.item = data
          resolve(data.length)
      })
      }, 2000);
    });
  }


  
  
  async addAd(ad_group_id: any, shortHeadline: any, longHeadline: any, description: any,  url_destination: any, finalUrls: any, marketingImage: any) {
   
  
  
    return await this.annonceVerification(shortHeadline, longHeadline, ad_group_id).then(value => {
      console.log(`promise result: ${value}`)
      
      if (`${value}` == '0') {
        
        this.http.post('http://127.0.0.1:5000/addAd', {
       'ad_group_id': ad_group_id,
          'shorHeadline': shortHeadline,
          'longHeadline': longHeadline,
          'description': description,
          'marketing_image': marketingImage,
          'url_destination': url_destination,
          'finalUrls': finalUrls
          
    })
      .subscribe(
        res => {
          
         
        
         this.createAd(res['id'], ad_group_id, shortHeadline, longHeadline, description, url_destination, finalUrls, marketingImage, status, res['automated']).then(res=>{
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
         })
          
        },
        err => {
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
        }
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


  prepareSaveAd(ad_id: any, ad_group_id: any, shortHeadline: any, longHeadline: any, description: any, url_destination: any, finalUrls: any, marketingImage: any, status: any, automated: any): Annonces {
    const userDoc = this.afs.doc(`users/${this.uid}`);
    const newAd = {
      ad_id: ad_id,
      ad_group_id: ad_group_id,
      shortHeadline: shortHeadline,
      longHeadline: longHeadline,
      description: description,
      status: status,
      url_destination: url_destination,
      finalUrls: finalUrls,
      marketingImage: marketingImage,
      logoImage: '',
      squareMarketingImage: '',
      businessName: '',
      url_ad: '',
      finalMobileUrls: '',
      automated: automated,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: userDoc.ref,
      owner: this.uid,  
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



  async createAd(ad_id: any, ad_group_id: any, shortHeadline: any, longHeadline: any, description: any, url_destination: any, finalUrls: any, marketingImage: any, status: any, automated: any) {
    this.annonce_model = this.prepareSaveAd(ad_id, ad_group_id, shortHeadline, longHeadline, description, url_destination, finalUrls, marketingImage, status, automated);
    const docRef = await this.afs.collection('ads').add(this.annonce_model);
  }

  updateAd(id: string, data: any) {
    return this.getAd(id).update(data);
  }

  deleteAdGroup(id: string) {
    return this.getAd(id).delete();
  }
  
}
