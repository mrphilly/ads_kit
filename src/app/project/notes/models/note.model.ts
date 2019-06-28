import { Collaborator } from './collaborator.model';

import { Todo } from './todo.model';

export class Note {
  id?: string;
  id_camapagne;
  title: string;
  description?: string;
  dueDate?: any;
  createdAt: any;
  createdBy?: any;
  photoURL: string;
  owner: string;
  archived?: boolean;
  todos?: Todo[];
  collaborators?: any[];
  sharedWith?: Collaborator[];
  isInvitaionFormEnabled?: boolean;
}
