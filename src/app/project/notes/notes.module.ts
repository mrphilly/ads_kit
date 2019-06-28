import { NgModule } from '@angular/core';



import { NotesRoutingModule } from './notes-routing.module';
import { CommonModule } from '@angular/common';  

import { NoteAddComponent } from './components/note-add/note-add.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteComponent } from './components/note/note.component';
import { TodosComponent } from './components/todos/todos.component';
import { NoteCollaboratorsComponent } from './components/note-collaborators/note-collaborators.component';
import { SharedWithComponent } from './components/shared-with/shared-with.component';



@NgModule({
  imports: [

    NotesRoutingModule,
    CommonModule

   
  ],
  declarations: [
    NotesListComponent,
    NoteAddComponent,
    NoteComponent,
    TodosComponent,
    NoteCollaboratorsComponent,
    SharedWithComponent,

  ]
})
export class NotesModule { }
