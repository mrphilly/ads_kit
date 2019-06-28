import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { AuthService } from '../../../core/auth.service';
import { Note } from '../../models/note.model';


@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html'
})
export class NoteAddComponent implements OnInit {
  currentUser: any;
  isLoading: boolean;
  note: Note;
  noteForm: FormGroup;

  today: Date = new Date();
  private notesCollection: AngularFirestoreCollection<Note>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      dueDate: ['', { disabled: true }],
      location: ''
    });
   }

  ngOnInit() {
    this.notesCollection = this.afs.collection<Note>('notes');
    this.auth.authState$.subscribe(user => {
      this.currentUser = user;
    });
  }

  async onSubmit() {
    if (this.noteForm.valid) {
      this.isLoading = true;
      this.note = this.prepareSaveNote();
      const docRef = await this.notesCollection.add(this.note);

      this.redirectToNote({id: docRef.id, title: this.note.title});
    }
  }

  placeSelectedHandler(location) {
  
  }

  prepareSaveNote(): Note {
    const userDoc = this.afs.doc(`users/${this.currentUser.uid}`);
    const noteModel = this.noteForm.value;

    const newNote = {
      completed: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: userDoc.ref,
      isInvitaionFormEnabled: false,
      owner: this.currentUser.uid,
      photoURL: this.currentUser.photoURL,
      sharedWith: [{
        email: this.currentUser.email,
        photoURL: this.currentUser.photoURL,
        uid: this.currentUser.uid,
        owner: true
      }],
      collaborators: [this.currentUser.email]
    };

   

    return {...noteModel, ...newNote};
  }

  private redirectToNote(doc: any): any {
  }
}
