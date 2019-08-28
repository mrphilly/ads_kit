import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import {AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { s } from '@angular/core/src/render3';
import {
  ActivatedRoute, Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';

import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

import * as $ from 'jquery';

import {
  Observable
} from 'rxjs';

import 'fabric';

import { NgxPicaService, NgxPicaErrorInterface } from 'ngx-pica';

import * as firebase from 'firebase';

import {Font} from 'ngx-font-picker';

import {ColorPickerService} from 'ngx-color-picker';

import {
  NotesService
} from '../notes.service';
import {
  AuthService
} from '../../core/auth.service';


import Swal from 'sweetalert2'
import { Ads } from '../ads.service'
import { AdGroupService } from '../ad-groupe.service'
import { SERVER } from '../../../../environments/environment'
import * as chart from "chart.js/dist/Chart.min"
/* 
import Swal from 'sweet//alert2'
import { Ads } from '../ads.service'
import {AdGroupService} from '../ad-groupe.service' */

type AdsFields = 'name' | 'finalUrls';
type FormErrors = { [u in AdsFields]: string };

declare const fabric: any
declare const pQuery: any
declare const PayExpresse: any
declare const require: any;
declare const Chart: any;
declare const particlesJS: any;

const SERVER_URL = SERVER.url
const REDIRECT_URL = SERVER.url_redirect
const MONTH = [{
  "Jan": {
    "name": "January",
    "short": "Jan",
    "number": '01',
    "days": '31'
  },
  "Feb": {
    "name": "February",
    "short": "Feb",
    "number": '2',
    "days": '28'
  },
  "Mar": {
    "name": "March",
    "short": "Mar",
    "number": '03',
    "days": '31'
  },
  "Apr": {
    "name": "April",
    "short": "Apr",
    "number": '04',
    "days": '30'
  },
  "May": {
    "name": "May",
    "short": "May",
    "number": '05',
    "days": '31'
  },
  "Jun": {
    "name": "June",
    "short": "Jun",
    "number": '06',
    "days": '30'
  },
  "Jul": {
    "name": "July",
    "short": "Jul",
    "number": '07',
    "days": '31'
  },
  "Aug": {
    "name": "August",
    "short": "Aug",
    "number": '08',
    "days": '31'
  },
  "Sep": {
    "name": "September",
    "short": "Sep",
    "number": '09',
    "days": '30'
  },
  "Oct": {
    "name": "October",
    "short": "Oct",
    "number": '10',
    "days": '31'
  },
  "Nov": {
    "name": "November",
    "short": "Nov",
    "number": '11',
    "days": '30'
  },
  "Dec": {
    "name": "December",
    "short": "Dec",
    "number": '12',
    "days": '31'
  }
}]


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
  

  
export class AnnoncesComponent implements OnInit, AfterViewInit {
   public CURRENCY: string;
  public NUMERIC: string;
  public ALPHABET: string;
  public PATTERN: string;
  public COMMA: string;
    notificationAccountValue = "";
  numberOfNotifications = 0
  url_errors = [];
  reload_url = ""
  adForm: FormGroup;
  FINAL_ARRAY_TO_SEND =  [];
 
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'name': '',
    'finalUrls': '',
  };
  validationMessages = {
    'name': {
      'required': "Nom du visuel obligatoire",
      'name': 'Saisissez un nom valide',
    },
    

    'finalUrls': {
      'required': 'Url de redirection requise.',
      'pattern': "L'url doit être sous la frome http://monsite.com",
      'minlength': 'Url trop courte',
      'maxlength': 'Url trop longue',
    },
  };
  combinedApprovalStatus = ""
  policy = []
  photoURL = ""
  selectedAdType = ""
  button_modify_image_upload = true
  idOfDisplayUrlNotPublishUpload = "display_url_modify_not_publish_upload"
  idOfAdNameNotPublishUpload = "ad_name_modify_not_publish_upload"
  idOfdisplayUrlNotPublishCreatives = "display_url_modify_not_publish_creatives"
  idOfAdNameNotPublishCreatives = "ad_name_modify_not_publish_creatives"
  text_construire = "Construire son visuel"
  currentIdInputName = ""
  currentIdInputDisplay = ""
  idOfAdNameCreateUpload = "ad_name_create_upload"
  idOfDisplayUrlCreateUpload = "displayUrl_create_upload"
  idOfAdNameCreateCreatives = "ad_name_create_creatives"
  idOfDisplayUrlCreateCreatives = "displayUrl_create_creatives"
  idOfAdNameModify = "ad_name_modifed"
  idOfDisplayModify = "displayUrl_modify"
  idOfAdNameInitUpload = "ad_name_init_upload"
  idOfDisplayUrlInitUpload = "display_url_init_upload"
  idOfAdNameInitCreatives = "ad_name_init_creatives"
  idOfDisplayUrlInitCreatives = "display_url_init_creatives"
  text_modify = "éditer"
  upload_modified = false
  init_choose_ad_size = false
  modifyPublishAd = false
  isUploadModified = false
  ad_type=""
  is_upload_way = false
  is_creative_way = false
  img_view_create_style: Object = { 'width': '100px', 'height': '100px' }
  canvas_style: Object = {'width': '', 'height': '', 'border-color': 'rgb(233, 216, 216);'}
  chooseBlock = false
  chooseAdSize = true
  selectedWidth: any
  selectedHeight: any
  isUpload = false
  handleCreateCanvas=false
  new_image_content: any;
  today: any;
  modifyDate = false
  dure_campagne = 0;
  budget = 0;
  isSetBudget = false
  isSimulation = false
  budget_to_place = 0;
  my_gain = 0;
  startDateFrench: any;
  endDateFrench: any;
  startDate: any;
  endDate: any;
  budgetId: any;
  UpdatedStartDate = "";
  UpdatedEndDate = "";
  newStartDate = "";
  newEndDate = "";
  accountValue = 0;
  montant = 0;
  campagne_name: any;
  campagne_id: any;
  ad_group_id: any;
  criteria: any;
  currentCanvasContent: any;
  adgroups: any;
  ads: any;
  finalUrls: any;
  finalAppUrls: any;
  newfinalUrls: any;
  newfinalAppUrls: any;
  newfinalMobileUrls: any;
  finalMobileUrls: any;
  imageRefStorage: any;
  image_content: any;
  status: any;
  idC: any;
  idA: any;
  uid: any;
  image_url: any;
  ad_id: any;
  id_ad_firebase: any;
  ad_name: any;
  ages = []
  sexes = [];
  zones = [];
  devices = []
  nationals_websites = []
  internationals_websites = []
  ads_websites = []
  currentAdStatus = ""
  currentAdSize: any
  currentAdType = ""
  apps = []
  ad_group_name: any;
  label_enabled = 'Actif'
  label_paused = "Non Actif"
  text_create = "Visuel"
  isEditor = false
  _init_ad = false
  list_ad = true
  isAdBlock = false;
  currentAdName = "";
  currentFinalUrls = ""
  tabCurrentFinalUrls = []
  tabUpdatedCurrentFinalUrls = []
  currentImageUrl = ""
  number_ads: any
  number_of_impressions_simulated = 0
  isNull = true
  choose = true
  directBudget = false
  placement: any;
  isAccountRechargement = false
  isPlacementBudgetFromAccount = false
  icon_toggle = 'icon-chevron-left'
  icon_toggle_options = 'icon-chevron-down'
  public isCollapsed = false;
  public isOptions = true
  public isPlacement = true
  public isGender = true
  public isAge = true
  public isDevice = true
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
  constructor(private notesService: NotesService, public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private adGroupService: AdGroupService, private adsService: Ads, private cpService: ColorPickerService, private fb: FormBuilder, private router: Router) {

  }
  isDone = false
  dropdownListAges = [];
  dropdownListSexes = [];
  dropdownListZones = [];
  dropdownListDevices = [];
  dropdownListNationalsWebsites = [];
   dropdownListInternationalsWebsites = [];
  dropdownListAdsWebsites = [];
   dropdownListApps = [];
  selectedItems = [];
  dropdownSettingsAges = {};
  dropdownSettingsSexes = {};
  dropdownSettingsZones = {};
  dropdownSettingsDevices = {};
  dropdownSettingsNationalsWebsites = {};
  dropdownSettingsInternationalsWebsites = {};
  dropdownSettingsAdsWebsites = {};
   dropdownSettingsApps = {};
  text_visualise = "Visuel"
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
  email_letter: any;
  iconEditor: any;
  genres = "";
  populations: any;
  appareils: any;
  isCiblageGenre = false
  isCiblageAge = false
  isCiblageDevices = false
  isCreating = false
  isRoller = false
  isRechargement = false
  isPlacementBudget = false
  email: any;
  nationals_errors = ''
  _init_ad_list = false
  currentEditor = false
  referenceId: any
  element_checked = ""
  illustration = false
  illustrationUrl = ""
  AD_TYPES_SPECIAL_1 = [
    { "name": "Rectangle", "width": "300", "height": "250", "id": "MediumRectangle", "isSpecial": true, "img": "https://dummyimage.com/300x250/000/fff" },
    { "name": "Rectangle Large", "width": "336", "height": "280", "id": "LargeRectangle", "isSpecial": true, "img": "https://dummyimage.com/336x280/000/fff" },
    { "name": "Horizontal Medium", "width": "728", "height": "90", "id": "Leaderboard", "isSpecial": true, "img": "https://dummyimage.com/728x90/000/fff" },
     

    
    /* {"name": "Vertical", "width": "320", "height": "50", "id": "Skyscraper", "img": "https://dummyimage.com/120x600/000/fff"}, */
    
  ]
  AD_TYPES_SPECIAL_2 = [
     { "name": "Vertical Medium", "width": "160", "height": "600", "id": "Wideskyscraper", "isSpecial": true, "img": "https://dummyimage.com/160x600/000/fff" },
    { "name": "Carré", "width": "250", "height": "250", "id": "Square", "isSpecial": true, "img": "https://dummyimage.com/250x250/000/fff" },
     { "name": "Demi page", "width": "300", "height": "600", "id": "LargeSkyscraper", "isSpecial": true, "img": "https://dummyimage.com/300x600/000/fff" },

    
    /* {"name": "Vertical", "width": "320", "height": "50", "id": "Skyscraper", "img": "https://dummyimage.com/120x600/000/fff"}, */
    
  ]
  AD_TYPES_NOSPECIAL_1 = [
    { "name": "Horizontal", "width": "468", "height": "60", "id": "Banner", "isSpecial": false,  "img": "https://dummyimage.com/468x60/000/fff" },
    { "name": "Vertical", "width": "120", "height": "600", "id": "Skyscraper", "isSpecial": false, "img": "https://dummyimage.com/120x600/000/fff" },
    { "name": "Rectangle Vertical", "width": "240", "height": "400", "id": "RV", "isSpecial": false, "img": "https://dummyimage.com/120x600/000/fff" },
   
  ]
  AD_TYPES_NOSPECIAL_2 = [
   
    { "name": "Horizontal Large", "width": "970", "height": "90", "id": "LargerLeaderboard", "isSpecial": false, "img": "https://dummyimage.com/970x90/000/fff" },
    { "name": "Big Panneau", "width": "970", "height": "250", "id": "BigPanneau", "isSpecial": false, "img": "https://dummyimage.com/970x250/000/fff" },
        {"name": "Petit carré", "width": "200", "height": "200", "id": "Smallsquare", "isSpecial": false, "img": "https://dummyimage.com/200x100/000/fff"}  
   
  ]
  NATIONALS_WEBSITES = [
  [1,"infos","dakarbuzz.net","http://dakarbuzz.net"  ],
  [2,"infos","galsen221.com","http://galsen221.com"  ],
  [3,"infos","leral.net","http://leral.net"  ],
  [4,"infos","limametti.com","http://limametti.com"  ],
  [5,"infos","sanslimitesn.com","http://sanslimitesn.com"  ],
  [6,"infos","senego.com","http://senego.com"  ],
  [7,"infos","seneweb.com","http://seneweb.com"  ],
  [8,"infos","www.buzzsenegal.com","http://www.buzzsenegal.com"  ],
  [9,"infos","www.dakar7.com","http://www.dakar7.com"  ],
  [10,"infos","www.dakarflash.com","http://www.dakarflash.com"  ],
  [11,"infos","www.lequotidien.sn","http://www.lequotidien.sn"  ],
  [12,"infos","www.pressafrik.com","http://www.pressafrik.com"  ],
  [13,"infos","www.senenews.com","http://www.senenews.com"  ],
  [14,"infos","xalimasn.com","http://xalimasn.com"  ],
  [15,"infos","metrodakar.net","http://metrodakar.net"  ],
  [16,"infos","sunubuzzsn.com","http://sunubuzzsn.com"  ],
  [17,"infos","senegal7.com","http://senegal7.com"  ],
  [18,"infos","senescoop.net","http://senescoop.net"  ],
  [19,"infos","sunugal24.net","http://sunugal24.net"  ],
  [20,"infos","dakar92.com","http://dakar92.com"  ],
  [21,"infos","rumeurs221.com","http://rumeurs221.com"  ],
  [22,"infos","bonjourdakar.com","http://bonjourdakar.com"  ],
  [23,"infos","vipeoples.net","http://vipeoples.net"  ],
  [24,"infos","seneplus.com","http://seneplus.com"  ],
  [25,"infos","wiwsport.com","http://wiwsport.com"  ],
  [26,"infos","viberadio.sn","http://viberadio.sn"  ],
  [27,"infos","yerimpost.com","http://yerimpost.com"  ],
  [28,"infos","ndarinfo.com","http://ndarinfo.com"  ],
  [29,"infos","dakarposte.com","http://dakarposte.com"  ],
  [30,"infos","exclusif.net","http://exclusif.net"  ],
  [31,"infos","senegaldirect.net","http://senegaldirect.net"  ]
  ]
  
  INTERNATIONALS_WEBSITES = [
  [1,"sport ","footmercato.net","http://www.footmercato.net"  ],
  [2,"infos","lexpress.fr","http://www.lexpress.fr"  ],
  [3,"sport ","mercatolive.fr","http://www.mercatolive.fr"  ],
  [4,"sport ","maxifoot.fr","http://maxifoot.fr"  ],
  [5,"sport ","livefoot.fr","http://livefoot.fr"  ],
  [6,"forum","01net.com","http://01net.com"  ],
  [7,"sport ","le10sport.com","http://le10sport.com"  ],
  [8,"sport ","maxifoot-live.com","http://maxifoot-live.com"  ],
  [9,"forum","01net.com","http://01net.com"  ],
  [10,"infos","bfmtv.com","http://bfmtv.com"  ],
  [11,"sport ","besoccer.com","http://besoccer.com"  ],
  [12,"sport ","foot01.com","http://foot01.com"  ],
  [13,"sport ","basketsession.com","http://basketsession.com"  ],
  [14,"sport ","basket-infos.com","http://basket-infos.com"  ],
  [15,"infos","skyrock.com","http://skyrock.com"  ],
  [16,"infos","leparisien.fr","http://leparisien.fr"  ],
  ]
  
  SITES_ANNONCES = [
     [1,"annonces","deals.jumia.sn","http://deals.jumia.sn"  ],
  [2,"annonces","expat-dakar.com","http://expat-dakar.com"  ],
  [3,"annonces","coinafrique.com","http://coinafrique.com"  ]
  ]

  APP_MOBILES = [
  [1,"App","Senego","https://play.google.com/store/apps/details?id=com.nextwebart.senego"  ],
  [2,"App","Super-Bright LED Flashlight ","https://play.google.com/store/apps/details?id=com.surpax.ledflashlight.panel"  ],
  [3,"App","CallApp: Caller ID","https://play.google.com/store/apps/details?id=com.callapp.contacts"  ],
  [4,"App","PhotoGrid: Video & Pic Collage Maker, ","https://play.google.com/store/apps/details?id=com.roidapp.photogrid"  ],
  [5,"App","Bubble Shooter ","https://play.google.com/store/apps/details?id=bubbleshooter.orig"  ],
  [6,"App"," MAX Cleaner - Antivirus, Phone Cleaner","https://play.google.com/store/apps/details?id=com.oneapp.max.cleaner.booster"  ],
  [7,"App","Block Puzzle ","https://play.google.com/store/apps/details?id=com.puzzlegamesclassic.tetris.blockpuzzle"  ],
  [8,"App","Bubble Breaker ","https://play.google.com/store/apps/details?id=com.faceplus.bubble.breaker"  ],
  [9,"App","Flashlight ","https://play.google.com/store/apps/details?id=com.splendapps.torch"  ],
  [10,"App","Photo Lock App ","https://play.google.com/store/apps/details?id=vault.gallery.lock"  ]
]

  model: any = {};
  
  public canvas: any;
 

    public Direction: any = {
        LEFT: 0,
        UP: 1,
        RIGHT: 2,
        DOWN: 3
    };
    public DirectionSteps: any = {
        REGULAR: 1,
        SHIFT: 5
    };
    public dragObject: any;

    public presetFonts = ['Arial', 'Serif', 'Helvetica', 'Sans-Serif', 'Open Sans', 'Roboto Slab'];
    public lastInputSelected: any;

    public customColors: any = [];

    public selectedLibrary = 'brands';
    public palettes: any = {
        selected: null,
        defaults: [
            {key: '#001f3f', value: 'Navy', type: 'default'},
            {key: '#0074D9', value: 'Blue', type: 'default'},
            {key: '#7FDBFF', value: 'Aqua', type: 'default'},
            {key: '#39CCCC', value: 'Teal', type: 'default'},
            {key: '#3D9970', value: 'Olive', type: 'default'},
            {key: '#2ECC40', value: 'Green', type: 'default'},
            {key: '#01FF70', value: 'Lime', type: 'default'},
            {key: '#FFDC00', value: 'Yellow', type: 'default'},
            {key: '#FF851B', value: 'Orange', type: 'default'},
            {key: '#FF4136', value: 'Red', type: 'default'},
            {key: '#85144b', value: 'Maroon', type: 'default'},
            {key: '#F012BE', value: 'Fuchsia', type: 'default'},
            {key: '#B10DC9', value: 'Purple', type: 'default'},
            {key: '#111111', value: 'Black', type: 'default'},
            {key: '#AAAAAA', value: 'Gray', type: 'default'},
            {key: '#DDDDDD', value: 'Silver', type: 'default'}
        ],
        custom: []
    };

    public library: any = {
        brands: [
            {name: 'Audi', src: 'assets/libraries/brands/audi-sd.png'},
            {name: 'BMW', src: 'assets/libraries/brands/bmw-sd.png'},
            {name: 'Citroen', src: 'assets/libraries/brands/citroen-sd.png'},
            {name: 'Fiat', src: 'assets/libraries/brands/fiat-sd.png'},
            {name: 'Ford', src: 'assets/libraries/brands/ford-sd.png'},
            {name: 'General Motors', src: 'assets/libraries/brands/generalmotors-sd.png'},
            {name: 'Honda', src: 'assets/libraries/brands/honda-sd.png'},
            {name: 'Hyundai', src: 'assets/libraries/brands/hyundai-sd.png'},
            {name: 'Infiniti', src: 'assets/libraries/brands/infiniti-sd.png'},
            {name: 'Kia', src: 'assets/libraries/brands/kia-sd.png'},
            {name: 'Lexus', src: 'assets/libraries/brands/lexus-sd.png'},
            {name: 'Mazda', src: 'assets/libraries/brands/mazda-sd.png'},
            {name: 'Mercedes-Benz', src: 'assets/libraries/brands/mercedesbenz-sd.png'},
            {name: 'Mini', src: 'assets/libraries/brands/mini-sd.png'},
            {name: 'Nissan', src: 'assets/libraries/brands/nissan-sd.png'},
            {name: 'Peugeot', src: 'assets/libraries/brands/peugeot-sd.png'},
            {name: 'Porsche', src: 'assets/libraries/brands/porsche-sd.png'},
            {name: 'Renault', src: 'assets/libraries/brands/renault-sd.png'},
            {name: 'Seat', src: 'assets/libraries/brands/seat-sd.png'},
            {name: 'Skoda', src: 'assets/libraries/brands/skoda-sd.png'},
            {name: 'Tesla', src: 'assets/libraries/brands/tesla-sd.png'},
            {name: 'Toyota', src: 'assets/libraries/brands/toyota-sd.png'},
            {name: 'Volkswagen', src: 'assets/libraries/brands/volkswagen-sd.png'},
            {name: 'Volvo', src: 'assets/libraries/brands/volvo-sd.png'}
        ]
    };

    public font: Font = new Font({
        family: 'Roboto',
        size: '14px',
        style: 'regular',
        styles: ['regular']
    });

    public props: any = {
        canvasFill: '#ffffff',
        canvasImage: '',
        id: null,
        opacity: null,
        fill: null,
        stroke: null,
        strokeWidth: null,
        fontSize: null,
        lineHeight: null,
        charSpacing: null,
        fontWeight: null,
        fontStyle: null,
        textAlign: null,
        fontFamily: 'Open Sans',
        TextDecoration: '',
        scale: 1,
        angle: 0
    };
    public elementTypes: any = {
        'image': {key: 'image', text: 'Image', icon: 'icon-image'},
        'i-text': {key: 'i-text', text: 'Texte', icon: 'icon-text_format'},
        'rect': {key: 'rect', text: 'Rectangle', icon: 'icon-aspect_ratio'},
        'triangle': {key: 'triangle', text: 'triangle', icon: 'icon-change_history'},
        'circle': {key: 'circle', text: 'Cercle', icon: 'icon-radio_button_unchecked'},
        'polygon': {key: 'polygon', text: 'Polygone', icon: 'icon-crop_square'}
    };
 
    public urlName = '';
   
 
    public selectedSize: any = null;
    public sizes: any = [
        {width: 640, height: 480},
        {width: 1024, height: 768},
        {width: 1920, height: 1080}
    ];

    public sliderConfig: any = {
        pips: {
            mode: 'range',
            density: 5
        }
    };


    public shapeEditor = false;


    public layers: any = [];
    canva_state = false


  go() {
    window.location.replace(REDIRECT_URL)
   
   /*  this.router.navigate(['/']) */
  }
  
  handleCanvas(width: number, height: number) {
  
 
    this.canvas = ""
    this.canvas = new fabric.Canvas('canvas', {
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue',
      preserveObjectStacking: true,
        
        });

        this.loadPalette();

        // register keyboard events
        fabric.util.addListener(document.body, 'keydown', (opt) => {
            // do not invoke keyboard events on input fields
            if (opt.target.tagName === 'INPUT') {
                return;
            }
            // if(opt.repeat) return; // prevent repeating (keyhold)

            const key = opt.which || opt.keyCode;

            this.handleKeyPress(key, opt);
        });

        // register fabric.js events
        this.canvas.on({
            'object:moving': (e) => {
            },
            'object:modified': (e) => {
            },
            'object:selected': (e) => {

                const selectedObject = e.target;
                this.selected = selectedObject;
                selectedObject.hasRotatingPoint = true;
                selectedObject.transparentCorners = false;
                selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

                this.resetPanels();

                if (selectedObject.type !== 'group' && selectedObject) {

                    this.getId();
                    this.getOpacity();
                    this.getTitle();

                    switch (selectedObject.type) {
                        case 'polygon':
                        case 'rect':
                        case 'circle':
                        case 'triangle':
                            this.shapeEditor = true;
                            this.getFill();
                            this.getStroke();
                            this.getStrokeWidth();
                            break;
                        case 'i-text':
                            this.textEditor = true;
                            this.getLineHeight();
                            this.getCharSpacing();
                            this.getBold();
                            this.getFontStyle();
                            this.getFontSize();
                            this.getFill();
                            this.getStroke();
                            this.getStrokeWidth();
                            this.getTextDecoration();
                            this.getTextAlign();
                            this.getFontFamily();
                            break;
                        case 'image':
                            break;
                    }
                }
            },
            'selection:cleared': (e) => {
                this.selected = null;
                this.resetPanels();
            }
        });
    this.canvas_style['width']=width
    this.canvas_style['height']=height
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canva_state = true
    //console.log('handled')
    
  }


   


  ngAfterViewInit() {
   
    var button = document.getElementById('v-pills-add-ad-tab')
    var image = document.querySelector('.img-check')
    this.isEditor = false
    this.isAdBlock = false

    this.ads = this.adsService.getListAd(this.ad_group_id)
    this.ads.forEach(child => {

      if (child.length > 0) {
        this.number_ads = child.length
        this.isNull = true
        
        
      } else {
        this.list_ad = false
        this._init_ad = true
        this.number_ads = "0"
        this.isNull = false
       
          
      }

      if (this.isNull === false) {
        if (this.ad_type==="UPLOAD") {
          this.currentIdInputDisplay = this.idOfDisplayUrlCreateUpload
          this.currentIdInputName = this.idOfAdNameCreateUpload
        } else {
            this.currentIdInputDisplay = this.idOfDisplayUrlCreateCreatives
          this.currentIdInputName = this.idOfAdNameCreateCreatives
        }
      }
      

    })
    
     button.addEventListener("click", () => {
      
    $('#block').css("display", "none")

      
    }) 

   
  
  }
 
  
  toggleModifyUploadImage() {
    this.button_modify_image_upload = false
    $("#button_modify_image_upload").show()
  }
  
  closeModifyUploadImage() {
    $("#button_modify_image_upload").hide()
     this.button_modify_image_upload = true
  }

  checkAdType(img, width, height, url, name) {
    
    //console.log('click on img')
    //console.log(img)
    if (this.element_checked == "") {
      $("#" + img).toggleClass('check')
      this.element_checked = "#" + img
      this.selectedWidth = width
      this.selectedHeight = height
     
      this.illustration = true
      this.illustrationUrl = url
      this.selectedAdType=name
      
    } else {
      this.illustration = false
      $(this.element_checked).toggleClass('check')
      $("#"+img).toggleClass('check')
      this.element_checked = "#" + img
      this.selectedWidth = width
      this.selectedHeight = height
      this.illustration = true
      this.illustrationUrl = url
      this.selectedAdType=name
    }
  }
/*   public loadScript(src) {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = [src];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);
      }

    }
  } */
  goBackSelectSize() {
    this.chooseBlock = false
    this.chooseAdSize = true
   
  }
    loadScript(src){
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
    script.src = src;
    
  }
 async handleUploadBanner(){
   //this.chooseBlock = false
   //this.chooseAdSize = false
 /*   this.loadScript('../../../../assets/js/app.js') */
   var l = document.querySelector('.dropzone')
   
   this.is_upload_way = true
   this.ad_type = "UPLOAD"
   
   if (this.isNull === true) {
     
     //$("#block1").css("display", "block")
     this.currentIdInputName = this.idOfAdNameCreateUpload
   this.currentIdInputDisplay = this.idOfDisplayUrlCreateUpload
   } else {
     $("#block").css("display", "block")
     this.currentIdInputName = this.idOfAdNameInitUpload
   this.currentIdInputDisplay = this.idOfDisplayUrlInitUpload
   }

   setTimeout(() => {
     
   
     
   }, 2000)

    
    
  }
  goBackFromUpload() {
    this.isUpload = false
    this.is_upload_way = false
    this.ad_type = ""
     this.currentIdInputName = ""
    this.currentIdInputDisplay = ""
     if (this.isNull === true) {
     
     $("#block1").css("display", "none")
   } else {
     $("#block").css("display", "none")
   }
    
  this.chooseBlock = true
  }

  goBackFromCreatives() {
/*   this.handleCreateCanvas = false
    this.chooseBlock = true
    this.ad_type = "" */
    this.currentIdInputName = ""
    this.currentIdInputDisplay = ""
    document.getElementById('dismissInit').click()
  }
  
  handleCreatives() {
    this.isCreating = true
    
    var self = this
    this.ad_type="CREATIVE"
    //this.chooseBlock = false
  
    
     if (this.isNull === true) {
     
    this.currentIdInputName = this.idOfAdNameCreateCreatives
    this.currentIdInputDisplay = this.idOfDisplayUrlCreateCreatives
   } else {
  
this.currentIdInputName = this.idOfAdNameCreateCreatives
    this.currentIdInputDisplay = this.idOfDisplayUrlCreateCreatives
     }
        setTimeout(function(){ 
         
         self.buildForm()
        }, 2000);
      setTimeout(function(){ 
         
          self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight))
          self.isCreating = false
         
        }, 2000);

/*       if (this.handleCreateCanvas == false) {
      
      this.handleCreateCanvas = true
      if (this.canva_state == false) {
        this.isCreating  =true
        
  
  
        setTimeout(function(){ 
         
          self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight))
          self.isCreating = false
         
        }, 2000);
      } else {
        self.isCreating = true
         setTimeout(function(){ 
         
         self.canvas.clear()
         
         }, 2000);
        setTimeout(function(){ 
         
          self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight))
         
         self.isCreating=false
        }, 2000);
       
}
      
    } else {
      this.handleCreateCanvas = false
      } */
  }

  chooseAdType() {

    this.chooseAdSize = false
    this.chooseBlock = true
 
  }
  reload() {
    return 'reload'
  }
  ngOnInit() {
   
   this.auth.user.forEach(data=>{
           this.photoURL = data.photoURL
           //alert(this.photoURL)
         })
     this.auth.notificationAccount.forEach((value) => {
      if(value.notification != ""){
        this.numberOfNotifications = 1
        this.notificationAccountValue = value.notification
      }
    })
      
    this.route.params.subscribe(params => {
      var name = params['name']
      var idC = params['idC']
      var idA = params['idA']
      var adgroupid = params['ad_group_id']
      var campaignid = params['campaign_id']
      
    
    })
    
    

    // get references to the html canvas element & its context
    // this.canvas.on('mouse:down', (e) => {
    // let canvasElement: any = document.getElementById('canvas');
    // //console.log(canvasElement)
    // });

    this.route.params.subscribe(params => {
     //alert('ok')
  
      if (typeof(params['budget']) =="undefined") {
  
      this.ad_group_name = params['name']
      this.campagne_id = params['campaign_id']
      this.ad_group_id = params['ad_group_id']
      this.idC = params['idC']
        this.idA = params['idA']
         this.auth.user.subscribe(data => {
      this.uid = data.uid
      this.email = data.email
      this.email_letter = data.email.charAt(0)
      this.accountValue = data.account_value
       this.notesService.getSingleCampaignWithId(data.uid, this.campagne_id).then(res => {
      //console.log(res)
      this.startDateFrench = res['startDateFrench']
         this.endDateFrench = res['endDateFrench']
         this.startDate = res['startDate']
         this.endDate = res['endDate']
         this.budget = res['budget']
         //alert(this.budget)
         this.budgetId = res['budgetId']
         this.dure_campagne = this.datediff(this.parseDate(res['startDateFrench']), this.parseDate(res['endDateFrench']))

           this.adgroups = this.adGroupService.getAdGroup(this.idA).valueChanges().subscribe(res => {
      this.status = res['status']
      this.genres = res['sexes']
      this.populations = res['ages']
      this.appareils = res['devices']
             this.placement = res['placement']
       
        
      
           })
         
         if (this.isNull == true) {
        //alert(this.placement.toString().length )
      if ( this.placement.toString().length ==0 || this.genres.toString().length ==0 || this.populations.toString().length ==0  || this.appareils.toString().length == 0) {
        
        if (this.budget > 0) {

          //alert('ok budget')
          this.isDone = true
          /*  document.getElementById("v-pills-placement-tab").classList.add('animated' ,'bounce', 'infinite', 'adafri-police-22', 'font-weight-bold', "text-success")
             document.getElementById("v-pills-ciblage-ads-tab").classList.add('animated' ,'bounce', 'infinite', 'adafri-police-22', 'font-weight-bold', 'text-success') */
        }
      } else {
        this.isDone = false
       /*  document.getElementById("v-pills-placement-tab").classList.remove('animated' ,'bounceUp', 'infinite', 'adafri-police-18', 'font-weight-bold')
             document.getElementById("v-pills-ciblage-ads-tab").classList.remove('animated' ,'bounceUp', 'infinite', 'adafri-police-18', 'font-weight-bold') */
      }
    }
    })
    })
      } else {
        //console.log(params)
/*         this.id_ad_firebase = params['id_ad_firebase']
         this.ad_group_name = params['name']
      this.campagne_id = params['campaign_id']
      this.ad_group_id = params['ad_group_id']
      this.idC = params['idC']
      this.idA = params['idA']
      
        this.isCreating = true
    
         
              this.notesService.updateNote(params['idC'], { budget: parseInt(params["budget"]) , dailyBudget: parseInt(params['dailyBudget']), numberOfDays: parseInt(params['numberOfDays'])}).then(() => {
                Swal.fire({
                  title: 'Service Campagne!',
                  text: 'Budget mis à jour.',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#26a69a',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ok'
                }).then((result) => {
                  if (result.value) {
                    window.history.pushState("", "", "/ads/"+params['name']+"/"+params['idC']+"/"+params['idA']+"/"+params['ad_group_id']+"/"+params['campaign_id'])
                    this.isCreating = false
                
                    
                    this.auth.user.subscribe(data => {
                    this.uid = data.uid
                    this.email = data.email
                    this.email_letter = data.email.charAt(0)
                    this.accountValue = data.account_value
                    this.notesService.getSingleCampaignWithId(data.uid, this.campagne_id).then(res => {
                    //console.log(res)
                    this.startDateFrench = res['startDateFrench']
                      this.endDateFrench = res['endDateFrench']
                      this.startDate = res['startDate']
                      this.endDate = res['endDate']
                      this.budget = res['budget']
                    
                      this.budgetId = res['budgetId']
                      this.dure_campagne = this.datediff(this.parseDate(res['startDateFrench']), this.parseDate(res['endDateFrench']))
                  })
                  })
                     
                    document.getElementById(this.id_ad_firebase).click()
                    this.isCreating = true
                     setTimeout(function(){
                       document.getElementById("publish").click()
                       
                      }, 2000);
                      this.isCreating = false 
                   
                  }
                })
                
              }) */
      }
     

  /*     if (typeof (params['money']) != "undefined" && typeof (params['id_ad_firebase']) != "undefined") {
        this.isCreating = true
        this.auth.user.forEach(data => {
          this.auth.updateUser(data.uid, { account_value: params['money'] })
          this.auth.getInfos(data.uid).subscribe(el => {
            this.auth.updateNotification(el[0]['id'], { notification: "" }).then(() => {
              Swal.fire({
                title: 'Service Rechargement!',
                text: 'Compte mis à jour avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  this.isCreating = false
                  setTimeout(() => {
                    document.getElementById(params['id_ad_firebase']).click()
                  },2000)
                  window.history.pushState("", "", "/ads/" + params['name'] + "/" + params['idC'] + "/" + params['idA'] + "/" + params['ad_group_id'] + "/" + params['campaign_id'])
                   setTimeout(() => {
                    document.getElementById("publish").click()
                  },2000)
                  
                }
              })
            })
      
   
          })
        })
      } */
    })
    
    var chartData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    data: [589, 445, 483, 503, 689, 692, 634],
  },
  {
    data: [639, 465, 493, 478, 589, 632, 674],
  }]
};

    var chLine = document.getElementById("chLine");
if (chLine) {
  new Chart(chLine, {
  type: 'line',
  data: chartData,
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    }
  }
  });
}


      // In a real app: dispatch action to load the details here.
  
    this.adgroups = this.adGroupService.getAdGroup(this.idA).valueChanges().subscribe(res => {
      this.status = res['status']
      this.genres = res['sexes']
      this.populations = res['ages']
      this.appareils = res['devices']
      this.placement = res['placement']
     
      
      //console.log('populations')
      /* //console.log(this.genres) */
      //console.log(this.populations)
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
    },];
    for (let i = 0; i < this.NATIONALS_WEBSITES.length; i++){
      //console.log(this.NATIONALS_WEBSITES[i][2])
      this.dropdownListNationalsWebsites.push({
         item_id: this.NATIONALS_WEBSITES[i][3],
         item_text: this.NATIONALS_WEBSITES[i][2]
       }
      );
    }

    for (let i = 0; i < this.INTERNATIONALS_WEBSITES.length; i++) {
      
      this.dropdownListInternationalsWebsites.push({
        item_id: this.INTERNATIONALS_WEBSITES[i][3],
        item_text: this.INTERNATIONALS_WEBSITES[i][2]
      
      }
      );
    }

    for (let i = 0; i < this.SITES_ANNONCES.length; i++){
      
      this.dropdownListAdsWebsites.push({
       item_id: this.SITES_ANNONCES[i][3],
       item_text: this.SITES_ANNONCES[i][2]
     }
      );
    }

    for (let i = 0; i < this.APP_MOBILES.length; i++){
      
      this.dropdownListApps.push({
        item_id: this.APP_MOBILES[i][3],
        item_text: this.APP_MOBILES[i][2]
      }
      );
    }
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
     this.dropdownSettingsNationalsWebsites = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'annuler',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      searchPlaceholderText: 'Rechercher',

     };
       this.dropdownSettingsInternationalsWebsites = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'annuler',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      searchPlaceholderText: 'Rechercher',

       };
       this.dropdownSettingsAdsWebsites = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'annuler',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      searchPlaceholderText: 'Rechercher',

       };
       this.dropdownSettingsApps = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'annuler',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      searchPlaceholderText: 'Rechercher',

    };
    //setup front side canvas
    this.ads = this.adsService.getListAd(this.ad_group_id)
    this.ads.forEach(child => {

      if (child.length > 0) {

        this.number_ads = child.length
        this.isNull = true
      
        
      } else {
        this.list_ad = false
        this._init_ad = true
        this.number_ads = "0"
        this.isNull = false
       
          
      }

    })

    
/*     this.getAdsPolicy(this.ad_group_id).then(res => {
      if(res!="error"){
        console.log(res)

        var i = 0
        while (i> res.length) {
          console.log(res[i])
           var combined = res[i]['combinedApprovalStatus']
          var policy = res[i]['policy']
          console.log(combined)
          this.adsService.multipleUpdate(res)
           this.adsService.getSingleAd(this.ad_group_id.toString(), res[i]['ad_id']).then(ad => {
            console.log(ad)
        
            this.adsService.updateAd(ad["id"], { combinedApprovalStatus: combined, policy: policy }).then(response => {
              console.log(response)
             if (response == "ok") {
               i++;
               
             }
           })
           }) 
        }
        for (var i = 0; i < res.length; i++){
          console.log(res[i])
          var combined = res[i]['combinedApprovalStatus']
          var policy = res[i]['policy']
          console.log(combined)
           this.adsService.getSingleAd(this.ad_group_id.toString(), res[i]['ad_id']).then(ad => {
            console.log(ad)
        
            this.adsService.updateAd(ad["id"], { combinedApprovalStatus: combined, policy: policy })
          })
        }
        
  }
})   */  




    this.buildForm()
   


  }



  async getAdsPolicy(ad_group_id: string): Promise<any> {
    return new Promise(resolve => {
          var infos = []
    this.http.post(SERVER_URL+'/getPolicySummury', {
      "ad_group_id": this.ad_group_id,        
    })
      .subscribe(
        res => {
          console.log(typeof(res))
      
          console.log(res)
        
          var arr = [];
          for (var key in res) {
            console.log(res.valueOf)
        
  if (res.hasOwnProperty(key)) {
    console.log(key)
    console.log(`key ${key} data: ${res[key]}`)
    console.log(res[key])
    var ad_id = res[key]['ad_id']
    var combinedApprovalStatus = res[key]['combinedApprovalStatus']
    var policy = res[key]['policy']
    this.combinedApprovalStatus = combinedApprovalStatus
    this.policy = policy
    console.log(ad_id)
    console.log(combinedApprovalStatus)
    console.log(policy)
    
    infos.push({
      "ad_id": ad_id,
      "combinedApprovalStatus": combinedApprovalStatus,
      "policy": policy
    })



    }
  };
  resolve(infos)

         
          
          
        },
        err => {
         resolve("error")
        }
      );
    })
}


   buildForm() {
   
    this.adForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.name,
      ]],
      'finalUrls': ['', [
        Validators.pattern('https?://.+'),
        Validators.minLength(6),
        Validators.maxLength(45),
      ]],
    
    });
    this.adForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

   editorTrue(): Promise<boolean>{
     return  new Promise(async (resolve) => {
       this.buildForm()
       resolve(true)
    })
  }
  

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    
    if (!this.adForm) { return; }
    const form = this.adForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'name' || field === 'finalUrls')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }

  handleToggleAdGroupSettings() {
    if(this.isCollapsed == false){
      this.isCollapsed = true
      this.icon_toggle = "icon-chevron-right"
    }else{
      this.isCollapsed = false
      this.icon_toggle = 'icon-chevron-left'
    }
  }

  handleToggleOptions() {
    if(this.isOptions == false){
      this.isOptions = true
      this.icon_toggle_options = "icon-chevron-up"
    }else{
      this.isOptions = false
      this.icon_toggle_options = 'icon-chevron-down'
    }
  }

  handleTogglePlacement() {
      this.isGender = true
      this.isAge = true
      this.isDevice = true
    if(this.isPlacement == false){
      this.isPlacement = true

    }else{
      this.isPlacement = false

    }
  }
  handleToggleGender() {
    
      this.isAge = true
      this.isPlacement = true
      this.isDevice = true
    if(this.isGender == false){
      this.isGender = true

    }else{
      this.isGender = false

    }
  }

  handleToggleAge() {
       this.isGender = true

      this.isPlacement = true
      this.isDevice = true
    if(this.isAge == false){
      this.isAge = true

    }else{
      this.isAge = false

    }
  }
  handleToggleDevice() {
       this.isGender = true
      this.isAge = true
      this.isPlacement = true
    
    if(this.isDevice == false){
      this.isDevice = true

    }else{
      this.isDevice = false

    }
  }









  popperClick() {
$('#popper').trigger('click')
   
  }

  triggerEmplacement() {
    document.getElementById('v-pills-placement-tab').click()
  }
  triggerCiblage() {
    document.getElementById('v-pills-ciblage-ads-tab').click()
  }
  async toggleListAd() {
    
    this.isEditor = false
    this.ads = this.adsService.getListAd(this.ad_group_id)
    this.list_ad = true
    this.currentEditor = false
    this.isAdBlock = false
   
     $("#blockUploadModified").css({'display': 'none'})
   
   /*  if (this.list_ad == true) {
      this.list_ad = false
      
    } else {
      this.list_ad = true
    } */
  }

  toggleEditor() {
    var self = this
    this.currentEditor = false
    this.isAdBlock = false
    this.list_ad = false
    /* if (this.list_ad == false) {
      this.ads = this.adsService.getListAd(this.ad_group_id)
      this.list_ad = true
    }else{
      this.list_ad = false
    } */
    
    if (this.isEditor == false) {
      
      this.isEditor = true
      if (this.canva_state == false) {
        this.isCreating  =true
        
        /*    this.isEditor = true
        setTimeout(function(){ 
          
          self.resetPanels()
          
        }, 2000); */
  
        setTimeout(function(){ 
         
          self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight))
          self.isCreating = false
         
        }, 2000);
      } else {
        self.isCreating = true
         setTimeout(function(){ 
         
         self.canvas.clear()
         
         }, 2000);
        setTimeout(function(){ 
         
         self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight))
         self.isCreating=false
        }, 2000);
       
}
      
    } else {
      this.isEditor = false
    }
   
   
  }

  openAddCiblageGenre() {
    this.isCiblageGenre = true;

  }
  openAddCiblageDevices() {
    this.isCiblageDevices = true;

  }
  targetGender() {
    //console.log(this.sexes)
    this.isCreating = true
    if (this.sexes.length == 0) {
      this.isCreating = false
      Swal.fire({
        title: 'Ciblage',
        text: 'Aucun genre séléctionné',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {}

      })
    } else {
      this.adGroupService.targetGenre(this.idA, this.campagne_id, this.ad_group_id, this.sexes).then(res => {
        if (res == "ok") {
          this.sexes = []
          this.isCiblageGenre = false
          this.isCreating = false
          
        }
      }).then(res => {
      })

    }
  }
  
  removePlacement(name: any, criterion_id: any) {
    Swal.fire({
        title: 'Emplacement',
        text: "Vous allez supprimer l'emplacement "+name+" ?",
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Supprimer'
      }).then((result) => {
        if (result.value) {
          this.isCreating = true
          this.adGroupService.removePlacement(this.idA, this.campagne_id, this.ad_group_id, criterion_id).then(res => {
            if (res != "error") {
              Swal.fire({
        title: 'Emplacement',
        text: 'Emplacement suprimé avec succès',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          this.isCreating = false
        } else {
          this.isCreating = false
        }

      })
            } else {
              this.isCreating = false
            }
          })
          
        } else {
          this.isCreating = false
        }

      })
  }

  targetPlacement() {
    var self = this
    var placement = []
    //console.log(this.ads_websites)
    //console.log(this.nationals_websites)
    //console.log(this.internationals_websites)
    this.isCreating = true
    if (this.nationals_websites.length == 0) {
      this.isCreating = false
      Swal.fire({
        title: 'Ciblage',
        text: 'Séléctionner au moins un site national',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {}

      })
    } else {
      placement.push(this.nationals_websites, this.internationals_websites, this.ads_websites)
      this.adGroupService.targetPlacement(this.idA, this.campagne_id, this.ad_group_id, placement).then(res => {
        if (res == "ok") {
           this.isPlacement = false
        this.isCreating = false
        this.placement = []
        }
      }).then(res => {
       
      })

    }
  }

  targetDevices() {
    //console.log(this.devices)
    this.isCreating = true
    if (this.devices.length == 0) {
      this.isCreating = false
      Swal.fire({
        title: 'Ciblage',
        text: 'Aucun appareil séléctionné',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {}
      })
    } else {
      this.adGroupService.targetDevices(this.idA, this.campagne_id, this.ad_group_id, this.devices).then(res => {
        if (res == "ok") {
            this.isCreating = false
        this.isCiblageDevices = false
          this.devices = []
          
        }
      }).then(res => {
      

      })

    }
  }

  closeAddCiblageGenre() {
    this.isCiblageGenre = false
  }
  closeAddCiblageDevices() {
    this.isCiblageDevices = false
  }
  closeAddPlacement() {
  if(this.isPlacement == false){
      this.isPlacement = true

    }else{
      this.isPlacement = false

    }
}

  openAddCiblageAge() {
    this.isCiblageAge = true;

  }
  targetAge() {
    //console.log(this.ages)
    this.isCreating = true
    if (this.ages.length == 0) {
      this.isCreating = false
      Swal.fire({
        title: 'Ciblage',
        text: 'Aucun genre séléctionné',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {}
      })
    } else {
      this.adGroupService.targetAge(this.idA, this.campagne_id, this.ad_group_id, this.ages).then(res => {
        if (res == "ok") {
          this.ages = []
          this.isCiblageAge = false
          this.isCreating = false
          
        }
      }).then(res => {

      })

    }
  }

  goProfile() {
    this.router.navigate(['UserProfile'])
  }

  closeAddCiblageAges() {
    this.isCiblageAge = false
  }

  onAgeSelect(item: any) {
    this.ages.push(item)
    //console.log(this.ages)
  }
  onAgeSelectAll(items: any) {
    //console.log(items);
    this.ages = []
    this.ages = items
  }
  onAgeDeSelect(item: any) {
    //console.log(item)
    for (var i = 0; i < this.ages.length; i++) {
      if (this.ages[i]['item_id'] == item.item_id) {
        this.ages.splice(i, 1)
      }
    }
    //console.log(this.ages)

  }
  onDeSelectAllAge() {
    this.ages = []
    //console.log(this.ages)
  }


  onNationalsWebsitesSelect(item: any) {
    this.nationals_errors = ''
    this.nationals_websites.push(item)
    //console.log(this.nationals_websites)
  }
  onNationalsWebsitesSelectAll(items: any) {
     this.nationals_errors = ''
    this.nationals_websites = []
    this.nationals_websites = items
    //console.log(this.nationals_websites);
  }
  onNationalsWebsitesDeSelect(item: any) {
    //console.log(item)
    for (var i = 0; i < this.nationals_websites.length; i++) {
      if (this.nationals_websites[i]['item_id'] == item.item_id) {
        this.nationals_websites.splice(i, 1)
      }
    }
    //console.log(this.nationals_websites)

  }
  onNationalsWebsitesDeSelectAll() {
    this.nationals_websites = []
    //console.log(this.nationals_websites)
  }


   onInternationalsWebsitesSelect(item: any) {
    this.internationals_websites.push(item)
    //console.log(this.internationals_websites)
  }
  onInternationalsWebsitesSelectAll(items: any) {
    
    this.internationals_websites = []
    this.internationals_websites = items
    //console.log(this.internationals_websites)
  }
  onInternationalsWebsitesDeSelect(item: any) {
    //console.log(item)
    for (var i = 0; i < this.internationals_websites.length; i++) {
      if (this.internationals_websites[i]['item_id'] == item.item_id) {
        this.internationals_websites.splice(i, 1)
      }
    }


  }
  onInternationalsWebsitesDeSelectAll() {
    this.internationals_websites = []
   
  }

   onAdsWebsitesSelect(item: any) {
    this.ads_websites.push(item)
    //console.log(this.ads_websites)
   }
  onAdsWebsitesSelectAll(items: any) {
    this.ads_websites = []
    this.ads_websites = items
    //console.log(this.ads_websites);
    
  }
  onAdsWebsitesDeSelect(item: any) {
    //console.log(item)
    for (var i = 0; i < this.ads_websites.length; i++) {
      if (this.ads_websites[i]['item_id'] == item.item_id) {
        this.ads_websites.splice(i, 1)
      }
    }
    //console.log(this.ads_websites)

  }
  onAdsWebsitesDeSelectAll() {
    this.ads_websites = []
    //console.log(this.ads_websites)
  }

   onAppsSelect(item: any) {
    this.apps.push(item)
    //console.log(this.apps)
  }
  onAppsSelectAll(items: any) {
    this.apps = []
    this.apps = items
    //console.log(this.apps);
  }
  onAppsDeSelect(item: any) {
    //console.log(item)
    for (var i = 0; i < this.apps.length; i++) {
      if (this.apps[i]['item_id'] == item.item_id) {
        this.apps.splice(i, 1)
      }
    }
    //console.log(this.apps)

  }
  onAppsDeSelectAll() {
    this.apps = []
    //console.log(this.apps)
  }



  onDevicesSelect(item: any) {
    this.devices.push(item)
    //console.log(this.devices)
  }
  onDevicesSelectAll(items: any) {
    //console.log(items);
    this.devices = []
    this.devices = items
  }
  onDevicesDeSelect(item: any) {
    //console.log(item)
    for (var i = 0; i < this.devices.length; i++) {
      if (this.devices[i]['item_id'] == item.item_id) {
        this.devices.splice(i, 1)
      }
    }
    //console.log(this.devices)

  }
  onDeSelectAllDevices() {
    this.devices = []
    //console.log(this.devices)
  }

  onSexeSelect(item: any) {
    this.sexes.push(item)
    //console.log(this.sexes)
  }
  onSexeSelectAll(items: any) {
    //console.log(items);
    this.sexes = []
    this.sexes = items
  }
  onSexeDeSelect(item: any) {
    //console.log(item)
    for (var i = 0; i < this.sexes.length; i++) {
      if (this.sexes[i]['item_id'] == item.item_id) {
        this.sexes.splice(i, 1)
      }
    }
    //console.log(this.sexes)

  }
  onDeSelectAllSexe() {
    this.sexes = []
    //console.log(this.sexes)
  }

  onZoneSelect(item: any) {
    this.zones.push(item)
    //console.log(this.zones)
  }
  onZoneSelectAll(items: any) {
    //console.log(items);
  }
  onZoneDeSelect(item: any) {
    //console.log(item)
    for (var i = 0; i < this.zones.length; i++) {
      if (this.zones[i]['item_id'] == item.item_id) {
        this.zones.splice(i, 1)
      }
    }
    //console.log(this.zones)

  }
  onDeSelectAllZone() {
    this.zones = []
    //console.log(this.zones)
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
     this.updateLayers();
  }

  //Block "Add images"


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

 handleErrorUrl(){
   this.url_errors = []
 }
  handleNationals() {
    this.nationals_errors = ''
  }
  
  handleImageModal() {
    //console.log(this.canvas.toDataURL('png'))
    
    var name = $("#" + this.currentIdInputName).val().replace(/\s/g, "")
    var url = $("#" + this.currentIdInputDisplay).val().replace(/\s/g, "")
    if (name == "") {
       Swal.fire({
                 title: "Service Groupe d'annonce!",
                 text: "nom de l'annonce ne peut être vide ",
                 type: 'error',
                 showCancelButton: false,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'réessayer'
               }).then((result) => {
                 if (result.value) {
                 
                 }else{
                 
                 }
               })
    } else if (url == "") {
       Swal.fire({
                 title: "Service Groupe d'annonce!",
                 text: "Url de redirection de l'annonce ne peut être vide ",
                 type: 'error',
                 showCancelButton: false,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'réessayer'
               }).then((result) => {
                 if (result.value) {
                 
                 }else{
                 
                 }
               })
    } else {
      
      this.getWebsites(this.currentIdInputDisplay).then(res => { 
        if (res != 'error') {
        
         
          $('#button_modal_init').trigger('click')
          
          $('#ad_image').attr("src", this.canvas.toDataURL('png'))
          //this.ad_name = $("#").val()
          
        } else{
  
        }
      })
    }
  }
  handleImageUploadModal() {

     var name = $("#" + this.currentIdInputName).val().replace(/\s/g, "")
    var url = $("#" + this.currentIdInputDisplay).val().replace(/\s/g, "")
      console.log(document.querySelector('.dz-preview'))
     if(document.querySelector('.dz-preview')===null){
        Swal.fire({
                    title: "Service Groupe d'annonce!",
                    text: "Aucune image chargée",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'réessayer'
                  }).then((result) => {
                    if (result.value) {
                    
                    }else{
                    
                    }
                  })
     } else {
       
       if (name == "") {
          Swal.fire({
                    title: "Service Groupe d'annonce!",
                    text: "nom de l'annonce ne peut être vide ",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'réessayer'
                  }).then((result) => {
                    if (result.value) {
                    
                    }else{
                    
                    }
                  })
       } else if (url == "") {
          Swal.fire({
                    title: "Service Groupe d'annonce!",
                    text: "Url de redirection de l'annonce ne peut être vide ",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'réessayer'
                  }).then((result) => {
                    if (result.value) {
                    
                    }else{
                    
                    }
                  })
       } else{
         
         
        this.getWebsites(this.currentIdInputDisplay).then(res => { 
          if (res != 'error') {
           
            var image = document.querySelector('.dz-image').getElementsByTagName('img')
            //console.log(image)
            if (image[0].naturalWidth != parseInt(this.selectedWidth) || image[0].naturalHeight != parseInt(this.selectedHeight)) {
              Swal.fire({
                     title: "Service Groupe d'annonce!",
                     text: 'Image invalide',
                     type: 'error',
                     showCancelButton: false,
                     confirmButtonColor: '#3085d6',
                     cancelButtonColor: '#d33',
                     confirmButtonText: 'Ok'
                   }).then((result) => {
                     if (result.value) {
                     
                     }else{
                     
                     }
                   })
            } else {
            this.img_view_create_style['width']=this.selectedWidth+'px'
            this.img_view_create_style['height']=this.selectedHeight+'px'
               $('#button_modal_init').trigger('click')
              $('#ad_image').attr("src", $('.dz-image').find('img').attr("src"))
              this.ad_name = $("#"+this.currentIdInputName).val()
            }
            
          } else{
    
          }
        })
       }
     }
  }

  handleModifiedImage() {
    if (this.currentAdType === 'CREATIVE') {
   this.new_image_content = ""
     this.new_image_content = JSON.stringify(this.canvas)
    //console.log(this.canvas.toDataURL('png'))
    this.getWebsites(this.currentIdInputDisplay).then(res => { 
      if (res != 'error') {
        $('#button_modal_modified').trigger('click')
        $('#ad_image_modified').attr("src", this.canvas.toDataURL('png'))
        $("#modified_name").text($("#" + this.currentIdInputName).val().replace(/\s/g, ""))
         this.img_view_create_style['width']=this.size["width"]+'px'
              this.img_view_create_style['height']=this.size["height"]+'px'
        
      } else{

      }
    })
    } else {
        this.getWebsites(this.currentIdInputDisplay).then(res => { 
          if (res != 'error') {
        //alert(this.button_modify_image_upload)
            if (this.button_modify_image_upload === true && (document.querySelector('.dz-preview')) === null) {
              this.img_view_create_style['width']=this.selectedWidth+'px'
              this.img_view_create_style['height']=this.selectedHeight+'px'
              $('#button_modal_modified').trigger('click')
              $('#ad_image_modified').attr("src", this.currentImageUrl)
              $("#modified_name").text($("#"+this.currentIdInputName).val())
            } else {

              var image = document.querySelector('.dz-image').getElementsByTagName('img')
        //console.log(image)
        if (image[0].naturalWidth != parseInt(this.currentAdSize[0]['width']) || image[0].naturalHeight != parseInt(this.currentAdSize[0]['height'])) {
          Swal.fire({
                 title: "Service Groupe d'annonce!",
                 text: 'Image invalide',
                 type: 'error',
                 showCancelButton: false,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Ok'
               }).then((result) => {
                 if (result.value) {
                 
                 }else{
                 
                 }
               })
        } else {
        this.img_view_create_style['width']=this.selectedWidth+'px'
        this.img_view_create_style['height']=this.selectedHeight+'px'
           $('#button_modal_modified').trigger('click')
          $('#ad_image_modified').attr("src", $('.dz-image').find('img').attr("src"))
          $("#modified_name").text($("#"+this.currentIdInputName).val())
        }
            }
       
        
        
      } else{

      }
    })
}

    
  }
  




  saveAdOnFirebase() {
    
    this.isRoller = true
  


    this.getWebsites(this.currentIdInputDisplay).then(res => {
      //console.log(res)
      if (res != 'error') {
        var size = [{'width': this.selectedWidth, 'height': this.selectedHeight}]
        
         var storage = firebase.app().storage("gs://comparez.appspot.com/");
    var storageRef = storage.ref();
   
    var imageRefStorage = this.uid + "/" + this.ad_name + new Date().getTime().toString()+ ".png"
    var imagesRef = storageRef.child(imageRefStorage);
    var metadata = {
  contentType: 'image/png',
};

    if (!fabric.Canvas.supports('toDataURL')) {
      //alert('This browser doesn\'t provide means to serialize canvas to an image');
    } else {
      var image_url = ""
      var self = this
      //this.ad_name = $("#"+this.currentIdInputName).val()
      var image_name = this.ad_name +  new Date().getTime().toString()
      if (this.is_upload_way === true) {
        imagesRef.putString($("#ad_image").attr('src').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
       //console.log('ok')
      
       storage.ref().child(imageRefStorage).getDownloadURL().then(url => {
          var xhr = new XMLHttpRequest();
   xhr.responseType = 'blob';
   xhr.onload = function(event) {
     var blob = xhr.response;
   };
   xhr.open('GET', url);
         xhr.send();
       
         const image_content = "";
         //console.log(self.FINAL_ARRAY_TO_SEND)
        self.adsService.saveAdOnFirebase(self.ad_group_id, self.ad_name, self.uid, url, image_content, self.FINAL_ARRAY_TO_SEND, size, self.ad_type).then(res => {
          //console.log('success')
          //console.log(res)
          self.isRoller = false
          window.location.reload(true)
          
        })
     })
       
     }); 
      } else {
        imagesRef.putString(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
       //console.log('ok')
      
       storage.ref().child(imageRefStorage).getDownloadURL().then(url => {
          var xhr = new XMLHttpRequest();
   xhr.responseType = 'blob';
   xhr.onload = function(event) {
     var blob = xhr.response;
   };
   xhr.open('GET', url);
         xhr.send();
       
         const image_content = JSON.stringify(self.canvas);
         //console.log(self.FINAL_ARRAY_TO_SEND)
        self.adsService.saveAdOnFirebase(self.ad_group_id, self.ad_name, self.uid, url, image_content, self.FINAL_ARRAY_TO_SEND, size, self.ad_type).then(res => {
          //console.log('success')
          //console.log(res)
          if (res != "error") {
            
            self.isRoller = false
              window.location.reload(true)
          } else {
            self.isRoller = false
          }
           
          
        })
     })
       
     }); 
      }

      
      
       
     
     
    
    } 
        
      }
    })
  }

defineBudgetFromAccount() {
    var montant = parseInt($("#montant").val())
    var newAccountValue = this.accountValue - montant
    if (montant > this.accountValue || montant < 10000) {
      $('#error_recharge').show()
    } else if (montant == null) {
      $('#error_recharge').show()
       
    } else {
      this.isRoller = true
      this.isPlacementBudgetFromAccount = false
      this.montant = montant
         this.http.post(SERVER_URL+'/setBudgetFromAccount', {
      'budgetId': this.budgetId,
           'amount': this.budget_to_place,
      'dure': this.dure_campagne,
    })
      .subscribe(
        res => {
          //console.log(res)
           this.notesService.updateNote(this.idC, { budget: this.budget_to_place , dailyBudget: res[0]['dailyBudget']}).then(() => {
             this.auth.updateUser(this.uid, {account_value: newAccountValue }).then(res => {
               
               Swal.fire({
                 title: 'Service Campagne!',
                 text: 'Budget mis à jour.',
                 type: 'success',
                 showCancelButton: false,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Ok'
               }).then((result) => {
                 if (result.value) {
                  this.isRoller = false
                 }else{
                   this.isRoller = false
                 }
               })
             })
                
              })
          
          
        },
        err => {
          Swal.fire({
      title: 'Service Campagne!',
      text: 'Erreur.',
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.value) {}
    })
        }
      );
    }
  }
  
  defineAmountAccountBeforeBudget() {
     $('#button_modal_define_budget').trigger('click')
    var self = this
    this.montant = $("#montant").val()
    if (this.montant < 20000) {
      $('#error_recharge').show()
    } else {
      
      $('#closeModalRecharge').trigger('click')
      var self = this
      this.isCreating = true
      setTimeout(function () {
    
        var btn = document.getElementById("budgetSet");
        var selector = pQuery(btn);
        (new PayExpresse({
          item_id: 1,
        })).withOption({
            requestTokenUrl: SERVER_URL+'/rechargeAmountBeforeBudgetFromAd/'+ self.ad_group_name+ "/"+self.idC+"/"+self.idA+"/"+self.ad_group_id+"/"+self.campagne_id+"/"+self.montant+"/"+self.id_ad_firebase,
            method: 'POST',
            headers: {
                "Accept": "application/json"
          },
       
          
            //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
            prensentationMode: PayExpresse.OPEN_IN_POPUP,
            didPopupClosed: function (is_completed, success_url, cancel_url) {
              self.isCreating = false
              if (is_completed === true) {
                  //alert(success_url)
                
                  //window.location.href = success_url; 
                } else {
                  self.isCreating = false
                    //window.location.href = cancel_url
                }
            },
            willGetToken: function () {
                //console.log("Je me prepare a obtenir un token");
                selector.prop('disabled', true);
                //var ads = []


            },
            didGetToken: function (token, redirectUrl) {
                //console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                selector.prop('disabled', false);
            },
            didReceiveError: function (error) {
                //alert('erreur inconnu');
                selector.prop('disabled', false);
            },
            didReceiveNonSuccessResponse: function (jsonResponse) {
                //console.log('non success response ', jsonResponse);
                //alert(jsonResponse.errors);
                selector.prop('disabled', false);
            }
        }).send({
            pageBackgroundRadianStart: '#0178bc',
            pageBackgroundRadianEnd: '#00bdda',
            pageTextPrimaryColor: '#333',
            paymentFormBackground: '#fff',
            navControlNextBackgroundRadianStart: '#608d93',
            navControlNextBackgroundRadianEnd: '#28314e',
            navControlCancelBackgroundRadianStar: '#28314e',
            navControlCancelBackgroundRadianEnd: '#608d93',
            navControlTextColor: '#fff',
            paymentListItemTextColor: '#555',
            paymentListItemSelectedBackground: '#eee',
            commingIconBackgroundRadianStart: '#0178bc',
            commingIconBackgroundRadianEnd: '#00bdda',
            commingIconTextColor: '#fff',
            formInputBackgroundColor: '#eff1f2',
            formInputBorderTopColor: '#e3e7eb',
            formInputBorderLeftColor: '#7c7c7c',
            totalIconBackgroundRadianStart: '#0178bc',
            totalIconBackgroundRadianEnd: '#00bdda',
            formLabelTextColor: '#292b2c',
            //alertDialogTextColor: '#333',
            //alertDialogConfirmButtonBackgroundColor: '#0178bc',
          //alertDialogConfirmButtonTextColor: '#fff',
          
        });
    }, 500)

      
      
      
    }
  }
  updateAdOnFirebase() {

    if (this.currentAdStatus == "") {
      this.isRoller = true
      var displayUrl = []
     var finalUrls = []
     var finalMobileUrls = []
     var finalAppUrls = []
      var name = $('#' + this.currentIdInputName).val()
      var image = $('#ad_image_modified').attr("src")
     var storage = firebase.app().storage("gs://comparez.appspot.com/");
      var storageRef = storage.ref();
   
      var imageRefStorage = this.uid + "/" + this.ad_name + new Date().getTime().toString() + ".png"
      //console.log(imageRefStorage)
     var imagesRef = storageRef.child(imageRefStorage);
     var metadata = {
   contentType: 'image/png',
  };
      var self = this
      displayUrl.push(this.FINAL_ARRAY_TO_SEND[0]['content'])

      if (this.currentAdType === 'UPLOAD') {
        //console.log('upload')
        //console.log(image)
        if (image.startsWith("https")==false) {
                             imagesRef.putString(image.replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
       //console.log('ok')
      
       storage.ref().child(imageRefStorage).getDownloadURL().then(url => {
          var xhr = new XMLHttpRequest();
   xhr.responseType = 'blob';
   xhr.onload = function(event) {
     var blob = xhr.response;
   };
   xhr.open('GET', url);
         xhr.send();
         self.currentImageUrl = url
       
        const image_content = JSON.stringify(self.canvas);
        self.adsService.updateAd(self.id_ad_firebase, {
     
      ad_name: name,
      url_image: url,
      displayUrl: displayUrl[0],
      finalUrls: displayUrl[0],
      finalMobileUrls: finalMobileUrls,
      finalAppUrls: finalAppUrls,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(res => {
          //console.log('success')
          //console.log(res)
          self.isRoller = false
      if(res=="ok"){
         Swal.fire({
        title: 'Modification du visuel',
        text: 'Visuel modifié avec succès',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          setTimeout(()=>{
            document.getElementById("closeModalViewModified").click()
          }, 1000)
          
              }
            })
      }
      
        }).catch(err=>{
           Swal.fire({
              title: 'Modification du visuel',
              text: 'Erreur Service !',
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {}
            })
        
        })
     })
       
     });
        } else {
                self.adsService.updateAd(self.id_ad_firebase, {
     
      ad_name: name,
      url_image: image,
      displayUrl: displayUrl[0],
      finalUrls: displayUrl[0],
      finalMobileUrls: finalMobileUrls,
      finalAppUrls: finalAppUrls,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(res => {
          //console.log('success')
      //console.log(res)
      self.isRoller = false
      if(res=="ok"){
         Swal.fire({
        title: 'Modification du visuel',
        text: 'Visuel modifié avec succès',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          setTimeout(()=>{
            document.getElementById("closeModalViewModified").click()
          }, 1000)
          
              }
            })
      }
      
    }).catch(err => {
          self.isRoller = false
           Swal.fire({
              title: 'Modification du visuel',
              text: 'Erreur Service !',
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {}
            })
        
        })
        }

      } else {
            if (!fabric.Canvas.supports('toDataURL')) {
      //alert('This browser doesn\'t provide means to serialize canvas to an image');
    } else {
    
      //$('#ad_image').attr("src", this.canvas.toDataURL('png'))
      ////console.log(this.canvas.toDataURL('png'))
      this.canvas.toDataURL('png').replace('data:image/png;base64,', '')
      ////console.log(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''))
      imagesRef.putString(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
       //console.log('ok')
      
       storage.ref().child(imageRefStorage).getDownloadURL().then(url => {
          var xhr = new XMLHttpRequest();
   xhr.responseType = 'blob';
   xhr.onload = function(event) {
     var blob = xhr.response;
   };
   xhr.open('GET', url);
         xhr.send();
         self.currentImageUrl = url
       
        const image_content = JSON.stringify(self.canvas);
        self.adsService.updateAd(self.id_ad_firebase, {
     
      ad_name: name,
      url_image: url,
      image_content: image_content,
      displayUrl: displayUrl[0],
      finalUrls: displayUrl[0],
      finalMobileUrls: finalMobileUrls,
      finalAppUrls: finalAppUrls,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(res => {
          //console.log('success')
          //console.log(res)
        self.isRoller = false
      if(res=="ok"){
         Swal.fire({
        title: 'Modification du visuel',
        text: 'Visuel modifié avec succès',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          setTimeout(()=>{
            document.getElementById("closeModalViewModified").click()
          }, 1000)
          
              }
            })
      }
      
    }).catch(err => {
          self.isRoller = false
           Swal.fire({
              title: 'Modification du visuel',
              text: 'Erreur Service !',
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {}
            })
        
        })
     })
       
     }); 
      
       
     
     
    
    } 
      }
    
    } else {


      
      var name = $('#ad_name_modify').val()
      var data_to_send = []
      this.getModifiedWebsites().then(res => {
        //console.log(res)
        if (res != "error") {
          //console.log(this.compareObjectsUrls(this.tabUpdatedCurrentFinalUrls, this.finalUrls))
          
          //console.log(this.tabUpdatedCurrentFinalUrls)
          //console.log(this.finalUrls)
          //var previous_content = JSON.parse(this.image_content)
      //var update_content = JSON.parse(this.new_image_content)
  
      //var comparaison_content = this.compareObjects(update_content, previous_content)
      var comparaison_url =  this.compareObjectsUrls(this.newfinalUrls, this.finalUrls)
          if (comparaison_url === true && name === this.ad_name) {
            Swal.fire({
              title: 'Modification du visuel',
              text: "Aucun changement n'a été détecté",
              type: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
               
          
              }
            })
          } else if (comparaison_url === false && name === this.ad_name) {
            Swal.fire({
              title: 'Modification du visuel',
              text: "Seul les urls de destination seront modifiées",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok, Modifier'
            }).then((result) => {
              if (result.value) {
                this.isRoller = true
                data_to_send.push({
                  "field": "finalUrls",
                  "fieldFirebase": "finalUrls",
                  "content": this.newfinalUrls,
                }, {
                  "field": "name",
                  "fieldFirebase": "ad_name",
                  "content": this.currentAdName
                }
                
                )

                this.removeAdBeforeUpdate(this.id_ad_firebase, this.ad_group_id, this.ad_id).then(res=>{
                  if (res != "error") {
                    
                    this.adsService.addAd(this.id_ad_firebase, this.ad_group_id, this.currentAdName, this.currentImageUrl, this.tabUpdatedCurrentFinalUrls, [], [], this.currentAdSize).then(res => {
                           if (res != "error") {
                             this.isRoller = false
                     Swal.fire({
              title: 'Modification du visuel',
              text: "Visuel modifié avec succès",
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.value) {
         setTimeout(()=>{
          document.getElementById("closeModalViewModified").click()
         }, 1000)
             
                
                } else {
                  this.isRoller = false
                  setTimeout(()=>{
                    document.getElementById("closeModalViewModified").click()
                  }, 1000)
              }
            })
                  } else {
                     Swal.fire({
              title: 'Modification du visuel',
              text: "Erreur service",
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'réessayer'
            }).then((result) => {
                if (result.value) {
                this.isRoller = false
         
             
                
                } else {
                  this.isRoller = false
              }
            })
                  }
                    })
                  }
                })

                
             
                
              } else {
                this.isRoller =false
              }
            })
          } else if (comparaison_url === true && name !== this.ad_name) {
            Swal.fire({
              title: 'Modification du visuel',
              text: "Seul le nom du visuel sera modifié",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok, Modifier'
            }).then((result) => {
                if (result.value) {
                this.isRoller = true
                  data_to_send.push({
                    "field": "name",
                    "fieldFirebase": "ad_name",
                   "content": name
                 }, {
                      "field": "finalUrls",
                   "fieldFirebase": "finalUrls",
                  "content": this.finalUrls
                })
               
                this.removeAdBeforeUpdate(this.id_ad_firebase, this.ad_group_id, this.ad_id).then(res=>{
                  if (res != "error") {
                    
                    this.adsService.addAd(this.id_ad_firebase, this.ad_group_id, name, this.currentImageUrl, this.finalUrls, [], [], this.currentAdSize).then(res => {
                           if (res != "error") {
                     Swal.fire({
              title: 'Modification du visuel',
              text: "Visuel modifié avec succès",
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.value) {
                this.isRoller = false
         
             
                
                } else {
                  this.isRoller = false
              }
            })
                  } else {
                     Swal.fire({
              title: 'Modification du visuel',
              text: "Erreur service",
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'réessayer'
            }).then((result) => {
                if (result.value) {
                this.isRoller = false
         
             
                
                } else {
                  this.isRoller = false
              }
            })
                  }
                    })
                  }
                })
             
                
                } else {
                  this.isRoller = false
              }
            })
          } else{
         Swal.fire({
              title: 'Modification du visuel',
              text: "Le nom ainsi que les urls de redirections du visuel seront modifés !",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok, Modidifier'
            }).then((result) => {
                  if (result.value) {
                this.isRoller = true
                    data_to_send.push(
                      {
                        "field": "name",
                        "fieldFirebase": "ad_name",
                      "content": name
                    },
                    {
                      "field": "finalUrls",
                      "fieldFirebase": "finalUrls",
                      "content": this.newfinalUrls
                    
                      })

                this.removeAdBeforeUpdate(this.id_ad_firebase, this.ad_group_id, this.ad_id).then(res=>{
                  if (res != "error") {
                    
                    this.adsService.addAd(this.id_ad_firebase, this.ad_group_id, name, this.currentImageUrl, this.tabUpdatedCurrentFinalUrls, [], [], this.currentAdSize).then(res => {
                           if (res != "error") {
                     Swal.fire({
              title: 'Modification du visuel',
              text: "Visuel modifié avec succès",
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.value) {
                this.isRoller = false
         
             
                
                } else {
                  this.isRoller = false
              }
            })
                  } else {
                     Swal.fire({
              title: 'Modification du visuel',
              text: "Erreur service",
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'réessayer'
            }).then((result) => {
                if (result.value) {
                this.isRoller = false
         
             
                
                } else {
                  this.isRoller = false
              }
            })
                  }
                    })
                  }
                })
             
                
              }else{
                this.isRoller =false
              }
            })
      }
        }
      })
      
       
      
     
    }
     
  }


  uploadFileOnFirebase(name: any): Promise<any> {
    return new Promise(resolve => {
      var storage = firebase.app().storage("gs://comparez.appspot.com/");
    var storageRef = storage.ref();
    var imageRefStorage = this.uid + "/" + name + new Date().getTime().toString()+ ".png"
    var imagesRef = storageRef.child(imageRefStorage);
    var metadata = {
  contentType: 'image/png',
};
    
    if (!fabric.Canvas.supports('toDataURL')) {
      //alert('This browser doesn\'t provide means to serialize canvas to an image');
      resolve('error')
    } else {
      var image_url = ""
      var self = this
      //this.ad_name = $("#"+this.currentIdInputName).val()
      var image_name = this.ad_name +  new Date().getTime().toString()
      //$('#ad_image').attr("src", this.canvas.toDataURL('png'))
      ////console.log(this.canvas.toDataURL('png'))
      this.canvas.toDataURL('png').replace('data:image/png;base64,', '')
      ////console.log(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''))
      imagesRef.putString(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
        //console.log('ok')
      
        storage.ref().child(imageRefStorage).getDownloadURL().then(url => {
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function (event) {
            var blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
          self.currentImageUrl = url
        
          resolve('ok')
       
        });
      
      })  
     
     
    
    } 
   })
  }

  compareObjects (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (value['objects'].length !== other['objects'].length) return false;

  // Compare two items
    var isEqual = function (value, other) {

	// ...

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};
	var compare = function (value, other) {

		// Get the object type
		var itemType = Object.prototype.toString.call(value);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(value, other)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(other)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (value.toString() !== other.toString()) return false;
			} else {
				if (value !== other) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};

  compareObjectsUrls (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  
	if (value.length !== other.length) return false;

  // Compare two items
    var isEqual = function (value, other) {

	// ...

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};
	var compare = function (value, other) {

		// Get the object type
		var itemType = Object.prototype.toString.call(value);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(value, other)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(other)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (value.toString() !== other.toString()) return false;
			} else {
				if (value !== other) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};

 /*  saveImage() {
    this.saveCanvasToJSON()
    const image_content = JSON.stringify(this.canvas);
   
    this.getWebsites().then(res => {
      //console.log(res)
      if (res != 'error') {
         var storage = firebase.app().storage("gs://comparez.appspot.com/");
    var storageRef = storage.ref();
    this.ad_name=$('#'+this.idOfAdName).val()
    var imageRefStorage = this.uid + "/" + this.ad_name + new Date().getTime().toString()+ ".png"
    var imagesRef = storageRef.child(imageRefStorage);
    var metadata = {
  contentType: 'image/png',
};
    
    if (!fabric.Canvas.supports('toDataURL')) {
      //alert('This browser doesn\'t provide means to serialize canvas to an image');
    } else {
    
      this.ad_name = $("#"+this.idOfAdName).val()
      var image_name = this.ad_name +  new Date().getTime().toString()
      $('#ad_image').attr("src", this.canvas.toDataURL('png'))
      //console.log(this.canvas.toDataURL('png'))
      this.canvas.toDataURL('png').replace('data:image/png;base64,', '')
      //console.log(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''))
     imagesRef.putString(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function(snapshot) {
         
       //console.log('Uploaded a base64 string!');
       
     }); 
      
      this.adsService.addAd(this.ad_group_id, this.ad_name, this.uid, imageRefStorage, image_content, this.FINAL_ARRAY_TO_SEND).then(res => {
        //console.log('success')
        //console.log(res)
      })
       
     
     
    
    } 
        
      }
    })
    
    
    

  } */

  buildAd() {

    var self = this
if (this.budget === 0) {
       
        Swal.fire({
          title: "Service Visuel",
          text: "Le budget de votre campagne est insuffisant définissez le pour comment à diffuser",
          type: 'warning',
          showCancelButton: true,
           confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Définir mon budget '
        }).then((result) => {
          if (result.value) {
            this.notesService.getSingleCampaignWithId(this.uid, this.campagne_id).then(res => {
              
              this.router.navigate(["/edit",res['name'], this.idC , this.campagne_id ]).then(() => {
            })
            })
     
          }
        })
} else {
  this.isCreating = true
   this.adsService.addAd(this.id_ad_firebase, this.ad_group_id, this.ad_name, this.image_url, this.finalUrls, this.finalAppUrls, this.finalMobileUrls, this.currentAdSize).then(res => {
        //console.log('success')
     //console.log(res)
     if (res != "error") {
       this.isCreating = false
       window.location.reload(true)
          
     } else {
       this.isCreating = false
       
     }
      })
   
} 
    
    
/*      this.isCreating = true
   this.adsService.addAd(this.id_ad_firebase, this.ad_group_id, this.ad_name, this.image_url, this.finalUrls, this.finalAppUrls, this.finalMobileUrls, this.currentAdSize).then(res => {
        //console.log('success')
     //console.log(res)
     if (res != "error") {
       this.isCreating = false
       window.location.reload(true)
          
     } else {
       this.isCreating = false
       
     }
      }) */
   
    
    
/* 
   */
  }
  setHttp(link) {
    if (link.search(/^http[s]?\:\/\//) == -1) {
        link = 'https://' + link;
    }
    return link;
}
  checkIfIsEmptyFinalUrls(item_id: string): Promise<any> {
    
    return new Promise(resolve => {
       var urls_destination = []
      var urls = $('#'+item_id).val()
  
      if (urls.toString() != '') {
    
           /*  if (urls.includes(',')) {
      var tab = urls.toString().split(',')
      tab.pop()
    
      for (let i = 0; i < tab.length; i++) {
        
        //console.log(`urls ${tab}`)
        //console.log(`actuelle url ${tab[i]}`)
     
        if (this.validURL(tab[i]) == true) {
          //console.log(tab[i] + ' est valide')
          var url = this.setHttp(tab[i])
          urls_destination.push(url)
          this.FINAL_ARRAY_TO_SEND.push({
          "lib": "finalUrls",
          "content": urls_destination
          })
           resolve('ok')
        } else {
          this.url_errors.push({
            "url": tab[i],
            "text": "est une url invalide"
          })
          //console.log(tab[i] + " est invalide")
          resolve('error')
        }
    }
    } else {
  
    } */
                    var check = this.validURL(urls)
             
      
      if (check === true) {
        //console.log(urls + " valide")
          var url = this.setHttp(urls)
          urls_destination.push(url)
         this.FINAL_ARRAY_TO_SEND.push({
          "lib": "finalUrls",
          "content": urls_destination
         })
         resolve('ok')
      } else {
        this.url_errors.push({
          "url": urls,
          "text": "est une url invalide"
        })
        //console.log(urls + ' invalide, vérifier les urls renseignées')
        resolve('error')
      }
      } else {
        //alert(urls)
         this.url_errors.push({
          "url": "",
          "text": "Url de destination ne peut être vide"
        })
      }
      



   })
    
  }
  

  checkIfIsEmptyModifiedFinalUrls(): Promise<any> {
    
    return new Promise(resolve => {
       var urls_destination = []
      var urls = $('#finalUrlsmodify').val()
      //alert(urls)
      if (urls !== '') {
           var check = this.validURL(urls)
             
      
      if (check === true) {
        //console.log(urls + " valide")
          var url = this.setHttp(urls)
        urls_destination.push(url)
        this.newfinalUrls = urls_destination
         this.tabUpdatedCurrentFinalUrls.push(url)
         this.FINAL_ARRAY_TO_SEND.push({
          "lib": "finalUrls",
          "content": urls_destination
         })
         resolve('ok')
      } else {
        this.url_errors.push({
          "url": urls,
          "text": "est une url invalide"
        })
        //console.log(urls + ' invalide, vérifier les urls renseignées')
        resolve('error')
      }
      }else{
         this.url_errors.push({
          "url": "",
          "text": "Url de destination ne peut être vide"
        })
      }
      



   })
    
  }
  
 


  
  getWebsites(item_id: string): Promise<any> {
    return new Promise(resolve => {
      
      this.FINAL_ARRAY_TO_SEND = []

      if ($('#' + this.currentIdInputName).val() == "") {
        //alert("nom du visuel ne peut être vide")
      } else {
        this.ad_name = $('#'+this.currentIdInputName).val()
        var mobile_apps = this.apps
     this.checkIfIsEmptyFinalUrls(item_id).then(res => {
              if (res != 'error') {
         
               
                resolve(res)
              }else{
                
                resolve('error')
                
              }
              })
      }
     
    })
  
    
   
  }

  getModifiedWebsites(): Promise<any> {
    return new Promise(resolve => {
      
      this.FINAL_ARRAY_TO_SEND = []
     
      var mobile_apps = this.apps
   this.checkIfIsEmptyModifiedFinalUrls().then(res => {
            if (res != 'error') {
       
            
              resolve(res)
            }else{
              
              resolve('error')
              
            }
            })
    })
  
    
   
  }


  /*   getWebsites(): Promise<any> {
    return new Promise(resolve => {
      
      this.FINAL_ARRAY_TO_SEND = []
      var nationals = this.nationals_websites
      var internationals = this.internationals_websites
      var ad_sites = this.ads_websites
      var mobile_apps = this.apps
      this.checkIfIsEmptyNationals(nationals).then(res => {
        if (res != 'error') {
          this.checkIfIsEmptyFinalUrls().then(res => {
            if (res != 'error') {
              this.checkIfIsEmptyInternationals(internationals)
              this.checkIfIsEmptyAdsWebsites(ad_sites)
              this.checkIfIsEmptyMobileApps(mobile_apps)
              resolve(res)
            }else{
              
              resolve('error')
              
            }
            })
           
         
        } else {
          this.nationals_errors = "Site national obligatoire !"
          resolve('error')
        }
      })
    })
  
    
   
  } */
  public onSubmitCustomer() {
    //alert('Your information has been submitted successfully. :-)\n\n' + JSON.stringify(this.model))
  }
  

  handleKeyPress(key, event): void {
        switch (key) {
            case 37:
                this.moveSelectedObject(this.Direction.LEFT, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 38:
                this.moveSelectedObject(this.Direction.UP, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 39:
                this.moveSelectedObject(this.Direction.RIGHT, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 40:
                this.moveSelectedObject(this.Direction.DOWN, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 46:
                this.removeSelected();
                event.preventDefault();
                break;
            case 65:
                if (event.ctrlKey) {
                    this.selectAllObjects();
                }
                event.preventDefault();
                break;
        }
    }

    /**
     * Select all objects/layers in canvas
     *
     */
    selectAllObjects(): void {
        const objs = this.canvas.getObjects().map(function (o) {
            return o.set('active', true);
        });

        const group = new fabric.Group(objs, {
            originX: 'center',
            originY: 'center'
        });

        this.canvas._activeObject = null;
        this.canvas.setActiveGroup(group.setCoords()).renderAll();
    }

    /**
     * Move the current selected object
     *
     * @param direction
     * @param value
     */
    moveSelectedObject(direction, value): void {
        const activeGroup = this.canvas.getActiveGroup();
        const activeObject = this.canvas.getActiveObject();

        if (activeObject) {
            switch (direction) {
                case this.Direction.LEFT:
                    activeObject.setLeft(activeObject.getLeft() - value);
                    break;
                case this.Direction.UP:
                    activeObject.setTop(activeObject.getTop() - value);
                    break;
                case this.Direction.RIGHT:
                    activeObject.setLeft(activeObject.getLeft() + value);
                    break;
                case this.Direction.DOWN:
                    activeObject.setTop(activeObject.getTop() + value);
                    break;
            }

            activeObject.setCoords();
            this.canvas.renderAll();
        } else if (activeGroup) {
            switch (direction) {
                case this.Direction.LEFT:
                    activeGroup.setLeft(activeGroup.getLeft() - value);
                    break;
                case this.Direction.UP:
                    activeGroup.setTop(activeGroup.getTop() - value);
                    break;
                case this.Direction.RIGHT:
                    activeGroup.setLeft(activeGroup.getLeft() + value);
                    break;
                case this.Direction.DOWN:
                    activeGroup.setTop(activeGroup.getTop() + value);
                    break;
            }

            activeGroup.setCoords();
            this.canvas.renderAll();
        }
    }

    /**
     * Recalculate layer list for layer panel
     *
     */
    updateLayers(): void {
        this.layers = this.canvas.getObjects();
    }

    /**
     * Set layer as active one
     *
     * @param layer
     */
    selectLayer(layer: any): void {
        this.canvas.setActiveObject(layer);
    }

    /**
     * Show/Hide layer
     *
     * @param layer
     */
    toggleLayer(layer: any): void {
        layer.visible = !layer.visible;
    }

    /**
     * Locks/Unlocks layer
     *
     */
    lockLayer(): void {
        const layer = this.canvas.getActiveObject();
        layer.evented = !layer.evented;
        layer.selectable = !layer.selectable;
    }

    /**
     * Updates layer index
     *
     */
    updateLayerSort(): void {
        this.layers.forEach((layer, ind) => {
            this.canvas.moveTo(layer, ind);
        });
    }

    /*------------------------Block elements------------------------*/

    /**
     * Size - set canvas dimensions
     *
     * @param event
     */
    changeSize(event: any): void {
        this.canvas.setWidth(this.size.width);
        this.canvas.setHeight(this.size.height);
    }
  
  oppendCurrentEditor():Promise <any>{
    return new Promise(resolve => {
      if (this.currentEditor ===true) {
       
        this.currentEditor = false
        this.iconEditor = "icon-chevron-up"
        this.text_modify = "annuler la modification"
      
      } else {
        
     
         this.currentEditor = true
        this.iconEditor = "icon-chevron-down"
        this.text_modify = "modifier"

        resolve("ok")
      }
    })
  }
  toggleCurrentUploadBlock() {

    if (this.currentAdStatus.toString() === '') {
      
      if ($("#blockUploadModified").css('display') === 'none') {
         
        $("#blockUploadModified").css({ 'display': 'block' })
        this.isUploadModified = true
        this.iconEditor = "icon-chevron-up"
        this.text_modify = "Annuler la modification"
        this.currentIdInputName = this.idOfAdNameNotPublishUpload
        this.currentIdInputDisplay = this.idOfDisplayUrlNotPublishUpload
        
      } else {
        $("#blockUploadModified").css({ 'display': 'none' })
        this.iconEditor = "icon-chevron-down"
        this.text_modify = "modifier"
        this.currentIdInputName = ""
        this.currentIdInputDisplay = ""
        this.isUploadModified = false
      }
    } else {
      if (this.modifyPublishAd===false) {
         
      this.modifyPublishAd=true
        this.iconEditor = "icon-chevron-up"
        this.text_modify = "Annuler la modification"
        
      } else {
         this.modifyPublishAd=true
        this.iconEditor = "icon-chevron-down"
        this.text_modify = "modifier"
      }
      
    }
    
  }
  
  async toggleCurrentEditor() {
    var self = this
    self.isEditor = false
      if (this.currentEditor == true) {
       
        this.currentEditor = false
        this.iconEditor = "icon-chevron-down"
        this.text_modify = "modifier"
        this.currentIdInputName = ""
        this.currentIdInputDisplay = ""      
      } else {
        
    
         this.currentEditor = true
        this.iconEditor = "icon-chevron-up"
        this.text_modify = "annuler la modification"
      
    
   
        if (this.canva_state == false) {
       self.isCreating= true
       setTimeout(function(){ 
       
       self.handleCanvas(parseInt(self.currentAdSize[0]['width']), parseInt(self.currentAdSize[0]['height']))
       
       }, 2000);
        setTimeout(function(){ 
        self.loadCanvasFromJSON()
        self.isCreating = false
        }, 2000);
           this.currentIdInputName = this.idOfAdNameNotPublishCreatives
        this.currentIdInputDisplay = this.idOfdisplayUrlNotPublishCreatives
        } else {
          self.isCreating = true
          setTimeout(function () { 
          
       self.canvas.clear()
        }, 2000);
       setTimeout(function(){ 
         
         self.handleCanvas(parseInt(self.currentAdSize[0]['width']), parseInt(self.currentAdSize[0]['height']))
         
       }, 2000);
       setTimeout(function(){ 
        
         self.loadCanvasFromJSON()
         self.isCreating  =false
       }, 2000);
          this.currentIdInputName = this.idOfAdNameNotPublishCreatives
        this.currentIdInputDisplay = this.idOfdisplayUrlNotPublishCreatives
    }
     /*  this.isCreating = false */
       
     /*  this.addText()
        this.removeSelected() */
      }
   
    
 
   
    }
    
 /*    if (this.currentEditor == true) {
      this.currentEditor = false
      this.iconEditor = "icon-chevron-down"
      
    }else{
      this.currentEditor = true
      this.iconEditor = "icon-chevron-up"

      
    
    } */
  

    /**
     * Size - apply preset to canvas
     *
     * @param event
     */
    changeToPreset(event: any): void {
        this.size.width = this.selectedSize.width;
        this.size.height = this.selectedSize.height;
        this.changeSize(event);
    }

    /**
     * Text - add text element
     *
     */
   /*  addText(): void {
        const textString = this.textString;
        const text = new fabric.IText(textString, {
            left: 10,
            top: 10,
            fontFamily: 'Arial',
            angle: 0,
            fill: '#000000',
            scaleX: 1,
            scaleY: 1,
            fontWeight: '',
            hasRotatingPoint: true,
            title: textString
        });
        this.extend(text, this.randomId());
        this.canvas.add(text);
        this.selectItemAfterAdded(text);
        this.textString = '';

        this.updateLayers();
    } */

    /**
     * Image - Add a dom image to canvas
     *
     * @param event
     */
    getImgPolaroid(event: any): void {
        const el = event.target;
        fabric.Image.fromURL(el.src, (image) => {
            image.set({
                left: 10,
                top: 10,
                angle: 0,
                padding: 10,
                cornersize: 10,
                hasRotatingPoint: true,
                title: el.title,
                lockUniScaling: true
            });
            image.scaleToWidth(150);
            image.scaleToHeight(150);
            this.extend(image, this.randomId());
            this.canvas.add(image);
            this.selectItemAfterAdded(image);
        });

        this.updateLayers();
    }

    /**
     * Image - Add an external image to canvas
     *
     * @param url
     */
    addImageOnCanvas(url): void {
        if (url) {
            fabric.Image.fromURL(url, (image) => {
                image.set({
                    left: 10,
                    top: 10,
                    angle: 0,
                    padding: 10,
                    cornersize: 10,
                    hasRotatingPoint: true,
                    title: this.urlName
                });
                image.scaleToWidth(Math.round(this.size.width / 2));
                this.extend(image, this.randomId());
                this.canvas.add(image);
                this.selectItemAfterAdded(image);
            });

            this.updateLayers();
        }
    }

   
    /**
     * Image - Clears custom user image selection/file handler
     *
     * @param url
     */
    removeWhite(url): void {
        this.url = '';
    };


    /**
     * Shape - Add custom shape
     *
     * @param shape - can be rectangle, square, triangle, circle, star
     */
    addFigure(shape): void {
        let add: any;
        switch (shape) {
            case 'rectangle':
                add = new fabric.Rect({
                    width: 200, height: 100, left: 10, top: 10, angle: 0,
                    fill: '#3f51b5',
                    title: 'Rectangle'
                });
                break;
            case 'square':
                add = new fabric.Rect({
                    width: 100, height: 100, left: 10, top: 10, angle: 0,
                    fill: '#4caf50',
                    title: 'Carrée'
                });
                break;
            case 'triangle':
                add = new fabric.Triangle({
                    width: 100, height: 100, left: 10, top: 10, fill: '#2196f3', title: 'triangle'
                });
                break;
            case 'circle':
                add = new fabric.Circle({
                    radius: 50, left: 10, top: 10, fill: '#ff5722', title: 'Cercle'
                });
                break;
            case 'star':
                add = new fabric.Polygon([
                    {x: 350, y: 75},
                    {x: 380, y: 160},
                    {x: 470, y: 160},
                    {x: 400, y: 215},
                    {x: 423, y: 301},
                    {x: 350, y: 250},
                    {x: 277, y: 301},
                    {x: 303, y: 215},
                    {x: 231, y: 161},
                    {x: 321, y: 161}
                    ], {
                    top: 10,
                    left: 10,
                    fill: '#ff5722',
                    stroke: '#ff5722',
                    strokeWidth: 2,
                    title: 'Polygone'
                });
                break;
        }

        this.extend(add, this.randomId());
        this.canvas.add(add);
        this.selectItemAfterAdded(add);
        this.updateLayers();
    }


    // CANVAS ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Canvas - clear current selection
     */
    cleanSelect(): void {
        this.canvas.deactivateAllWithDispatch().renderAll();
        this.updateLayers();
    }

    /**
     * Canvas - select item
     *
     * @param obj
     */
    selectItemAfterAdded(obj): void {
        this.canvas.deactivateAllWithDispatch().renderAll();
        this.canvas.setActiveObject(obj);
    }

    /**
     * Canvas - update background color
     *
     */
    setCanvasFill(): void {
        if (!this.props.canvasImage) {
            this.canvas.backgroundColor = this.props.canvasFill;
            this.canvas.renderAll();
        }
    }

    /**
     * Helper
     *
     * @param obj
     * @param id
     */
    extend(obj, id): void {
        obj.toObject = (function (toObject) {
            return function () {
                return fabric.util.object.extend(toObject.call(this), {
                    id: id
                });
            };
        })(obj.toObject);
    }

    /**
     * Canvas - update background image
     *
     */
    setCanvasImage(): void {
        const self = this;
        if (this.props.canvasImage) {
            this.canvas.setBackgroundColor({source: this.props.canvasImage, repeat: 'repeat'}, function () {
                self.canvas.renderAll();
            });
        }

        this.updateLayers();
    }

    /**
     * Helper - Generates a random id, no dupe checks
     *
     * @returns {number}
     */
  randomId(): number {
  
  /*   if (this.canva_state == false) {
          this.handleCanvas()
    } */
        return Math.floor(Math.random() * 999999) + 1;
    }


    // ELEMENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns styleName from object
     *
     * @param styleName
     * @param object
     * @returns {any}
     */
    getActiveStyle(styleName, object): any {
        object = object || this.canvas.getActiveObject();
        if (!object) {
            return '';
        }

        return (object.getSelectionStyles && object.isEditing)
            ? (object.getSelectionStyles()[styleName] || '')
            : (object[styleName] || '');
    }

    /**
     * Sets styleName to given value
     *
     * @param styleName
     * @param value
     * @param object
     */
    setActiveStyle(styleName, value, object): void {
        object = object || this.canvas.getActiveObject();
        if (!object) {
            return;
        }

        if (object.setSelectionStyles && object.isEditing) {
            const style = {};
            style[styleName] = value;
            object.setSelectionStyles(style);
            object.setCoords();
        } else {
            object.set(styleName, value);
        }

        object.setCoords();
        this.canvas.renderAll();
    }

    /**
     * Get property for active object
     *
     * @param name
     * @returns {any}
     */
    getActiveProp(name): any {
        const object = this.canvas.getActiveObject();
        if (!object) {
            return '';
        }
        return object[name] || '';
    }

    /**
     * Set property for active object
     *
     * @param name
     * @param value
     */
    setActiveProp(name, value): void {
        const object = this.canvas.getActiveObject();
        if (!object) {
            return;
        }
        object.set(name, value).setCoords();
        this.canvas.renderAll();
    }

    /**
     * Clones the currently active object and sets the close as active
     *
     */
    clone(): void {
        const activeObject = this.canvas.getActiveObject(),
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
                case 'polygon':
                    clone = new fabric.Polygon(activeObject.toObject());
                    break;
                case 'i-text':
                    clone = new fabric.IText('', activeObject.toObject());
                    break;
                case 'image':
                    clone = fabric.util.object.clone(activeObject);
                    break;
            }
            if (clone) {
                  clone.set({left: 10, top: 10, title: 'Element cloné ' + activeObject.title});
                this.canvas.add(clone);
                this.selectItemAfterAdded(clone);
            }

            this.updateLayers();
        }
    }


    getId(): void {
        this.props.id = this.canvas.getActiveObject().toObject().id;
    }

    setId(): void {
        const val = this.props.id;
        const complete = this.canvas.getActiveObject().toObject();
        // //console.log(complete);
        this.canvas.getActiveObject().toObject = () => {
            complete.id = val;
            return complete;
        };
    }

    getTitle(): void {
        this.props.title = this.getActiveProp('title');
    }

    setTitle(): void {
        this.setActiveProp('title', this.props.title);
    }

    getOpacity(): void {
        this.props.opacity = this.getActiveStyle('opacity', null) * 100;
    }

    setOpacity(): void {
        this.setActiveStyle('opacity', parseInt(this.props.opacity, 10) / 100, null);
    }

    getFill(): void {
        this.props.fill = this.getActiveStyle('fill', null);
    }

    setFill(): void {
        this.setActiveStyle('fill', this.props.fill, null);
    }

    getStroke(): void {
        this.props.stroke = this.getActiveStyle('stroke', null);
    }

    setStroke(): void {
        this.setActiveStyle('stroke', this.props.stroke, null);
    }

    getStrokeWidth(): void {
        this.props.strokeWidth = this.getActiveStyle('strokeWidth', null);
    }

    setStrokeWidth(): void {
        this.setActiveStyle('strokeWidth', this.props.strokeWidth, null);
    }

    getLineHeight(): void {
        this.props.lineHeight = this.getActiveStyle('lineHeight', null);
    }

    setLineHeight(): void {
        this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
    }

    getCharSpacing(): void {
        this.props.charSpacing = this.getActiveStyle('charSpacing', null);
    }

    setCharSpacing(): void {
        this.setActiveStyle('charSpacing', this.props.charSpacing, null);
    }

    getFontSize(): void {
        this.props.fontSize = this.getActiveStyle('fontSize', null);
    }

    setFontSize(): void {
        this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
    }

    getBold(): void {
        this.props.fontWeight = this.getActiveStyle('fontWeight', null);
    }

    setBold(): void {
        this.props.fontWeight = !this.props.fontWeight;
        this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
    }

    getFontStyle(): void {
        this.props.fontStyle = this.getActiveStyle('fontStyle', null);
    }

    setFontStyle(): void {
        this.props.fontStyle = !this.props.fontStyle;
        this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
    }

    setWebfont(): void {
        this.props.fontSize = this.font.size;
        this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
        this.props.fontFamily = this.font.family;
        this.setActiveProp('fontFamily', this.props.fontFamily);
    }

    getTextDecoration(): void {
        this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
    }

    setTextDecoration(value): void {
        let iclass = this.props.TextDecoration;
        if (iclass.includes(value)) {
            iclass = iclass.replace(RegExp(value, 'g'), '');
        } else {
            iclass += ` ${value}`;
        }
        this.props.TextDecoration = iclass;
        this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
    }

    hasTextDecoration(value): void {
        return this.props.TextDecoration.includes(value);
    }

    getTextAlign(): void {
        this.props.textAlign = this.getActiveProp('textAlign');
    }

    setTextAlign(value): void {
        this.props.textAlign = value;
        this.setActiveProp('textAlign', this.props.textAlign);
    }

    getFontFamily(): void {
        this.props.fontFamily = this.getActiveProp('fontFamily');
    }

    setFontFamily(): void {
        this.setActiveProp('fontFamily', this.props.fontFamily);
    }

    setFillColor(swatch: any): void {
        this.palettes.selected = swatch;
        this.props.fill = swatch.key;
        this.setFill();
    }

    // SYSTEM ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Remove currently selected element from canvas
     *
     */
    removeSelected(): void {
        const activeObject = this.canvas.getActiveObject(),
            activeGroup = this.canvas.getActiveGroup();

        if (activeObject) {
            this.canvas.remove(activeObject);
        } else if (activeGroup) {
            const objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
            const self = this;
            objectsInGroup.forEach(function (object) {
                self.canvas.remove(object);
            });
        }

        this.updateLayers();
    }

    /**
     * Send active object to front
     *
     */
    bringToFront(): void {
        const activeObject = this.canvas.getActiveObject(),
            activeGroup = this.canvas.getActiveGroup();

        if (activeObject) {
            activeObject.bringToFront();
        } else if (activeGroup) {
            const objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
            objectsInGroup.forEach((object) => {
                object.bringToFront();
            });
        }
    }

    /**
     * Send active object to back
     *
     */
    sendToBack(): void {
        const activeObject = this.canvas.getActiveObject(),
            activeGroup = this.canvas.getActiveGroup();

        if (activeObject) {
            activeObject.sendToBack();
            // activeObject.opacity = 1;
        } else if (activeGroup) {
            const objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
            objectsInGroup.forEach((object) => {
                object.sendToBack();
            });
        }
    }

    /**
     * Handle canvas reset/clear
     *
     */
    confirmClear(): void {
        if (confirm('Voulez vous vraiment tout éffacer ?')) {
            this.canvas.clear();
        }
    }


    handleDragStart(event): boolean {
        this.dragObject = event.target;
        return false;
    }

    handleDragOverCanvas(event): boolean {
        event.stopPropagation();
        return false; // prevenDefault;
    }

    /**
     *
     * @param event
     */
    handleDropOnCanvas(event): boolean {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        const el = this.dragObject;
        fabric.Image.fromURL(el.src, (image) => {
            image.set({
                originX: 'center',
                originY: 'center',
                left: event.layerX,
                top: event.layerY,
                angle: 0,
                padding: 10,
                cornersize: 10,
                hasRotatingPoint: true,
                title: el.title,
                lockUniScaling: true
            });
            image.scaleToWidth(150);
            image.scaleToHeight(150);
            this.extend(image, this.randomId());
            this.canvas.add(image);
            this.selectItemAfterAdded(image);
        });

        this.updateLayers();
        this.dragObject = null;
        return false;
    }

    /**
     * Rasterize PNG
     *
     */
    rasterize(): void {
        if (!fabric.Canvas.supports('toDataURL')) {
            //alert('Votre navigateur ne supporte pas cette opération.');
        } else {
            // chrome workaround: https://stackoverflow.com/a/45700813
            const _w = window.open();
            _w.document.write('<iframe src="' + this.canvas.toDataURL('png') +
                '" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;"' +
                'allowfullscreen></iframe>');
        }
    }

    /**
     * Rasterize SVG
     *
     */
    rasterizeSVG(): void {
        // chrome workaround: https://stackoverflow.com/a/45700813
        const _w = window.open();
        _w.document.write('<iframe src="data:image/svg+xml;utf8,' + encodeURIComponent(this.canvas.toSVG()) +
            '" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;"' +
            ' allowfullscreen></iframe>');
    };


    /**
     * Stringify canvas objects and save in localStorage
     *
     */
    saveCanvasToJSON(): void {
        const json = JSON.stringify(this.canvas);
        localStorage.setItem('ffFabricQuicksave', json);
    }

    /**
     * Load canvas from JSON data
     *
     */
 loadCanvasFromJSON(): void {
      
        const CANVAS = localStorage.getItem('ffFabricQuicksave');
    //console.log(typeof(CANVAS))
    //console.log(typeof(this.currentCanvasContent))
        // and load everything from the same json
       
        this.canvas.loadFromJSON(this.currentCanvasContent, () => {

            // making sure to render canvas at the end
            this.canvas.renderAll();

            // TODO: Retrieve additional data and bind accordingly
            //console.log(this.canvas);
        });

    };

    /**
     * Stringify canvas objects
     *
     */
    rasterizeJSON(): void {
        this.json = JSON.stringify(this.canvas, null, 2);
    }

    removeSelectedColorSwatch(): void {
        if (this.palettes.selected.type === undefined) {
            const _id = this.palettes.selected.id;
            this.palettes.custom = this.palettes.custom.filter(function (swatch) {
                return swatch.id !== _id;
            });
            this.savePalette();
        }
    }

    addToCustomPalette(type: string): void {
        switch (type) {
            case 'fill':
                this.palettes.custom.push({
                    key: this.props.fill,
                    value: this.props.fill,
                    id: this.palettes.custom.length
                });
                break;
            case 'stroke':
                this.palettes.custom.push({
                    key: this.props.stroke,
                    value: this.props.stroke,
                    id: this.palettes.custom.length
                });
                break;
        }
        this.savePalette();
    }

    savePalette(): void {
        const json = JSON.stringify(this.palettes.custom);
        localStorage.setItem('ffFabricCP', json);
    }

    loadPalette(): void {
        const palettes = localStorage.getItem('ffFabricCP');
        this.palettes.custom = palettes === null ? [] : JSON.parse(palettes);
    }

    updateColorPresets(presets) {
        // Update
    }

    /**
     * Reset panel visibility
     *
     */
    resetPanels() {
        this.textEditor = false;
        this.imageEditor = false;
        this.shapeEditor = false;
    }

    /** HELPERS ***********************/
    componentToHex(c): string {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    rgbToHex(r, g, b): string {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    hexToRgb(hex): any {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
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

  get pattern() {
    return this.adForm.get('pattern');
  }
 
  onChangePattern() {
    this.pattern.patchValue(this.pattern.value);
  }
 

  validURL(str) {
  var pattern = new RegExp('^(https:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
  }
  
   isUrl(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}
  //Block "Size"

  changeAdStatus(id: string, adgroup_id: string, ad_id: string, last_status: string) {
    Swal.fire({
      title: "Status du visuel",
      text: "Voulez vous modifier le status de votre visuel ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#26a69a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier!'
    }).then((result) => {
      if (result.value) {
        /*  */
        this.isCreating = true
        this.http.post(SERVER_URL+'/changeAdStatus', {
          'ad_group_id': adgroup_id,
          'ad_id': ad_id,
            'last_status': last_status
          })

          .subscribe(
            res => {
              //console.log(res)

              this.adsService.updateAd(id, {
                status: res[0]['status']
              }).then(res => {
                Swal.fire(
                  'Modifier!',
                  "Status du visuel modifié.",
                  'success'
                ).then(res => {
                  this.isCreating = false
                })
              })

            },
            err => {
              this.isCreating = false
              Swal.fire({
                title: "Service Visuel!",
                text: 'Erreur.',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {}
              })
            }
          );


      }
    })
  }

  removeAdFirebase(id: string){
      Swal.fire({
      title: "Service Visuel",
      text: "Voulez vous supprimer ce visuel ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#26a69a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        this.isCreating = true
        this.adsService.deleteAd(id).then(res => {
          this.isCreating = false
        })
      }
    })
  }

  removeAd(id: string, adgroup_id: string, ad_id: string) {
    Swal.fire({
      title: "Service Visuel",
      text: "Voulez vous supprimer ce visuel ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#26a69a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        /*  */
        this.isCreating = true
        this.http.post(SERVER_URL+'/removeAd', {
          'ad_group_id': adgroup_id,
          'ad_id': ad_id

          })

          .subscribe(
            res => {
              //console.log(res)

              this.adsService.deleteAd(id).then(res => {
                Swal.fire(
                  'Supprimer!',
                  "Visuel supprimé avec succès!",
                  'success'
                ).then(res => {
                  this.isCreating = false
                })
              })

            },
            err => {
              this.isCreating = false
              Swal.fire({
                title: "Service Visuel!",
                text: 'Erreur.',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {}
              })
            }
          );

      }
    })
  }


  removeAdBeforeUpdate(id: string, adgroup_id: string, ad_id: string): Promise<any> {
    return new Promise(resolve => {
      this.http.post(SERVER_URL+'/removeAd', {
        'ad_group_id': adgroup_id,
        'ad_id': ad_id

      })

        .subscribe(
          res => {
            //console.log(res)
            if (res[0]['status'] == "ok") {
              
              resolve('ok')
            }
          }
            )
              
        
   
    })
  }

  goAdSettings(id_ad_firebase: string, ad_name: string, ad_group_id: string, ad_id: string, status: string, image_url: string, finalUrls: any, finalAppUrls: any, finalMobileUrls:any,  image_content: any, referenceId: any, size: any, ad_type: any) {
    
    this.isAdBlock = true
    this.isEditor = false
    this.list_ad = false
    this.currentAdName = ad_name
    this.currentImageUrl = image_url
    this.currentCanvasContent = image_content
    this.ad_group_id = ad_group_id
    this.id_ad_firebase = id_ad_firebase
    this.image_url = image_url
    this.image_content = image_content
    this.ad_id = ad_id
    this.currentAdStatus = status
    this.finalUrls = finalUrls
    this.finalAppUrls = finalAppUrls
    this.ad_name = ad_name
    this.finalMobileUrls = finalMobileUrls
    this.referenceId = referenceId
    this.currentAdSize = size
    this.currentAdType = ad_type
    
    this.currentIdInputName = this.idOfAdNameModify
    this.currentIdInputDisplay = this.idOfDisplayModify
    
    this.iconEditor = "icon-chevron-down"
    //console.log(finalUrls.length)
    if (finalUrls.length == 0) {
      this.currentFinalUrls = ""
    } else if(finalUrls.length == 1) {
      this.currentFinalUrls = finalUrls[0].toString()
      
    } else{
       for (let i = 0; i < finalUrls.length - 1; i++) {
         
        //console.log(finalUrls)
        //console.log(finalUrls[i])
        this.currentFinalUrls += finalUrls[i].toString() + ","
      
      }
    }
    

  }

  publish() {
    var jQuery = $
if (this.budget === 0) {
       
        Swal.fire({
          title: "Service Visuel",
          text: "Le budget de votre campagne est insuffisant définissez le pour comment à diffuser",
          type: 'warning',
          showCancelButton: true,
           confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Définir mon budget '
        }).then((result) => {
          if (result.value) {
            jQuery('#button_modal_define_budget').trigger('click')
          }
        })
} else {
 jQuery('#button_modal_define_budget').trigger('click')
   
}
}

  generate(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

  defineAmountAccount() {
    var self = this
    this.montant = $("#montant").val()
    if (this.montant < 10000) {
      $('#error_recharge').show()
    } else if (this.montant > 1000000) {
       Swal.fire({
          title: "Service rechargement",
          text: "Montant trop élevé",
          type: 'warning',
          showCancelButton: true,
           confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'réessayer '
        }).then((result) => {
          if (result.value) {
          
          }
        })
    } else{
      var key = this.generate(10)
      localStorage.setItem(key, this.montant.toString())
      $('#closeModalRecharge').trigger('click')
      var self = this
      Swal.fire({
          title: "Service rechargement",
          html: "<span>Vous allez procéder au paiement dans quelques instant saisissez le <strong class='adafri font-weight-bold adafri-police-18'>#144#391#</strong> sur votre téléphone pour payer avec orange money<span>",
          type: 'info',
          showCancelButton: true,
           confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
        confirmButtonText: 'Procéder au paiement',
          cancelButtonText: "annuler"
        }).then((result) => {
          if (result.value) {
                 this.isCreating = true
      setTimeout(function () {
    
        var btn = document.getElementById("amountSet");
        var selector = pQuery(btn);
        (new PayExpresse({
          item_id: 1,
        })).withOption({
            requestTokenUrl: SERVER_URL+'/rechargeAmount/'+ self.montant+"/"+key,
            method: 'POST',
            headers: {
                "Accept": "application/json"
          },
       
          
            //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
            prensentationMode: PayExpresse.OPEN_IN_POPUP,
            didPopupClosed: function (is_completed, success_url, cancel_url) {
              self.isCreating = false
              if (is_completed === true) {
                  alert(success_url)
                
                  //window.location.href = success_url; 
                } else {
                  self.isCreating = false
                    //window.location.href = cancel_url
                }
            },
            willGetToken: function () {
                console.log("Je me prepare a obtenir un token");
                selector.prop('disabled', true);
                //var ads = []


            },
            didGetToken: function (token, redirectUrl) {
                console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                selector.prop('disabled', false);
            },
            didReceiveError: function (error) {
                alert('erreur inconnu');
                selector.prop('disabled', false);
            },
            didReceiveNonSuccessResponse: function (jsonResponse) {
                console.log('non success response ', jsonResponse);
                alert(jsonResponse.errors);
                selector.prop('disabled', false);
            }
        }).send({
            pageBackgroundRadianStart: '#0178bc',
            pageBackgroundRadianEnd: '#00bdda',
            pageTextPrimaryColor: '#333',
            paymentFormBackground: '#fff',
            navControlNextBackgroundRadianStart: '#608d93',
            navControlNextBackgroundRadianEnd: '#28314e',
            navControlCancelBackgroundRadianStar: '#28314e',
            navControlCancelBackgroundRadianEnd: '#608d93',
            navControlTextColor: '#fff',
            paymentListItemTextColor: '#555',
            paymentListItemSelectedBackground: '#eee',
            commingIconBackgroundRadianStart: '#0178bc',
            commingIconBackgroundRadianEnd: '#00bdda',
            commingIconTextColor: '#fff',
            formInputBackgroundColor: '#eff1f2',
            formInputBorderTopColor: '#e3e7eb',
            formInputBorderLeftColor: '#7c7c7c',
            totalIconBackgroundRadianStart: '#0178bc',
            totalIconBackgroundRadianEnd: '#00bdda',
            formLabelTextColor: '#292b2c',
            alertDialogTextColor: '#333',
            alertDialogConfirmButtonBackgroundColor: '#0178bc',
          alertDialogConfirmButtonTextColor: '#fff',
          
        });
    }, 500)
          }
        })


      
      
      
    }
  }
  
  
  defineBudget() {
    var self = this
   
      
      $('#button_modal_define_budget').trigger('click')
      var self = this 
    this.isCreating = true
    var url = SERVER_URL+'/payBudget/' + self.montant + "/" + self.budget_to_place + "/" + self.budgetId + "/" + self.idC + "/" + self.dure_campagne + "/" + self.ad_group_name + "/" + self.idA + "/" + self.ad_group_id + "/" + self.campagne_id + "/" + self.id_ad_firebase
    //alert(url)
      setTimeout(function () {
    
        var btn = document.getElementById("budgetSet");
        var selector = pQuery(btn);
        (new PayExpresse({
          item_id: 1,
        })).withOption({
            requestTokenUrl: url,
            method: 'POST',
            headers: {
                "Accept": "application/json"
          },
       
          
            //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
            prensentationMode: PayExpresse.OPEN_IN_POPUP,
            didPopupClosed: function (is_completed, success_url, cancel_url) {
              self.isCreating = false
              if (is_completed === true) {
                 
                
                  //window.location.href = success_url; 
                } else {
                  self.isCreating = false
                    //window.location.href = cancel_url
                }
            },
            willGetToken: function () {
                //console.log("Je me prepare a obtenir un token");
                selector.prop('disabled', true);
                //var ads = []


            },
            didGetToken: function (token, redirectUrl) {
                //console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                selector.prop('disabled', false);
            },
            didReceiveError: function (error) {
              //alert('erreur inconnu');
              self.isCreating = false
                selector.prop('disabled', false);
            },
            didReceiveNonSuccessResponse: function (jsonResponse) {
                //console.log('non success response ', jsonResponse);
                //alert(jsonResponse.errors);
                selector.prop('disabled', false);
            }
        }).send({
            pageBackgroundRadianStart: '#0178bc',
            pageBackgroundRadianEnd: '#00bdda',
            pageTextPrimaryColor: '#333',
            paymentFormBackground: '#fff',
            navControlNextBackgroundRadianStart: '#608d93',
            navControlNextBackgroundRadianEnd: '#28314e',
            navControlCancelBackgroundRadianStar: '#28314e',
            navControlCancelBackgroundRadianEnd: '#608d93',
            navControlTextColor: '#fff',
            paymentListItemTextColor: '#555',
            paymentListItemSelectedBackground: '#eee',
            commingIconBackgroundRadianStart: '#0178bc',
            commingIconBackgroundRadianEnd: '#00bdda',
            commingIconTextColor: '#fff',
            formInputBackgroundColor: '#eff1f2',
            formInputBorderTopColor: '#e3e7eb',
            formInputBorderLeftColor: '#7c7c7c',
            totalIconBackgroundRadianStart: '#0178bc',
            totalIconBackgroundRadianEnd: '#00bdda',
            formLabelTextColor: '#292b2c',
            //alertDialogTextColor: '#333',
            //alertDialogConfirmButtonBackgroundColor: '#0178bc',
          //alertDialogConfirmButtonTextColor: '#fff',
          
        });
    }, 500)

      
      
      
    
   }


   handleIfValide() {
    //console.log('keyup')
    $('#error_recharge').hide()
    var montant = $("#montant").val()
    if (montant < 20000) {
    this.montant = 0
      $('#error_recharge').show()
    } else if(montant==""){
    this.montant = 0
       $('#error_recharge').show()
    } else{
     this.montant = montant
      //var budget_to_place_in_dollar = budget_to_place * 550
      
      
    }
   }
  
  handleIfBudgetToPlaceFromAccountIsValid() {
    $('#error_recharge').hide()
    var montant = parseInt($("#montant").val())


    if (montant > this.accountValue) {
      this.montant = 0
       this.number_of_impressions_simulated = 0
      this.my_gain = 0
      this.budget_to_place = 0
      $('#error_recharge').show()
    } else if(montant==null){
      this.montant = 0
      this.number_of_impressions_simulated = 0
      this.my_gain = 0
      this.budget_to_place = 0
       $('#error_recharge').show()
    } else if(montant < 10000){
       this.montant = 0
       this.number_of_impressions_simulated = 0
      this.my_gain = 0
      this.budget_to_place = 0
      $('#error_recharge').show()
    }else{
     this.my_gain = (20 * montant) / 100
      this.budget_to_place = montant - this.my_gain
      this.number_of_impressions_simulated = (this.budget_to_place *1000) / 33.3
      this.montant = montant
      
      
    }
  }

   handleBudgetPlacement() {
     this.isAccountRechargement = false
     this.isPlacementBudgetFromAccount = false
    Swal.fire({
        title: 'Service Campagne',
        text: "Vous allez placer un budget pour votre campagne, veuillez vous assurez que les dates de début et de fins sont définies aux dates voulues",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Je confirme ces dates'
      }).then((result) => {
        if (result.value) {
          this.modifyDate = false
          this.isSetBudget = true
         }
      })
    
    
   }
  handlePlaceBudgetFromSolde() {
    this.isAccountRechargement = false
    this.isSetBudget = false
    Swal.fire({
        title: 'Service Campagne',
        text: "Vous allez placer un budget pour votre campagne, veuillez vous assurez que les dates de début et de fins sont définies aux dates voulues",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Je confirme ces dates'
      }).then((result) => {
        if (result.value) {
          this.modifyDate = false
          this.isPlacementBudgetFromAccount = true
         }
      })
  }
  
   handleAccountRechargement() {
   
     this.modifyDate = false;
     this.isSetBudget = false
     this.isPlacementBudgetFromAccount = false;
     this.isAccountRechargement = true
    
    
  }
  parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1], mdy[0]);
}

 datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
 }
  
 
 
  OpenModifyDateCampaign() {
    this.modifyDate = true
    this.isSetBudget = false
    this.isAccountRechargement = false
    this.isPlacementBudgetFromAccount = false
    $("#finalButtonPublier").hide()
    $("#dateBlock").hide()
  }
  CloseUpdateCampaignDate() {
    this.modifyDate = false
    $("#finalButtonPublier").show()
    $("#dateBlock").show()

  }
  CloseBudgetOperation() {
    this.isSetBudget = false
  }
  ClosePlaceBudgetFromAccountValue() {
    this.isPlacementBudgetFromAccount = false
  }
   CloseRechargeAccountOperation() {
    this.isAccountRechargement = false
  }
  onEndDateChange(args) {
    //console.log(args.value)
    if (args.value != undefined) {
      this.newEndDate = args.value.toString()
      
    } else {
      this.newEndDate = ""
    }
  
    }
  
  onStartDateChange(args) {
    //console.log(args.value)
    if (args.value != undefined) {
      this.newStartDate = args.value.toString()
      //console.log(this.newStartDate)
      
    } else {
      this.newStartDate = ""
    }
      }
  updateCampaignDate() {
    
    var parsed = JSON.parse(JSON.stringify(MONTH))
    
    var tabStart = this.startDateFrench.split("/")
    var tabEnd = this.endDateFrench.split("/")
    var frenchDateStart = tabStart[2] + "-" + tabStart[1] + "-" + tabStart[0]
    var frenchDateEnd = tabEnd[2] + "-" + tabEnd[1] + "-" + tabEnd[0]
    //console.log(date)
    //console.log(new Date(frenchDateStart))
    //console.log(new Date(frenchDateEnd))
    var today_date = new Date().getDate()
    var today_day = new Date().getDay()
    var years = new Date().getFullYear()
    var month = new Date().getMonth() + 1
    new Date().valueOf()
    if (month < 10 && today_date < 10) {
      this.today =  years.toString() + "-0" + month.toString() + "-0" + today_date.toString()
    } else if (month < 10 && today_date > 10) {
      this.today = years.toString() + "-0" + month.toString() +"-"+ today_date.toString()
    } else if (month > 10 && today_date < 10) {
      this.today =  years.toString() + month.toString() + "-0" + today_date.toString()
    } else {
      this.today = years.toString() + "-"+ month.toString() +"-"+ today_date.toString()
      
    }
    var date = new Date();
    
    if (this.newEndDate == "" && this.newStartDate == "") {
      Swal.fire({
        title: 'Service Campagne',
        text: 'Renseigner au moins une date',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) { }
      })
    } else if (this.newEndDate == "" && this.newStartDate != "") {
      var DATE_START = this.newStartDate.split(' ')
      var DATE_ELEMENT_START = parsed[0][DATE_START[1]]
      var _day_start = DATE_START[2]
      var _month_start = DATE_ELEMENT_START.number
      var _years_start = DATE_START[3]
      this.UpdatedStartDate = `${_day_start}/${_month_start}/${_years_start}`
      var date_start = `${_years_start}${_month_start}${_day_start}`
      var date_start_check = `${_years_start}-${_month_start}-${_day_start}`
      Swal.fire({
        title: 'Service Campagne',
        text: 'Date de début de campagne uniquement changer',
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirmer"
      }).then((result) => {
        if (result.value) {
          if (new Date(frenchDateStart) < date) {
                
            Swal.fire({
              title: 'Service Campagne',
              text: 'campagne déjà commencé Vous ne pouver plus modifier la date de début',
              type: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmer'
            }).then((result) => {
              if (result.value) {
             
              }
            })
          } else if (new Date(frenchDateEnd) < date) {
            
            Swal.fire({
              title: 'Service Campagne',
              text: 'Campagne déjà arrivée à terme',
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) { }
            })
          } else if (new Date(frenchDateStart) == date) {
            Swal.fire({
              title: 'Service Campagne',
              text: 'Cette campagne à déjà commencer à diffuser vous pouver uniquement modifier la date de fin',
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) { }
            })
          } else if (new Date(frenchDateEnd) == date) {
            Swal.fire({
              title: 'Service Campagne',
              text: "Cette campagne se termine aujourd'hui vous pouver uniquement modifier la date de fin",
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) { }
            })
              
          } else {
            if (new Date(date_start_check) > new Date()) {
              Swal.fire({
                title: 'Service Campagne',
                text: "Date valide",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok, confirmer'
              }).then((result) => {
                  this.modifyDate = false
                 this.isRoller = true
                if (result.value) {
                   this.notesService.updateStartDate(this.idC, this.campagne_id, date_start, this.UpdatedStartDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
              })
            
            } else if (date_start_check == this.today) {
              
              Swal.fire({
                title: 'Service Campagne',
                text: "Campagne commence aujourd'hui",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok, confirmer'
              }).then((result) => {
                 this.modifyDate = false
                 this.isRoller = true
                if (result.value) {
                   this.notesService.updateStartDate(this.idC, this.campagne_id, date_start, this.UpdatedStartDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
              })
            } else if (new Date(date_start_check) > new Date(frenchDateEnd)) {
              Swal.fire({
                title: 'Service Campagne',
                text: "date de début ne peut être après la date de fin",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
          
          
                }
              })
            } else if (date_start_check == frenchDateEnd) {
              Swal.fire({
                title: 'Service Campagne',
                text: "Date de début et date de fin ne peuvent être définies à la même date",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
          
          
                }
              })
            } else {
               //alert(date_start_check+" "+ this.today)
              Swal.fire({
                title: 'Service Campagne',
                text: "Date de début"+new Date(date_start_check)+" ne peut être définie dans le passé",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) { }
              })
            }
      
 
          }
          
        }
      }
    
      )
      
    } else if (this.newStartDate == "" && this.newEndDate != "") {
    
      var DATE_END = this.newEndDate.split(' ')
     
      var DATE_ELEMENT_END = parsed[0][DATE_END[1]]
      var _day_end = DATE_END[2]
      var _month_end = DATE_ELEMENT_END.number
      var _years_end = DATE_END[3]
      this.UpdatedEndDate = `${_day_end}/${_month_end}/${_years_end}`
      var date_end = `${_years_end}${_month_end}${_day_end}`
      var date_end_check = `${_years_end}-${_month_end}-${_day_end}`
        Swal.fire({
        title: 'Service Campagne',
        text: 'Date de début inchangé, date de fin changée',
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirmer"
      }).then((result) => {
        if (result.value) {
          if (new Date(frenchDateEnd) < date) {
         Swal.fire({
                title: 'Service Campagne',
                text: "Cette campagne est déjà arrivée à terme",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
          
          
                }
              })
    } else if (new Date(frenchDateEnd) == date) { 
      Swal.fire({
                title: 'Service Campagne',
                text: "Cette campagne se termine aujourd'hui, vous voulez prolonger sa date de fin",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok, prolonger'
      }).then((result) => {
                this.modifyDate = false
                
                this.isRoller = true
                if (result.value) {
                   this.notesService.updateEndDate(this.idC, this.campagne_id, date_end, this.UpdatedEndDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
              })
    } else {
            if (new Date(date_end_check) < new Date()) {
          Swal.fire({
                title: 'Service Campagne',
                text: "Date de fin ne peut être définie dans le passé",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  
          
                }
              })
      
            } else if (date_end_check== this.today) {
                Swal.fire({
                title: 'Service Campagne',
                text: "Date de fin définie à la date d'aujourd'hui",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                this.modifyDate = false
                
                this.isRoller = true
                if (result.value) {
                   this.notesService.updateEndDate(this.idC, this.campagne_id, date_end, this.UpdatedEndDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
              })
         
      } else if (new Date(date_end_check) < new Date(frenchDateStart)) {
            Swal.fire({
                title: 'Service Campagne',
                text: "Date de fin ne peut être définie avant la date de début",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  
          
                }
              })
      } else if (date_end_check==frenchDateStart) {
      
              Swal.fire({
                title: 'Service Campagne',
                text: "Date de début et date de fin ne peuvent être définies à la même date",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  
          
                }
              })
      } else{
         Swal.fire({
                title: 'Service Campagne',
                text: "Vous êtes sur des données saisies ?",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, sûr!'
              }).then((result) => {
                this.modifyDate = false
                
                this.isRoller = true
                if (result.value) {
                   this.notesService.updateEndDate(this.idC, this.campagne_id, date_end, this.UpdatedEndDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
              })
      }
      
 
    }
        }
      })
     
      
    } else {
      var DATE_START = this.newStartDate.split(' ')
      var DATE_ELEMENT_START = parsed[0][DATE_START[1]]
      var _day_start = DATE_START[2]
      var _month_start = DATE_ELEMENT_START.number
      var _years_start = DATE_START[3]
      this.UpdatedStartDate = `${_day_start}/${_month_start}/${_years_start}`
      var date_start = `${_years_start}${_month_start}${_day_start}`
      var date_start_check = `${_years_start}-${_month_start}-${_day_start}`

       var DATE_END = this.newEndDate.split(' ')
     
      var DATE_ELEMENT_END = parsed[0][DATE_END[1]]
      var _day_end = DATE_END[2]
      var _month_end = DATE_ELEMENT_END.number
      var _years_end = DATE_END[3]
      this.UpdatedEndDate = `${_day_end}/${_month_end}/${_years_end}`
      var date_end = `${_years_end}${_month_end}${_day_end}`
      var date_end_check = `${_years_end}-${_month_end}-${_day_end}`
      if (frenchDateStart == this.today ) {
       Swal.fire({
              title: 'Service Campagne',
              text: "Cette campagne Commence aujourd'hui vous pouver uniquement modifier la date de fin",
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) { }
            })
    } else if (new Date(frenchDateEnd) < new Date()) {
      Swal.fire({
              title: 'Service Campagne',
              text: "Cette campagne est arrivée à terme",
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) { }
            })
    } else if (new Date(frenchDateStart) < new Date()) {
    Swal.fire({
                title: 'Service Campagne',
                text: "Cette campagne à déjà commencé à diffuser, seul sa date de fin sera changée",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok, changer'
              }).then((result) => {
                 this.modifyDate = false
                
                this.isRoller = true
                if (result.value) {
                   this.notesService.updateEndDate(this.idC, this.campagne_id, date_end, this.UpdatedEndDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
              })
    } else if (frenchDateEnd == this.today) { 
        Swal.fire({
                title: 'Service Campagne',
                text: "Cette campagne se termine aujourd'hui, vous pouvez prolonger sa date de fin",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok, prolonger'
              }).then((result) => {
                this.modifyDate = false
                
                this.isRoller = true
                if (result.value) {
                   this.notesService.updateEndDate(this.idC, this.campagne_id, date_end, this.UpdatedEndDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
              })
      } else {
        if(date_start_check == this.today && new Date(date_end_check) > new Date()){
           Swal.fire({
                title: 'Service Campagne',
                text: "La campagne va commencer aujourd'hui",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok, confirmer'
           }).then((result) => {
                  this.modifyDate = false
                 this.isRoller = true
                if (result.value) {
                  this.notesService.updateDates(this.idC, this.campagne_id, date_start, this.UpdatedStartDate, date_end, this.UpdatedEndDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
               
              })
        
     
      }else if (new Date(date_start_check) < new Date()  && new Date(date_end_check) > new Date()) {
        Swal.fire({
          title: 'Service Campagne',
          text: "Date de début ne peut être définie dans le passé",
          type: 'error',
          showCancelButton: false,
           confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
                  
          
          }
        })
      }else if(new Date(date_end_check) < new Date()){
          Swal.fire({
                title: 'Service Campagne',
                text: "Date de fin ne peut être définie dans le passé",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  
          
                }
              })
      } else if (new Date(date_start_check) > new Date(date_end_check)) {
   
         Swal.fire({
                title: 'Service Campagne',
                text: "date de début ne peut être après la date de fin",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  
          
                }
              })
      } else if (date_start_check==this.today && date_end_check != this.today) {
    
       Swal.fire({
                title: 'Service Campagne',
                text: "Campagne va commencer aujourd'hui",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok, commencer'
              }).then((result) => {
                 this.modifyDate = false
                 this.isRoller = true
                if (result.value) {
                  this.notesService.updateDates(this.idC, this.campagne_id, date_start, this.UpdatedStartDate, date_end, this.UpdatedEndDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
              })
      }else if (date_end_check == this.today) {
        
          Swal.fire({
                title: 'Service Campagne',
                text: "Impossible de finir une campagne qui n'a pas commencé à diffuser",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  
          
                }
              })
      } else if (date_end_check==date_start_check) {
      
          Swal.fire({
                title: 'Service Campagne',
                text: "Date de début et date de fin ne peuvent être définies à la même date",
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  
          
                }
              })
      
        } else {
           Swal.fire({
                title: 'Service Campagne',
                text: "Vous êtes sur des données saisies ?",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, sûr!'
              }).then((result) => {
                 this.modifyDate = false
                 this.isRoller = true
                if (result.value) {
                  this.notesService.updateDates(this.idC, this.campagne_id, date_start, this.UpdatedStartDate, date_end, this.UpdatedEndDate).then(res=>{
                     if (res != "error") {
                       this.isRoller = false
                       this.modifyDate = true
                     }
                   })
          
                }
              })
      
      }
      
 
    }
    }
    
    
   



    
  
   
    

   
    /* var today_date = new Date().getDate()
    var today_day = new Date().getDay()
    var years = new Date().getFullYear()
    var month = new Date().getMonth() + 1
    
    if (month < 10 && today_date < 10) {
      this.today = "0" + today_date.toString() + "/0" + month.toString() + "/" + years.toString()
    } else if (month < 10 && today_date > 10) {
      this.today = today_date.toString() + "/0" + month.toString() + "/" + years.toString()
    } else if (month > 10 && today_date < 10) {
      this.today = "0" + today_date.toString() + "/" + month.toString() + "/" + years.toString()
    } else {
      this.today = today_date.toString() + "/" + month.toString() + "/" + years.toString()
    }


    //console.log(`startDate: ${this.startDate}, updatedStartDate: ${this.UpdatedStartDate}`)
    //console.log(`endDate: ${this.endDate}, updatedEndDate: ${this.UpdatedEndDate}`)
    //console.log(`startDateFrench: ${this.startDateFrench.replace("/", "-").replace("/", "-")}, endDateFrench: ${this.endDateFrench.replace("/", "-").replace("/", "-")}`)
    //console.log(this.today)
 */
  }


  
  setStartDate(): Promise<any> {
    return new Promise(resolve => {
      var DATE = this.newStartDate.split(' ')
  
    var parsed = JSON.parse(JSON.stringify(MONTH))
    var DATE_ELEMENT = parsed[0][DATE[1]]
    var day = DATE[2]
    var month = DATE_ELEMENT.number
    var years = DATE[3]


      //this.startDate = `${day}/${month}/${years}`
      this.UpdatedStartDate = `${day}/${month}/${years}`
    var date = `${years}${month}${day}`
    this.isCreating = true
if (this.startDate == date || this.endDate == date) {
     /*    //console.log(`start date from firebase: ${value['startDate']} end date from firebase: ${value['endDate']}`)
      //console.log(`end date from me: ${date}`)  */
       resolve('error')
        
      } else {
  this.notesService.updateStartDate(this.idC, this.campagne_id, date, this.UpdatedStartDate)
  //console.log(this.idC)
          
        resolve('ok')
      }
    })
    
  
    
  }

  setEndDate(): Promise<any> {
    return new Promise(resolve => {
      var DATE = this.newEndDate.split(' ')
  
    var parsed = JSON.parse(JSON.stringify(MONTH))
    var DATE_ELEMENT = parsed[0][DATE[1]]
    var day = DATE[2]
    var month = DATE_ELEMENT.number
    var years = DATE[3]


      //this.endDate = `${day}/${month}/${years}`
      this.UpdatedEndDate = `${day}/${month}/${years}`
    var date = `${years}${month}${day}`
    this.isCreating = true
if (this.endDate == date || this.startDate == date) {
     /*    //console.log(`start date from firebase: ${value['startDate']} end date from firebase: ${value['endDate']}`)
      //console.log(`end date from me: ${date}`)  */
          resolve('error')
          

      } else {
        this.notesService.updateEndDate(this.idC, this.campagne_id, date, this.UpdatedEndDate)
        resolve('ok')
      }
    })
  }
  retourRechargement() {
    this.directBudget = false
    this.choose = true
  }
  initAdd() {
  /*  this.init_choose_ad_size = true */
    document.getElementById("v-pills-add-ad-tab").click()
  }
 
  handleSimulatedImpressionsCount() {
    //console.log('keyup')
    $('#error_recharge').hide()
    this.isSimulation = true
    var montant = $("#montant").val()
    if (montant < 10000) {
      this.number_of_impressions_simulated = 0
      this.my_gain = 0
      this.budget_to_place = 0
      $('#error_recharge').show()
    } else if(montant==""){
      this.number_of_impressions_simulated = 0
      this.my_gain = 0
      this.budget_to_place = 0
       $('#error_recharge').show()
    } else{
      this.my_gain = (20 * montant) / 100
      this.budget_to_place = montant - this.my_gain
      this.number_of_impressions_simulated = (this.budget_to_place *1000) / 33.3
      this.montant = montant
      //var budget_to_place_in_dollar = budget_to_place * 550
      
      
    }
  }
  
}
