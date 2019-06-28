import { Injectable, OnInit, Self } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import * as firebase from 'firebase/app';

import { AuthService } from '../../app_core/core/auth.service';

import { Note } from './note.models';
import {map} from 'rxjs/operators'
import * as moment from 'moment'


@Injectable()
export class NotesService implements OnInit {
  currentUser: any;
  uid: any;
  isLoading: boolean;
  note: Note;
  today: Date = new Date();
  item: any;
  private notesCollection: AngularFirestoreCollection<Note>;


  constructor(private afs: AngularFirestore, private auth: AuthService, private http: HttpClient) {
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
         this.createCampaign(res['id'], name, res['status_campaign'], startDate, endDate, res['servingStatus']).then(res=>{
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

  


  prepareSaveCampaign(id: string, name: string, status: string, startDate: string, endDate: string, servingStatus: string): Note {
    const userDoc = this.afs.doc(`users/${this.uid}`);
      const newCampaign = {
      id_campagne: id,
      name: name,
        status: status,
      startDate: startDate,
        endDate: endDate,
      servingStatus: servingStatus,
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

  async createCampaign(id_campagne: string, name: string, status: string, startDate: string, endDate: string, servingSatus: string) {
    this.note = this.prepareSaveCampaign(id_campagne, name, status, startDate, endDate, servingSatus);
    const docRef = await this.notesCollection.add(this.note);
  }

  updateNote(id: string, data: any) {
    return this.getNote(id).update(data);
  }

  deleteNote(id: string) {
    return this.getNote(id).delete();
  }
  
}
