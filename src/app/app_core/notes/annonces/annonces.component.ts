import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import {AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

import * as $ from 'jquery';

import {
  Observable
} from 'rxjs';

import 'fabric';

import { NgxPicaService, NgxPicaErrorInterface } from 'ngx-pica';

import * as firebase from 'firebase';

import {
  NotesService
} from '../notes.service';
import {
  AuthService
} from '../../core/auth.service';

import { Ads } from '../ads.service'
import {Annonces} from '../annonces.models'


declare const fabric: any;

import {
  AdGroupService
} from '../ad-groupe.service'

import Swal from 'sweetalert2'


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  campagne_name: any;
  campagne_id: any;
  ad_group_id: any;
  criteria: any;
  adgroups: any;
  status: any;
  id: any;
  uid: any;
  ad_name: any;
  ages = []
  sexes = [];
  zones = [];
  devices = []
  ad_group_name: any;
  label_enabled = 'Actif'
  label_paused = "Non Actif"
  text_create = "Annonce"
  private basePath = '/uploads';
  progress: { percentage: number } = { percentage: 0 };
  test: any;
  public json: any;
  public globalEditor: boolean = false;
  public textEditor: boolean = false;
  public imageEditor: boolean = false;
  public figureEditor: boolean = false;
  public textString: string;
  public selected: any;
  public url: string = '';
  public size: any = {
    width: 300,
    height: 250
  };
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  constructor(private notesService: NotesService, private auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private adGroupService: AdGroupService, private adsService: Ads) {

  }
  dropdownListAges = [];
  dropdownListSexes = [];
  dropdownListZones = [];
  dropdownListDevices = [];
  selectedItems = [];
  dropdownSettingsAges = {};
  dropdownSettingsSexes = {};
  dropdownSettingsZones = {};
  dropdownSettingsDevices = {};
  text_visualise = "Visualiser votre annonce"
  text_no_genre = "Aucun genre ciblé"
  text_no_age = "Aucune tranche d'âge ciblée"
  text_no_devices = "Aucun appareils ciblé"
  text_cibled = "Genre(s) ciblé(s)"
  text_cibled_age = "Tranches d'âges ciblées"
  text_cibled_devices = "Appareils Ciblé(s)"
  modify_gender_text = "Modifier le ciblage des genres"
  modify_age_text = "Modifier le ciblage des âges"
  modify_devices_text = "Modifier le ciblage des appareils"
  text_option = "Paramètres du canvas"
  genres: any;
  populations: any;
  appareils: any;
  isCiblageGenre = false
  isCiblageAge = false
  isCiblageDevices = false
  isCreating = false


  public canvas: any;
  public props: any = {
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

    el = '<div class="card-body text-center">'+
'                        <div class="row">'+
''+
'                          '+
'              '+
'                              <div class="col-md-8">'+
'                            <div class="card-body">'+
'                              <ul class="list-group no-b text-center">'+
'                               <li class="list-group-item d-flex align-items-center" *ngIf="selected && selected.type != \'group\'">'+
'                                  <div>'+
'                                      <i class="icon icon-opacity purple-text"></i>'+
'                                  </div>'+
'                                   <div >'+
'                                        '+
'                                              <input type="range" class="range-slider form-control" [(ngModel)]="props.opacity" (change)="setOpacity()">'+
'                                         '+
'                                      </div>'+
'                              </li>'+
'                              '+
'                                <li class="list-group-item d-flex align-items-center"  *ngIf="selected && textEditor || selected && figureEditor">'+
'                                  <div>'+
'                                    <i class="icon icon-palette text-blue"></i>'+
'                                  </div>'+
'                                  <div>'+
''+
'                                    <input type="text" class="form-control" [cpPosition]="\'bottom\'"'+
'                                      [(colorPicker)]="props.fill" [style.background]="props.fill" [value]="props.fill"'+
'                                      (colorPickerChange)="setFill()" style="width: 55%; float: right">'+
''+
'                                  </div>'+
'                                </li>'+
'                                <li class="list-group-item d-flex align-items-center" *ngIf="selected && textEditor">'+
'                                  <div>'+
'                                    <i class="icon icon-format_size pink-text"></i>'+
'                                  </div>'+
'                                  <div >'+
'                                    <select class="custom-select select2" [(ngModel)]="props.fontFamily"'+
'                                      (change)="setFontFamily()" style="margin-left: 10px;" required>'+
'                                      <option value="arial">Arial</option>'+
'                                      <option value="helvetica" selected>Helvetica</option>'+
'                                      <option value="verdana">Verdana</option>'+
'                                      <option value="courier">Courier</option>'+
'                                      <option value="Roboto">Roboto</option>'+
'                                      <option value="Open Sans">Open Sans</option>'+
'                                      <option value="Zilla Slab">Zilla Slab</option>'+
'                                      <option value="Lato">Lato</option>'+
'                                      <option value="Bellefair">Bellefair</option>'+
'                                      <option value="Fresca">Fresca</option>'+
'                                      <option value="Raleway">Raleway</option>'+
'                                      <option value="Open Sans Condensed">Open Sans Condensed</option>'+
'                                      <option value="Indie Flower">Indie Flower</option>'+
'                                      <option value="Josefin Sans">Josefin Sans</option>'+
'                                      <option value="Inconsolata">Inconsolata</option>'+
'                                      <option value="Pacifico">Pacifico</option>'+
'                                      <option value="Gloria Hallelujah">Gloria Hallelujah</option>'+
'                                    </select>'+
'                                  </div>'+
'                                </li>'+
'                                <li class="list-group-item d-flex align-items-center" *ngIf="selected && textEditor">'+
'                                  <div>'+
'                                    <i class="icon icon-line_style text-green"></i>'+
'                                  </div>'+
'                                  <div>'+
''+
'                                    <ul class="social social list-inline" >'+
''+
'                                      <li class="list-inline-item"> <a class="btn-fab btn-fab-sm shadow btn-info"'+
'                                          [ngClass]="{\'active\': props.fontStyle }" (click)="setFontStyle()"><i'+
'                                            class="icon-format_italic"></i></a></li>'+
'                                      <li class="list-inline-item"> <a class="btn-fab btn-fab-sm shadow btn-info"'+
'                                          [ngClass]="{\'active\': hasTextDecoration(\'underline\') }"'+
'                                          (click)="setTextDecoration(\'underline\')"><i class="icon-underline"></i></a>'+
'                                      </li>'+
'                                      <li class="list-inline-item"> <a class="btn-fab btn-fab-sm shadow btn-info"'+
'                                          [ngClass]="{\'active\': props.fontWeight }" (click)="setBold()"><i'+
'                                            class="icon-bold"></i></a></li>'+
''+
'                                    </ul>'+
'                                  </div>'+
'                                </li>'+
''+
'                              </ul>'+
'                            </div>'+
'                            <div class="col-md-3">'+
''+
''+
''+
'                            </div>'+
'                            <div class="col image-block draggable" style="display: none">'+
'                              <div class="card b-0">'+
'                                <div class="card-body p-5">'+
'                                  <div class="card">'+
'                                    <div class="card-header">Upload image</div>'+
'                                    <div class="card-body text-center">'+
'                                      <img id="testImage" *ngIf="url" class="images-item-upload" [src]="url"'+
'                                        (click)="addImageOnCanvas(url);">'+
'                                      <input type="file" (change)="readUrl($event);" id="image">'+
'                                      <br />'+
'                                      <br />'+
'                                      <div class="btn-group btn-group-justified" role="group" aria-label="...">'+
'                                        <div class="btn-group" role="group">'+
'                                          <button type="button" class="btn btn-outline-danger btn-sm"'+
'                                            (click)="removeWhite(url);">'+
'                                            <i class="fa fa-times" aria-hidden="true"></i> Remove</button>'+
'                                        </div>'+
'                                      </div>'+
'                                    </div>'+
'                                  </div>'+
'                                </div>'+
'                              </div>'+
'                            </div>'+
'                          </div>'+
'            '+
'                        </div>'+
'                      </div>';
	

  popperContent = "<a class='btn-fab btn-fab-sm shadow btn-primary'><i class='icon-circle-o'></i></a>"
  popperTitle = "Paramètres"






  ngOnInit() {

    this.auth.user.subscribe(data => {
      this.uid = data.uid
    })
    var canvas = document.querySelector('#canvas')
    this.canvas = new fabric.Canvas(canvas, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });

    this.canvas.on({
      'object:moving': (e) => {},
      'object:modified': (e) => {},
      'object:selected': (e) => {

        let selectedObject = e.target;
        this.selected = selectedObject
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        // selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

        this.resetPanels();

        if (selectedObject.type !== 'group' && selectedObject) {

          this.getId();
          this.getOpacity();

          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              this.getFill();
              break;
            case 'i-text':
              this.textEditor = true;
              this.getLineHeight();
              this.getCharSpacing();
              this.getBold();
              this.getFontStyle();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              break;
            case 'image':
              console.log('image');
              break;
          }
        }
      },
      'selection:cleared': (e) => {
        this.selected = null;
        this.resetPanels();
      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);

    // get references to the html canvas element & its context
    // this.canvas.on('mouse:down', (e) => {
    // let canvasElement: any = document.getElementById('canvas');
    // console.log(canvasElement)
    // });

    this.route.params.subscribe(params => {
      this.ad_group_name = params['name']
      this.campagne_id = params['campaign_id']
      this.ad_group_id = params['ad_group_id']
      this.id = params['id']


      // In a real app: dispatch action to load the details here.
    });
    this.adgroups = this.adGroupService.getAdGroup(this.id).valueChanges().subscribe(res => {
      this.status = res['status']
      this.genres = res['sexes']
      this.populations = res['ages']
      this.appareils = res['devices']
      console.log('populations')
      /* console.log(this.genres) */
      console.log(this.populations)
    })

    this.dropdownListAges = [{
        item_id: 503999,
        item_text: 'indéterminé'
      },
      {
        item_id: 503001,
        item_text: '18-24 ans'
      },
      {
        item_id: 503002,
        item_text: '25-34 ans'
      },
      {
        item_id: 503003,
        item_text: '35-44 ans'
      },
      {
        item_id: 503004,
        item_text: '45-54 ans'
      },
      {
        item_id: 503005,
        item_text: '55-64 ans'
      },
      {
        item_id: 503006,
        item_text: '+64 ans'
      }
    ];
    this.dropdownListSexes = [{
        item_id: 20,
        item_text: 'indéterminé'
      },
      {
        item_id: 10,
        item_text: 'Hommes'
      },
      {
        item_id: 11,
        item_text: 'Femmes'
      },
    ];
    this.dropdownListDevices = [{
        item_id: 30000,
        item_text: 'Ordinateurs'
      },
      {
        item_id: 30001,
        item_text: 'Mobiles'
      },
      {
        item_id: 30002,
        item_text: 'Tablettes'
      },
      {
        item_id: 30004,
        item_text: "Tv Connectée"
      }
    ];
    this.dropdownListZones = [{
      item_id: 9070424,
      item_text: 'Dakar'
    }, ];
    this.dropdownSettingsAges = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'annuler',
      itemsShowLimit: 8,
      allowSearchFilter: false,
      searchPlaceholderText: 'Rechercher',

    };
    this.dropdownSettingsSexes = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Rechercher',

    };
    this.dropdownSettingsZones = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Rechercher',

    };
    this.dropdownSettingsDevices = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'annuler',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      searchPlaceholderText: 'Rechercher',

    };
    //setup front side canvas
 


  }

  popperClick() {
$('#popper').trigger('click')
   
  }

  openAddCiblageGenre() {
    this.isCiblageGenre = true;

  }
  openAddCiblageDevices() {
    this.isCiblageDevices = true;

  }
  targetGender() {
    console.log(this.sexes)
    this.isCreating = true
    if (this.sexes.length == 0) {
      this.isCreating = false
      Swal.fire({
        title: 'Ciblage',
        text: 'Aucun genre séléctionné',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {}

      })
    } else {
      this.adGroupService.targetGenre(this.id, this.campagne_id, this.ad_group_id, this.sexes).then(res => {
        this.sexes = []
      }).then(res => {
        this.isCiblageGenre = false
        this.isCreating = false
      })

    }
  }

  targetDevices() {
    console.log(this.devices)
    this.isCreating = true
    if (this.devices.length == 0) {
      this.isCreating = false
      Swal.fire({
        title: 'Ciblage',
        text: 'Aucun appareil séléctionné',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {}
      })
    } else {
      this.adGroupService.targetDevices(this.id, this.campagne_id, this.ad_group_id, this.devices).then(res => {
        this.devices = []
      }).then(res => {
        this.isCreating = false
        this.isCiblageDevices = false

      })

    }
  }

  closeAddCiblageGenre() {
    this.isCiblageGenre = false
  }
  closeAddCiblageDevices() {
    this.isCiblageDevices = false
  }


  openAddCiblageAge() {
    this.isCiblageAge = true;

  }
  targetAge() {
    console.log(this.ages)
    this.isCreating = true
    if (this.ages.length == 0) {
      this.isCreating = false
      Swal.fire({
        title: 'Ciblage',
        text: 'Aucun genre séléctionné',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {}
      })
    } else {
      this.adGroupService.targetAge(this.id, this.campagne_id, this.ad_group_id, this.ages).then(res => {
        this.ages = []
      }).then(res => {
        this.isCiblageAge = false
        this.isCreating = false

      })

    }
  }

  closeAddCiblageAges() {
    this.isCiblageAge = false
  }

  onAgeSelect(item: any) {
    this.ages.push(item)
    console.log(this.ages)
  }
  onAgeSelectAll(items: any) {
    console.log(items);
    this.ages = []
    this.ages = items
  }
  onAgeDeSelect(item: any) {
    console.log(item)
    for (var i = 0; i < this.ages.length; i++) {
      if (this.ages[i]['item_id'] == item.item_id) {
        this.ages.splice(i, 1)
      }
    }
    console.log(this.ages)

  }
  onDeSelectAllAge() {
    this.ages = []
    console.log(this.ages)
  }



  onDevicesSelect(item: any) {
    this.devices.push(item)
    console.log(this.devices)
  }
  onDevicesSelectAll(items: any) {
    console.log(items);
    this.devices = []
    this.devices = items
  }
  onDevicesDeSelect(item: any) {
    console.log(item)
    for (var i = 0; i < this.devices.length; i++) {
      if (this.devices[i]['item_id'] == item.item_id) {
        this.devices.splice(i, 1)
      }
    }
    console.log(this.devices)

  }
  onDeSelectAllDevices() {
    this.devices = []
    console.log(this.devices)
  }

  onSexeSelect(item: any) {
    this.sexes.push(item)
    console.log(this.sexes)
  }
  onSexeSelectAll(items: any) {
    console.log(items);
    this.sexes = []
    this.sexes = items
  }
  onSexeDeSelect(item: any) {
    console.log(item)
    for (var i = 0; i < this.sexes.length; i++) {
      if (this.sexes[i]['item_id'] == item.item_id) {
        this.sexes.splice(i, 1)
      }
    }
    console.log(this.sexes)

  }
  onDeSelectAllSexe() {
    this.sexes = []
    console.log(this.sexes)
  }

  onZoneSelect(item: any) {
    this.zones.push(item)
    console.log(this.zones)
  }
  onZoneSelectAll(items: any) {
    console.log(items);
  }
  onZoneDeSelect(item: any) {
    console.log(item)
    for (var i = 0; i < this.zones.length; i++) {
      if (this.zones[i]['item_id'] == item.item_id) {
        this.zones.splice(i, 1)
      }
    }
    console.log(this.zones)

  }
  onDeSelectAllZone() {
    this.zones = []
    console.log(this.zones)
  }


  changeSize(event: any) {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  //Block "Add text"

  addText() {
    let textString = 'Double cliquez ici'
    let text = new fabric.IText(textString, {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.selectItemAfterAdded(text);
    this.textString = '';
  }

  //Block "Add images"

  getImgPolaroid(event: any) {
    let el = event.target;
    fabric.Image.fromURL(el.src, (image) => {
      image.set({
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        cornersize: 10,
        hasRotatingPoint: true,
        peloas: 12
      });
      image.setWidth(150);
      image.setHeight(150);
      this.extend(image, this.randomId());
      this.canvas.add(image);
      this.selectItemAfterAdded(image);
    });
  }

  //Block "Upload Image"

  addImageOnCanvas(url) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true
        });
        image.setWidth(200);
        image.setHeight(200);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target['result'];

        this.addImageOnCanvas(event.target['result'])
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url) {
    this.url = '';
  };

  //Block "Add figure"

  addFigure(figure) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200,
          height: 100,
          left: 10,
          top: 10,
          angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100,
          height: 100,
          left: 10,
          top: 10,
          angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100,
          height: 100,
          left: 10,
          top: 10,
          fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50,
          left: 10,
          top: 10,
          fill: '#ff5722'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
  }

  /*Canvas*/

  cleanSelect() {
    this.canvas.deactivateAllWithDispatch().renderAll();
  }

  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
    
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  }

  extend(obj, id) {
    obj.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id
        });
      };
    })(obj.toObject);
  }

  setCanvasImage() {
    let self = this;
    if (this.props.canvasImage) {
      this.canvas.setBackgroundColor({
        source: this.props.canvasImage,
        repeat: 'repeat'
      }, function () {
        // self.props.canvasFill = '';
        self.canvas.renderAll();
      });
    }
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  /*------------------------Global actions for element------------------------*/

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing) ?
      (object.getSelectionStyles()[styleName] || '') :
      (object[styleName] || '');
      
  }


  setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
      var style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    } else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  getActiveProp(name) {
    var object = this.canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
  }

  setActiveProp(name, value) {
    var object = this.canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  clone() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({
          left: 10,
          top: 10
        });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
  }

  setId() {
    let val = this.props.id;
    let complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }

  getOpacity() {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity() {
    this.setActiveStyle('opacity', parseInt(this.props.opacity) / 100, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  getLineHeight() {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize), null);
  }

  getBold() {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
  }

  getFontStyle() {
    this.props.fontStyle = this.getActiveStyle('fontStyle', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
  }


  getTextDecoration() {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, "g"), "");
    } else {
      iclass += ` ${value}`
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  hasTextDecoration(value) {
    return this.props.TextDecoration.includes(value);
  }


  getTextAlign() {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }

  /*System*/


  removeSelected() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    } else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      let self = this;
      objectsInGroup.forEach(function (object) {
        self.canvas.remove(object);
      });
    }
  }

  bringToFront() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.bringToFront();
      // activeObject.opacity = 1;
    } else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }

  sendToBack() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.sendToBack();
      // activeObject.opacity = 1;
    } else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }

  confirmClear() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
    }
  }

  rasterize() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    } else {
      console.log(this.canvas.toDataURL('png'))
      //window.open(this.canvas.toDataURL('png'));
      var image = new Image();
      image.src = this.canvas.toDataURL('png')
      var w = window.open("");
      w.document.write(image.outerHTML);
    }
  }


  saveImage() {
    
   /*  var storage = firebase.storage(); */
    var storage = firebase.app().storage("gs://comparez.appspot.com/");
    var storageRef = storage.ref();
    this.ad_name=$('#ad_name').val()
    var imageRefStorage = this.uid + "/" + this.ad_name + new Date().getTime().toString()+ ".png"
    var imagesRef = storageRef.child(imageRefStorage);
    var metadata = {
  contentType: 'image/png',
};
    
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    } else {
      /* console.log(this.canvas.toDataURL('png')) */
      //window.open(this.canvas.toDataURL('png'));
      this.ad_name = $("#ad_name").val()
      $('#ad_image').attr("src", this.canvas.toDataURL('png'))
      console.log(this.canvas.toDataURL('png'))
      this.canvas.toDataURL('png').replace('data:image/png;base64,', '')
      console.log(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''))
     imagesRef.putString(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function(snapshot) {
         
       console.log('Uploaded a base64 string!');
       
     }); 
      this.adsService.addAd(this.ad_group_id, this.ad_name, imageRefStorage).then(res => {
        console.log('success')
      })
       
     
     
    
    }
  }

  
 
  

  rasterizeSVG() {
    console.log(this.canvas.toSVG())
    // window.open(
    //   'data:image/svg+xml;utf8,' +
    //   encodeURIComponent(this.canvas.toSVG()));
    // console.log(this.canvas.toSVG())
    // var image = new Image();
    // image.src = this.canvas.toSVG()
    var w = window.open("");
    w.document.write(this.canvas.toSVG());
  };


  saveCanvasToJSON() {
    let json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
    console.log('json');
    console.log(json);

  }

  loadCanvasFromJSON() {
    let CANVAS = localStorage.getItem('Kanvas');
    console.log('CANVAS');
    console.log(CANVAS);

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      console.log('CANVAS untar');
      console.log(CANVAS);

      // making sure to render canvas at the end
      this.canvas.renderAll();

      // and checking if object's "name" is preserved
      console.log('this.canvas.item(0).name');
      console.log(this.canvas);
    });

  };

  rasterizeJSON() {
    this.json = JSON.stringify(this.canvas, null, 2);
  }

  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }

  triggerText() {
    this.addText()
    $(".text-block").css("display", "block")
    $(".tools").css("display", "block")
  }

  triggerImage() {
    $("#image").trigger("click")
    $(".tools").css("display", "block")
  }

  triggerFigure() {
    $(".figure-block").css("display", "block")
    $(".tools").css("display", "block")
  }

  closeFigure() {
    $(".figure-block").css("display", "none")
  }

  textRemove() {
    $(".text-block").css("display", "none")
  }

 calculateAspectRatio(image, canvas) {
    var imageAspectRatio = image.width / image.height;
    var canvasAspectRatio = canvas.width / canvas.height;
   var renderableHeight, renderableWidth, xStart, yStart;
   
   /* var AspectRatio = new Object(); */
   var AspectRatio = []
    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = image.width * (renderableHeight / image.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width;
        renderableHeight = image.height * (renderableWidth / image.width);
        xStart = 0;
        yStart = (canvas.width - renderableHeight) / 2;
    }

    //keep aspect ratio
    else {
        renderableHeight = canvas.height;
        renderableWidth = canvas.width;
        xStart = 0;
        yStart = 0;
    }
   AspectRatio.push({
     "renderableHeight": renderableHeight,
     "renderableWidth": renderableWidth,
     "startX": xStart,
     "startY": yStart
   })
   
    return AspectRatio;
}
  

  //Block "Size"


}
