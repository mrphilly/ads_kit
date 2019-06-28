import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../auth/auth.service';
import 'fabric';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
;
import { Router } from '@angular/router'
declare const fabric: any;

export interface Item { id_campaign: string, nom: string; }

@Component({
  moduleId: module.id,
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  profile: any;
  campaign: any;
  public uid: string;
  
  


  constructor(private auth: AuthService, private db: AngularFireDatabase, private router: Router) {
   
       
   
}


   private canvas: any;
  private props: any = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: ''
  };

  private textString: string;
  private url: string = '';
  private size: any = {
    width: 300,
    height: 400
  };

  private json: any;
  private globalEditor: boolean = false;
  private textEditor: boolean = false;
  private imageEditor: boolean = false;
  private figureEditor: boolean = false;
  private selected: any;




  ngOnInit() {

    //setup front side canvas
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });
    
   




  }


 
 sendUser(email) {
   
        var data = {
                  'email': email
                }
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:5000/addUser",
                    datatype: "json",
                    contentType: 'application/json',
                    success: function (response) {
                        console.log(response)

                  },
                  error: function(err) {
                      console.log(err)
                    },

                    data: JSON.stringify(data),
                });
 }
  goCampaign(id: string) {
     this.router.navigate(['/campaign', id]);
  }
  addCampaign() {
  
 
  }




 



}
