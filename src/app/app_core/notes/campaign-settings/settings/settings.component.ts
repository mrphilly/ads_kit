import {
  Component,
  OnInit,
  Input,
  AfterViewInit,ViewChild, Inject, Renderer2
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSnackBar, NativeDateAdapter, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatCalendar, MatTable } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats} from '@angular/material/core';

import {
  loadCldr,
  L10n
} from "@syncfusion/ej2-base";

import {
  database
} from 'firebase';

import * as FusionCharts from 'fusioncharts';

import { ModulesList } from '../../menu';
import {
  NotesService
} from '../../notes.service';
import {
  AuthService
} from '../../../core/auth.service';
import {SERVER} from '../../../../../environments/environment'
import Swal from 'sweetalert2'
import * as $ from 'jquery'
import { AdGroupService } from '../../ad-groupe.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router'
import { Ads } from '../../ads.service'
import {
  AdGroup
} from '../../ad_group.models'
import * as CryptoJS from 'crypto-js'
import { FormControl, Validators, FormGroup, FormBuilder, FormGroupName } from '@angular/forms' 
import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { MccColorPickerItem, MccColorPickerService } from 'material-community-components'
import {Font} from 'ngx-font-picker';
import { Annonces } from '../../annonces.models'
import 'fabric';
import { app, firestore } from 'firebase'
import { ImageModifedComponent } from '../image-modified.component'
import {ImageCreateComponent} from '../image-create.component'
declare const fabric: any



/* const dataUrl =
  SERVER.url+"/campaignReport/"+; */
const schemaUrl =
  'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/schema.json';
declare var require: any;
declare const pQuery: any
declare const PayExpresse: any
declare const particlesJS: any; 
const MAX_BUDGET_VALUE = 10000001
const MIN_BUDGET_VALUE = 9999


export class CRITERION_SCHEDULE {
  id?:any;
  dayEN?: any;
  dayFR?: any;
  startHour?: any;
  startMinute?: any;
  endHour?:any;
  endMinute?: any;
  start_hour_text?:any;
  end_hour_text?: any;
  criterion_id?:any;
  criterion_type?: any;
}

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return date.toDateString();
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};
export interface JSONDATE {
  selectedDate: string;
}


const SERVER_URL = SERVER.url
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
export interface SCHEDULE_INTERFACE {
  id: string;
  dayEN: string;
  dayFR: string;
  endHour: string;
  endMinute: string;
  end_hour_text: string;
  startHour: string;
  startMinute: string;
  start_hour_text: string;
  
}
type AdsFields = 'name' | 'finalUrls';
type FormErrors = { [u in AdsFields]: string };

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
   providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide:  DateAdapter, useClass: AppDateAdapter, deps: [MAT_DATE_LOCALE]},
   {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ],
})
  
export class SettingsComponent {
  previousButton: any;
  isButtonClicked = true
    @ViewChild(MatCalendar) startDateCalendar: MatCalendar<Date>
   @ViewChild(MatPaginator) paginator: MatPaginator;
  dataL: any;
  selectedStartDate: any;
  startDateText = ""
  endDateText = ""
  SELECTED_CAMPAIGN_SCHEDULE = []
/* displayedColumns = ['select', 'name', 'status', "Paramétrer"]; */
  displayedColumnsCampaign = ["status", "budget", "zones", "impressions", "clics", "costs"]
  displayedColumnsPlacement = ["websites", "delete"]
  displayedColumnsAges = ["ages"]
  displayedColumnsGender = ["genres"]
  displayedColumnsDevice = ["devices"]
  SELECTED_PLACEMENT = []
  adScheduleSelectEndHourDisabled = true
  adScheduleSelectStartHourDisabled = false
  SCHEDULE_DATA: SCHEDULE_INTERFACE[] = []
  DAYS_CAMPAIGN = []
  scheduleValid = false
  currentFinalUrl = ""
  startDateFrenchSelected = ""
  endDateFrenchSelected = ""
  startDateEnglishSelected = ""
  endDateEnglishSelected = ""
  startDateFrenchModel = ""
  spinnerUpdateSchedule = false
  spinnerDeletePlacement = false
    currentDaySelectedId = ""
  currentDaySelectedFR = ""
  currentDaySelectedEN = ""
  currentStartHourText = ""
  currentStartHourHour = ""
  currentStartHourMinute = ""
  currentEndHourText = ""
  currentEndHourHour = ""
  currentEndHourMinute = ""
  startHourSelected = []
  endHourSelected = []
  endScheduleTab = []
  spinnerAddNewAdsSchedule = false
  dataSourceList = new MatTableDataSource<AdGroup>([])
  selection = new SelectionModel<AdGroup>(true, []);
  selection_schedule = new SelectionModel<CRITERION_SCHEDULE>(true, []);
  openedSideNav = true
loadProgress = false
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceList.filter = filterValue;
  }
  walletAction  = ""
dataSourceSchedules = []
  /** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  console.log(this.selection.selected)
  console.log(this.dataSource.data)
  const numRows = this.dataSourceList.data.length 
  console.log(numSelected)
  return numSelected === numRows; 
  }
  @ViewChild('tableSCHEDULE') tableSCHEDULE: MatTable<SCHEDULE_INTERFACE>;
  titleBlock = "Paramétrer la campagne"
  showHome = true
  userProfile = false
  isCampaignPause = false
  MODIFIED_IMAGE_UPLOAD_NAME = ""
  MODIFIED_IMAGE_CREATIVE_NAME = ""
  MODIFIED_UPLOAD_IMAGE = ""
  MODIFIED_CREATIVE_IMAGE = ""
  createCampaign = false
  blockPrincipal = true
  blockCreatives = false
  blockListCreatives = false
  updateScheduleBlock = false
  dateCampaignForm: FormGroup;
  emplacement: FormGroup;
  ageForm: FormGroup;
  genreForm: FormGroup;
  deviceForm: FormGroup;
  location: FormGroup;
  adForm: FormGroup;
  form: FormGroup;
  dayScheduleModify: FormGroup;
  daySchedule: FormGroup;
  daysSchedule = []
  rowScheduleDisabled = false
  progressBarEnableDisableCampaign = false
  buttonEnableCampaignDisabled = true
  buttonDisableCampaign = true
  spinnerTargetPlacement = false
  progresBarCreateImageUpload = false
  progresBarCreateImageCreatives = false
  progresBarModifiedImageCreative = false
  spinnerTargetAge = false
  spinnerTargetGenre = false
  spinnerTargetDevice = false
  FINAL_ARRAY_TO_SEND = []
  url_errors = []
  defineBudgetDisabled = true
  increaseBudgetDisabled = true
  rechargeAccountDisabled = true
  increaseAccountDisabled=true
  accountValue = 0
  referenceId: any
  rechargement_value_budget = new FormControl('', [Validators.required, Validators.min(50), Validators.max(500)])
  rechargement_value_budget_increase = new FormControl('', [Validators.required, Validators.min(50), Validators.max(500)]);
  rechargement_value = new FormControl('', [Validators.required, Validators.min(50), Validators.max(500)]);
  rechargement_value_increase = new FormControl('', [Validators.required, Validators.min(50), Validators.max(500)]);
  chooseAdSize = true
  illustration = false
    element_checked = ""
  illustrationUrl = ""
   url_modify = ""
  imagesUpload = []
  files: File[] = [];
  combinedApprovalStatus = ""
  policy = []
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

  idOfAdNameCreateUploadNew = "ad_name_create_upload_new"
  idOfDisplayUrlCreateUploadNew = "displayUrl_create_upload_new"
  idOfAdNameCreateCreativesNew = "ad_name_create_creatives_new"
  idOfDisplayUrlCreateCreativesNew = "displayUrl_create_creatives_new"
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
  ad_type = ""
  is_upload_way = false
  is_creative_way = false
  img_view_create_style: Object = { 'width': '100px', 'height': '100px' }
  canvas_style: Object = { 'width': '', 'height': '', 'border-color': 'rgb(233, 216, 216);' }
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;
  chooseBlock = false
  selectedColor: string;
  spinnerPublish = false
  successPublish = false
  text_add = false
  text_color = false;
  changeColor: string;
  selectedWidth: any
  selectedHeight: any
  isUpload = false
  handleCreateCanvas = false
  handleCreateUpload = false
  new_image_content: any;
    canvasCreate = false
  canvasModify = false
  currentCanvasContent: any;
  ads: any;
  finalUrls: any;
  finalAppUrls: any;
  newfinalUrls: any;
  newfinalAppUrls: any;
  newfinalMobileUrls: any;
  finalMobileUrls: any;
  imageRefStorage: any;
  image_content: any;
  image_url: any;
  ad_id: any;
  id_ad_firebase: any;
  ad_name: any;
  currentUserName = ""
   isAdBlock = false;
  currentAdName = "";
  currentFinalUrls = ""
  tabCurrentFinalUrls = []
  tabUpdatedCurrentFinalUrls = []
  currentImageUrl = ""
   currentAdStatus = ""
  currentAdSize: any
  currentAdType = ""
  number_ads: any
  iconEditor = ""
  isEditor = false
  newAdsSchedule = false
  icon_toggle = 'icon-chevron-left'
  icon_toggle_options = 'icon-chevron-down'
  progress: { percentage: number } = { percentage: 0 };
  test: any;
  displayedColumnsAds = ['select', 'image', 'status', 'state', 'actions'];
  dataSource = new MatTableDataSource<Annonces>([])
  public json: any;
  public globalEditor: boolean = false;
  public textEditor: boolean = false;
  public imageEditor: boolean = false;
  public figureEditor: boolean = false;
  public textString: string;
  public selected: any;
  public url: any;
  public size: any = {
    width: 300,
    height: 250
  };
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  toggleSideNav() {
    console.log('toggle')
    if(this.openedSideNav===true){
      this.openedSideNav=false
    }else{
      this.openedSideNav = true
    }
  }

  DAYS = [
     {
       "id": "Mon",
      "fulldayFrench": "Lundi",
      "fulldayEnglish": "Monday"
    },
     {
       "id": "Tue",
       "fulldayFrench": "Mardi",
      "fulldayEnglish": "Tuesday"
    },
     {
       "id": "Wed",
       "fulldayFrench": "Mercredi",
      "fulldayEnglish": "Wednesday"
    },
      {
       "id": "Thu",
        "fulldayFrench": "Jeudi",
      "fulldayEnglish": "Thursday"
    },
       {
       "id": "Fri",
         "fulldayFrench": "Vendredi",
      "fulldayEnglish": "Friday"
    },
        {
       "id": "Sat",
          "fulldayFrench": "Samedi",
      "fulldayEnglish": "Saturday"
    },
         {
       "id": "Sun",
           "fulldayFrench": "Dimanche",
      "fulldayEnglish": "Sunday"
    },
   
  ]
  SCHEDULE = [
    {
      "text": "00:00",
      "hour": "0",
      "minute": "ZERO",
    },
     {
      "text": "00:15",
      "hour": "0",
      "minute": "FIFTEEN",
    },
     {
      "text": "00:30",
      "hour": "0",
      "minute": "THIRTY",
    },
     {
      "text": "00:45",
      "hour": "0",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "01:00",
      "hour": "1",
      "minute": "ZERO",
    },
     {
      "text": "01:15",
      "hour": "1",
      "minute": "FIFTEEN",
    },
     {
      "text": "01:30",
      "hour": "1",
      "minute": "THIRTY",
    },
     {
      "text": "01:45",
      "hour": "1",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "02:00",
      "hour": "2",
      "minute": "ZERO",
    },
     {
      "text": "02:15",
      "hour": "2",
      "minute": "FIFTEEN",
    },
     {
      "text": "02:30",
      "hour": "2",
      "minute": "THIRTY",
    },
     {
      "text": "02:45",
      "hour": "2",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "03:00",
      "hour": "3",
      "minute": "ZERO",
    },
     {
      "text": "03:15",
      "hour": "3",
      "minute": "FIFTEEN",
    },
     {
      "text": "03:30",
      "hour": "3",
      "minute": "THIRTY",
    },
     {
      "text": "03:45",
      "hour": "3",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "04:00",
      "hour": "4",
      "minute": "ZERO",
    },
     {
      "text": "04:15",
      "hour": "4",
      "minute": "FIFTEEN",
    },
     {
      "text": "04:30",
      "hour": "4",
      "minute": "THIRTY",
    },
     {
      "text": "04:45",
      "hour": "4",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "05:00",
      "hour": "5",
      "minute": "ZERO",
    },
     {
      "text": "05:15",
      "hour": "5",
      "minute": "FIFTEEN",
    },
     {
      "text": "05:30",
      "hour": "5",
      "minute": "THIRTY",
    },
     {
      "text": "05:45",
      "hour": "5",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "06:00",
      "hour": "6",
      "minute": "ZERO",
    },
     {
      "text": "06:15",
      "hour": "6",
      "minute": "FIFTEEN",
    },
     {
      "text": "06:30",
      "hour": "6",
      "minute": "THIRTY",
    },
     {
      "text": "06:45",
      "hour": "6",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "07:00",
      "hour": "7",
      "minute": "ZERO",
    },
     {
      "text": "07:15",
      "hour": "7",
      "minute": "FIFTEEN",
    },
     {
      "text": "07:30",
      "hour": "7",
      "minute": "THIRTY",
    },
     {
      "text": "07:45",
      "hour": "7",
      "minute": "FORTY_FIVE",
    },
         {
      "text": "08:00",
      "hour": "8",
      "minute": "ZERO",
    },
     {
      "text": "08:15",
      "hour": "8",
      "minute": "FIFTEEN",
    },
     {
      "text": "08:30",
      "hour": "8",
      "minute": "THIRTY",
    },
     {
      "text": "08:45",
      "hour": "7",
      "minute": "FORTY_FIVE",
    },
         {
      "text": "09:00",
      "hour": "9",
      "minute": "ZERO",
    },
     {
      "text": "09:15",
      "hour": "0",
      "minute": "FIFTEEN",
    },
     {
      "text": "09:30",
      "hour": "9",
      "minute": "THIRTY",
    },
     {
      "text": "09:45",
      "hour": "9",
      "minute": "FORTY_FIVE",
    },
        {
      "text": "10:00",
      "hour": "10",
      "minute": "ZERO",
    },
     {
      "text": "10:15",
      "hour": "10",
      "minute": "FIFTEEN",
    },
     {
      "text": "10:30",
      "hour": "10",
      "minute": "THIRTY",
    },
     {
      "text": "10:45",
      "hour": "10",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "11:00",
      "hour": "11",
      "minute": "ZERO",
    },
     {
      "text": "11:15",
      "hour": "11",
      "minute": "FIFTEEN",
    },
     {
      "text": "11:30",
      "hour": "11",
      "minute": "THIRTY",
    },
     {
      "text": "11:45",
      "hour": "11",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "12:00",
      "hour": "12",
      "minute": "ZERO",
    },
     {
      "text": "12:15",
      "hour": "12",
      "minute": "FIFTEEN",
    },
     {
      "text": "12:30",
      "hour": "12",
      "minute": "THIRTY",
    },
     {
      "text": "12:45",
      "hour": "12",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "13:00",
      "hour": "13",
      "minute": "ZERO",
    },
     {
      "text": "13:15",
      "hour": "13",
      "minute": "FIFTEEN",
    },
     {
      "text": "13:30",
      "hour": "13",
      "minute": "THIRTY",
    },
     {
      "text": "13:45",
      "hour": "13",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "14:00",
      "hour": "14",
      "minute": "ZERO",
    },
     {
      "text": "14:15",
      "hour": "14",
      "minute": "FIFTEEN",
    },
     {
      "text": "14:30",
      "hour": "14",
      "minute": "THIRTY",
    },
     {
      "text": "14:45",
      "hour": "14",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "15:00",
      "hour": "15",
      "minute": "ZERO",
    },
     {
      "text": "15:15",
      "hour": "15",
      "minute": "FIFTEEN",
    },
     {
      "text": "15:30",
      "hour": "15",
      "minute": "THIRTY",
    },
     {
      "text": "15:45",
      "hour": "15",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "16:00",
      "hour": "16",
      "minute": "ZERO",
    },
     {
      "text": "16:15",
      "hour": "16",
      "minute": "FIFTEEN",
    },
     {
      "text": "16:30",
      "hour": "16",
      "minute": "THIRTY",
    },
     {
      "text": "16:45",
      "hour": "16",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "17:00",
      "hour": "17",
      "minute": "ZERO",
    },
     {
      "text": "17:15",
      "hour": "17",
      "minute": "FIFTEEN",
    },
     {
      "text": "17:30",
      "hour": "17",
      "minute": "THIRTY",
    },
     {
      "text": "17:45",
      "hour": "17",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "18:00",
      "hour": "18",
      "minute": "ZERO",
    },
     {
      "text": "18:15",
      "hour": "18",
      "minute": "FIFTEEN",
    },
     {
      "text": "18:30",
      "hour": "18",
      "minute": "THIRTY",
    },
     {
      "text": "18:45",
      "hour": "18",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "19:00",
      "hour": "19",
      "minute": "ZERO",
    },
     {
      "text": "19:15",
      "hour": "19",
      "minute": "FIFTEEN",
    },
     {
      "text": "19:30",
      "hour": "19",
      "minute": "THIRTY",
    },
     {
      "text": "19:45",
      "hour": "19",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "20:00",
      "hour": "20",
      "minute": "ZERO",
    },
     {
      "text": "20:15",
      "hour": "20",
      "minute": "FIFTEEN",
    },
     {
      "text": "20:30",
      "hour": "20",
      "minute": "THIRTY",
    },
     {
      "text": "20:45",
      "hour": "20",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "21:00",
      "hour": "21",
      "minute": "ZERO",
    },
     {
      "text": "21:15",
      "hour": "21",
      "minute": "FIFTEEN",
    },
     {
      "text": "21:30",
      "hour": "21",
      "minute": "THIRTY",
    },
     {
      "text": "21:45",
      "hour": "21",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "22:00",
      "hour": "A",
      "minute": "ZERO",
    },
     {
      "text": "22:15",
      "hour": "A",
      "minute": "FIFTEEN",
    },
     {
      "text": "22:30",
      "hour": "A",
      "minute": "THIRTY",
    },
     {
      "text": "22:45",
      "hour": "A",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "23:00",
      "hour": "A",
      "minute": "ZERO",
    },
     {
      "text": "23:15",
      "hour": "A",
      "minute": "FIFTEEN",
    },
     {
      "text": "23:30",
      "hour": "A",
      "minute": "THIRTY",
    },
     {
      "text": "23:45",
      "hour": "A",
      "minute": "FORTY_FIVE",
    },
  ]
  usedStart: string[] = [
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
    '#000zzz',
    'zzzzzz',
  ];

  colors: string[] = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
  ];



  textDial: FormGroup;
  items: MccColorPickerItem[] = [
    { text: 'Black', value: '#000000' },
    { text: 'White', value: '#FFFFFF' },
    { text: 'Gray', value: '#CCCCCC' },
  ];


  
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
    { "name": "Horizontal", "width": "468", "height": "60", "id": "Banner", "isSpecial": false, "img": "https://dummyimage.com/468x60/000/fff" },
    { "name": "Vertical", "width": "120", "height": "600", "id": "Skyscraper", "isSpecial": false, "img": "https://dummyimage.com/120x600/000/fff" },
    { "name": "Rectangle Vertical", "width": "240", "height": "400", "id": "RV", "isSpecial": false, "img": "https://dummyimage.com/120x600/000/fff" },

  ]
  AD_TYPES_NOSPECIAL_2 = [

    { "name": "Horizontal Large", "width": "970", "height": "90", "id": "LargerLeaderboard", "isSpecial": false, "img": "https://dummyimage.com/970x90/000/fff" },
    { "name": "Big Panneau", "width": "970", "height": "250", "id": "BigPanneau", "isSpecial": false, "img": "https://dummyimage.com/970x250/000/fff" },
    { "name": "Petit carré", "width": "200", "height": "200", "id": "Smallsquare", "isSpecial": false, "img": "https://dummyimage.com/200x100/000/fff" }

  ]

  getErrorMessageRechargement() {
    return this.rechargement_value.hasError('required') ? 'Saisir un montant' :
      this.rechargement_value.hasError('max') ? 'Montant limite dépassé' :
        this.rechargement_value.hasError('min') ? 'Montant faible' : '';
  }
  getErrorMessageBudget() {
    return this.rechargement_value_budget.hasError('required') ? 'Saisir un montant' :
      this.rechargement_value_budget.hasError('max') ? 'Montant limite dépassé' :
        this.rechargement_value_budget.hasError('min') ? 'Montant faible' : '';
  }
  getErrorMessageBudgetIncrease() {
    return this.rechargement_value_budget_increase.hasError('required') ? 'Saisir un montant' :
      this.rechargement_value_budget_increase.hasError('max') ? 'Montant limite dépassé' :
        this.rechargement_value_budget_increase.hasError('min') ? 'Montant faible' : '';
  }
   getErrorMessageRechargementIncrease() {
    return this.rechargement_value_increase.hasError('required') ? 'Saisir un montant' :
      this.rechargement_value_increase.hasError('max') ? 'Montant limite dépassé' :
        this.rechargement_value_increase.hasError('min') ? 'Montant faible' : '';
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourceList.data.forEach(row => this.selection.select(row));
  }
  walletOptions = ""
  

  closeModifySingleSchedule(){
    this.selection_schedule.deselect()
         this.selection_schedule.clear()
         this.SCHEDULE_DATA = []
         this.updateScheduleBlock = false
  }
   closeAddNewSchedule(){
         this.SCHEDULE_DATA = []
         this.newAdsSchedule = false
  }

  toggleAddNewSchedule() {
   
   if(this.newAdsSchedule === true){
     this.newAdsSchedule=false
   }else{
     this.getDaysCampaign().then(res => {
      
       if (res[0]['status'] === "ok") {
          this.selection_schedule.deselect()
         this.selection_schedule.clear()
         this.SCHEDULE_DATA = []
         this.newAdsSchedule = true
         this.daySchedule = this.fb.group({
           day: ['', Validators.required],
           startHour: ['', Validators.required],
           endHour: ['', Validators.required],
         });
         this.DAYS_CAMPAIGN = this.dedupe(res[0]['result']);
         var longueurSchedule = this.campaignSchedule.length
         var nouvelleLongueur = this.DAYS_CAMPAIGN.length

          for (var j = 0; j < this.campaignSchedule.length; j++){
              for (var i = 0; i < this.DAYS_CAMPAIGN.length; i++) {
             if (this.DAYS_CAMPAIGN[i]['id'] === this.campaignSchedule[j]['id']) {
               this.DAYS_CAMPAIGN.splice(i, 1);
               i--;
             }
           }
             }
       }
      })
   }
  }
  getDaysCampaign():Promise<any>{
    return new Promise(resolve => {
      var start = this.startDateFrench.split("/")
      var end = this.endDateFrench.split("/")
         var getDates =  function(start, end){
 
      console.log(start)
    console.log(end)

          
    var arr = new Array();
    var dt_start = new Date(start)
    console.log(dt_start)
    var dt = new Date(start)
    var _end = new Date(end)
    console.log(dt)
    console.log(_end)
    while (dt <= _end) {

      arr.push(new Date(dt));
      console.log(arr)
      dt.setDate(dt.getDate() + 1);
      
       } 
       return arr
 
      }
      var dates = getDates(new Date(start[2] + "-" + start[1] + "-" + start[0]), new Date(end[2] + "-" + end[1] + "-" + end[0]));
      var result = []
     
    for (var i = 0; i < dates.length; i++) {
      for (var j = 0; j < this.DAYS.length; j++) {
        console.log(dates[i])
        var split = dates[i].toString().split(" ")
        if (split[0] === this.DAYS[j]['id']) {
          console.log(split[0] === this.DAYS[j]['id'])
          console.log(this.DAYS[j]['fulldayFrench'])
          console.log(this.DAYS[j]['id'])
          console.log(this.DAYS[j]['fulldayFrench'])
          result.push({
            "id": this.DAYS[j]['id'],
            "item_text_french": this.DAYS[j]['fulldayFrench'],
            "item_text_english": this.DAYS[j]['fulldayEnglish']
          })
        
        }
      }
     }
    
      resolve([{
        "status": "ok",
        "result": result
      }])
    })
  }
   dedupe(arr) {
  return arr.reduce(function(p, c) {

    // create an identifying id from the object values
    var id = [c.id, c.item_text_french, c.item_text_english].join('|');

    // if the id is not found in the temp array
    // add the object to the output array
    // and add the key to the temp array
    if (p.temp.indexOf(id) === -1) {
      p.out.push(c);
      p.temp.push(id);
    }
    return p;

    // return the deduped array
  }, {
    temp: [],
    out: []
  }).out;
}
  removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
    console.log(Object.keys(unique))
  return Object.keys(unique);
}
  modifySingleSchedule() {
    this.spinnerUpdateSchedule = true
        this.SCHEDULE_DATA.push({
      "id": this.selection_schedule.selected[0]['id'],
      "dayFR": this.selection_schedule.selected[0]['dayFR'],
      "dayEN": this.selection_schedule.selected[0]['dayEN'],
      "start_hour_text": this.currentStartHourText,
      "end_hour_text": this.currentEndHourText,
      "startHour": this.currentStartHourHour,
      "endHour": this.currentEndHourHour,
      "startMinute": this.currentStartHourMinute,
      "endMinute": this.currentEndHourMinute

        })

     this.notesService.modifyAdsSchedule(this.id, this.id_campagne.toString(), this.name, this.SCHEDULE_DATA, this.selection_schedule.selected[0]['criterion_id']).then(res=>{
      if(res==="ok"){
        this.spinnerUpdateSchedule = false
        this.updateScheduleBlock = false
        this.openSnackBar("Heure de diffusion modifiée avec succès", "ok")
        this.SCHEDULE_DATA = []
      } else {
        this.updateScheduleBlock = false
         this.spinnerUpdateSchedule = false
        this.openSnackBar("Erreur réessayez svp", "ok")
        this.SCHEDULE_DATA = []
      }
    })
  }
  deleteSingleSchedule() {
    this.spinnerUpdateSchedule = true
    this.notesService.removeSingleAdsSchedule(this.id, this.id_campagne, this.name, this.selection_schedule.selected).then(res=>{
      if (res === "ok") {
        this.spinnerUpdateSchedule = false
        this.updateScheduleBlock = false
        this.openSnackBar("Heure de diffusion modifiée avec succès", "ok")
      } else {
         this.spinnerUpdateSchedule = false
      }
    })
  }

  onDaySelect(event) {
    if (event.isUserInput) {
      this.daysSchedule = []
       this.daysSchedule.push(
          event.source.value
          
      )
      this.currentDaySelectedId = event.source.value.item_id
      console.log(this.currentDaySelectedId)
      this.currentDaySelectedFR = event.source.value.item_text_french
      console.log(`current day selected french ${this.currentDaySelectedFR}`)
           this.currentDaySelectedFR = event.source.value.item_text_french
      console.log(`current day selected english ${this.currentDaySelectedFR}`)
      this.currentDaySelectedEN = event.source.value.item_text_english
      if (this.daysSchedule.length <= 0) {
        this.adScheduleSelectStartHourDisabled = true 
      
      } else {
        this.adScheduleSelectStartHourDisabled = false 
       
      } 
       /* console.log(this.daysSchedule) */
      
    }
  }

  onStartHourSelect(event) {
    if (event.isUserInput) {
      this.startHourSelected = []
      this.endHourSelected = []
        this.startHourSelected.push(
          event.source.value
        )
      
      if (this.startHourSelected.length <= 0) {
        
        this.adScheduleSelectEndHourDisabled = true  
        this.endScheduleTab=[]
          this.currentStartHourText = ""
        this.currentStartHourHour = ""
        this.currentStartHourMinute = ""
      } else {
          this.currentStartHourText = event.source.value.item_id
        this.currentStartHourHour = event.source.value.hour
        this.currentStartHourMinute = event.source.value.minute
         this.endScheduleTab=[]
        console.log(this.SCHEDULE)
        console.log(this.startHourSelected)
        var splitTimeStart = this.startHourSelected[0]['item_id'].split(":")
        for (var i = 0; i < this.SCHEDULE.length; i++) {
          var splitTimeSchedule = this.SCHEDULE[i]['text'].split(":")
          if (parseInt(splitTimeSchedule[0]) < parseInt(splitTimeStart[0])) {
            this.endScheduleTab.push({
              'text': this.SCHEDULE[i]['text'],
              'hour': this.SCHEDULE[i]['hour'],
              'minute': this.SCHEDULE[i]['minute'],
              'disabled': true
            })

          } else if ((parseInt(splitTimeSchedule[0]) === parseInt(splitTimeStart[0])) && (parseInt(splitTimeSchedule[1]) < parseInt(splitTimeStart[1]))) {
           
               this.endScheduleTab.push({
              'text': this.SCHEDULE[i]['text'],
              'hour': this.SCHEDULE[i]['hour'],
              'minute': this.SCHEDULE[i]['minute'],
              'disabled': true
            })
            } else if((parseInt(splitTimeSchedule[0]) === parseInt(splitTimeStart[0])) && (parseInt(splitTimeSchedule[1]) === parseInt(splitTimeStart[1]))) {
              this.endScheduleTab.push({
              'text': this.SCHEDULE[i]['text'],
              'hour': this.SCHEDULE[i]['hour'],
              'minute': this.SCHEDULE[i]['minute'],
              'disabled': true
            })
            
          } else  {
              this.endScheduleTab.push({
              'text': this.SCHEDULE[i]['text'],
              'hour': this.SCHEDULE[i]['hour'],
              'minute': this.SCHEDULE[i]['minute'],
              'disabled': false
            })
          }
        }
         this.adScheduleSelectEndHourDisabled = false 
      }
       console.log(this.startHourSelected)
  
    }
  }
  onEndHourSelect(event) {
    if (event.isUserInput) {
        this.endHourSelected = []
        this.endHourSelected.push(
          event.source.value
        )
        this.currentEndHourText = event.source.value.item_id
        this.currentEndHourHour = event.source.value.hour
        this.currentEndHourMinute = event.source.value.minute
      console.log(this.endHourSelected)
       
  
    }
  }
  targetAllTime() {
    this.spinnerAddNewAdsSchedule = true
    this.notesService.removeAdsSchedule(this.id, this.id_campagne, this.name).then(res=>{
      if (res === "ok") {
        this.spinnerAddNewAdsSchedule = false
        this.openSnackBar("Modification enregistrée avec succès", "ok")
      } else {
        this.spinnerAddNewAdsSchedule = false
      }
    })
  }
  addNewTargetSchedule() {
  
  if(this.daySchedule.valid){
      this.SCHEDULE_DATA.push({
      "id": this.currentDaySelectedId,
      "dayFR": this.currentDaySelectedFR,
      "dayEN": this.currentDaySelectedEN.toUpperCase(),
      "start_hour_text": this.currentStartHourText,
      "end_hour_text": this.currentEndHourText,
      "startHour": this.currentStartHourHour,
      "endHour": this.currentEndHourHour,
      "startMinute": this.currentStartHourMinute,
      "endMinute": this.currentEndHourMinute

    })
    this.spinnerAddNewAdsSchedule = true
    this.notesService.AddAdsSchedule(this.id, this.id_campagne, this.name, this.SCHEDULE_DATA).then(res=>{
      if (res === "ok") {
          this.newAdsSchedule  = false
        this.spinnerAddNewAdsSchedule = false
        this.SCHEDULE_DATA = []
        this.openSnackBar("Heure de diffusion ajoutée avec succès", "ok")
         this.currentDaySelectedFR = ""
     this.currentDaySelectedEN = ""
     this.currentStartHourText = ""
        this.currentStartHourHour = ""
    this.currentStartHourMinute = ""
     this.currentEndHourText = ""
        this.currentEndHourHour = ""
    this.currentEndHourMinute = ""
    this.startHourSelected = []
    this.endHourSelected = []
      } else {
        this.SCHEDULE_DATA = []
         this.newAdsSchedule  = false
        this.spinnerAddNewAdsSchedule = false
         this.currentDaySelectedFR = ""
     this.currentDaySelectedEN = ""
     this.currentStartHourText = ""
        this.currentStartHourHour = ""
    this.currentStartHourMinute = ""
     this.currentEndHourText = ""
        this.currentEndHourHour = ""
    this.currentEndHourMinute = ""
    this.startHourSelected = []
    this.endHourSelected = []
      }
    })

  }
  }
  addSingleSchedule() {
    
    this.SCHEDULE_DATA.push({
      "id": this.currentDaySelectedId,
      "dayFR": this.currentDaySelectedFR,
      "dayEN": this.currentDaySelectedEN.toUpperCase(),
      "start_hour_text": this.currentStartHourText,
      "end_hour_text": this.currentEndHourText,
      "startHour": this.currentStartHourHour,
      "endHour": this.currentEndHourHour,
      "startMinute": this.currentStartHourMinute,
      "endMinute": this.currentEndHourMinute

    })
    this.notesService.adsSchedule(this.id, this.id_campagne, this.name, this.SCHEDULE_DATA)
    this.scheduleValid = true
    console.log(this.SCHEDULE_DATA)

  
    let data: SCHEDULE_INTERFACE[] = [];
    data = (this.tableSCHEDULE.dataSource as SCHEDULE_INTERFACE[]);
    /* if (this.tableSCHEDULE.dataSource) {
    } */
   /*  data.push(this.SCHEDULE_DATA[data.length]); */
   /*  this.tableSCHEDULE.dataSource = this.SCHEDULE_DATA */
    /* this.tableSCHEDULE.renderRows(); */
  
    console.log(this.SCHEDULE_DATA)
    for (var i = 0; i < this.DAYS_CAMPAIGN.length; i++){
      if (this.DAYS_CAMPAIGN[i]['item_text_french'] === this.currentDaySelectedFR) {
        this.DAYS_CAMPAIGN.splice(i,1)
      }
    }
    
    this.tableSCHEDULE.renderRows()
    this.currentDaySelectedFR = ""
     this.currentDaySelectedEN = ""
     this.currentStartHourText = ""
        this.currentStartHourHour = ""
    this.currentStartHourMinute = ""
     this.currentEndHourText = ""
        this.currentEndHourHour = ""
    this.currentEndHourMinute = ""
    this.startHourSelected = []
    this.endHourSelected = []
    this.adScheduleSelectStartHourDisabled = true
    this.adScheduleSelectEndHourDisabled = true

  }
  daySelection(row) {
    
    console.log(row)
    this.selection_schedule.clear()
    var selected_row = this.selection_schedule.toggle(row)
    console.log(this.selection_schedule.selected)
    this.updateScheduleBlock = true
    this.dayScheduleModify = this.fb.group({
       
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        });
   /*  if (this.selection_schedule.selected.length > 0) {
      if (this.selection_schedule.isSelected(row) === true) {
        this.sele
      }
    } */
   /*  this.SELECTED_CAMPAIGN_SCHEDULE.push(selected_row)
    if (selected_row.length>0) {
      console.log(selected_row)
      console.log(selected_row.length)
    } */
  }
  paymentTypes(event) {
  
    if (this.walletOptions === 'defineBudget') {
      this.walletAction = "Placer un budget"
       this.rechargement_value_budget = new FormControl('', [Validators.required, Validators.min(50), Validators.max(this.accountValue/1000)]);
    } else if (this.walletOptions === 'rechargeAccount') {
       this.walletAction = "Recharger mon compte"
    } else if (this.walletOptions === 'increaseBudget') {
      this.walletAction = "Augmenter mon budget"
      this.rechargement_value_budget_increase = new FormControl('', [Validators.required, Validators.min(50), Validators.max(this.accountValue/1000)]);
    } else if (this.walletOptions === 'increaseAccount') {
       this.walletAction = "Augmenter le solde de mon compte"
      this.rechargement_value_increase = new FormControl('', [Validators.required, Validators.min(50), Validators.max(500)]);
    }
  }
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
  isRunning = false
  showBudgetToolbar = false
  idA = ""
  adgroups: any;
  placement = [];
  showZonesBlock = false
  value_for_account_recharge = 0
  value_for_account_recharge_increase = 0
  value_for_budget_recharge = 0
  value_for_budget_recharge_increase = 0
  dataSourceCampaign = []
  displayedColumnsSchedules = ["select","day", "startHour", "endHour"]
  private adGroupCollection: AngularFirestoreCollection<AdGroup>;
  campaignSchedule = []
  campaignFinish = false 
  showBudgetBlock = false
  showOptionsEditCampaign = false
  budgetTable = [];
  type: string;
  width: string;
  height: string;
  id_campagne: string;
  id: string;
  name: string;
  status: string;
  ad_group_id: number;
  uid: string;
  budget: any;
  budgetId: any;
  dailyBudget: any;
  numberOfDays: any;
  impressions = 0
  clicks = 0
  cost = 0
  button_payments = true
  ad_group_tab_content =  [];
  email: string;
  ad_groups_list_id = []
  ads_list_id = []
  number_of_impressions = 0
  user: Observable < any > ;
  number_ad_groups: any;
  isCreating = false
  isAdGroup = false
  isCiblage = false
  startDate: any;
  endDate: any;
  ad_group_name: any;
  servingStatus: any;

  labelDateStart = "Date de début";
  labelDateEnd = "Date de fin"
  labelServing = "Actuellemnt en diffusion"
  labelNotServing = "Non diffusée, changer la date de début pour commencer la diffusion"
  labelSuspended = "Suspendu"
  labelNone = "Pas assez de fonds displonible pour démarrer une campagne"
  labelEnded = "Campagne publicitaire terminée"
  text_status_deactive_campaign = "Désactivée"
  text_status_active_campaign = "Activée"
  text_no_zone = "Aucune zone ciblée"
  sn = 'Tout le Sénégal'
  dk = 'Dakar'
  generale='Général'
  zone: any;
error_recharge = ""
  ages = []
  sexes = [];
  zones = [];
  devices = []
  genres = [];
  populations = [];
  appareils = [];
  isCiblageGenre = false
  isCiblageAge = false
  isCiblageDevices = false
  isPlacement = false
  nationals_errors: any
  modulesList = []
 
  dure_campagne = 0
  
  
  budget_to_place = 0;
  my_gain = 0;
  number_of_impressions_simulated = 0
  montant = 0
  modifyDate = false
  isSetBudget = false
  isAccountRechargement = false
  isPlacementBudgetFromAccount = false
  isRoller = false
  isSimulation = false
  newStartDate: any
  newEndDate: any;
  startDateFrench: any;
  endDateFrench: any;
  UpdatedStartDate: any;
  UpdatedEndDate: any
  today: any
   nationals_websites = []
  internationals_websites = []
  ads_websites = []
  progresBarModifiedImageUpload = false
  apps = []
  currentUser: any;
  numberOfNotifications = 0
  notificationAccountValue = ""
  photoURL = ""
  
   public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
   {data: [0], label: 'Clicks'},
    {data: [0], label: 'Coût'
    },
    { data: [0], label: 'Impressions' }
  ];

  displayedColumnsBudget = ['change', 'debut', 'fin', 'budget', 'action'];
  reset(): void {
    this.mccColorPickerService.resetUseColors();
  }

  onSubmit({ value, valid }): void {
    console.log(value, valid);
  }
  FONT_SIZES = [
    { "size": "10", "name": "10px" },
    { "size": "12", "name": "12px" },
    { "size": "14", "name": "14px" },
    { "size": "16", "name": "16px" },
    { "size": "18", "name": "18px" },
    { "size": "20", "name": "20px" },
    { "size": "22", "name": "22px" },
    { "size": "24", "name": "24px" },
    { "size": "26", "name": "26px" },
    { "size": "28", "name": "28px" },
    { "size": "30", "name": "30px" },
    { "size": "32", "name": "32px" },
  ]
   FONT_FAMILY = [
    { "name": "Arial", "font": "Arial" },
    { "name": "Helvetica", "font": "Helvetica" },
    { "name": "Verdana", "font": "Verdana" },
    { "name": "Calibri", "font": "Calibri" },
    { "name": "Calibri", "font": "Calibri" },
    { "name": "Lucida Sans", "font": "Lucida Sans" },
    { "name": "Gill Sans", "font": "Gill Sans" },
    { "name": "Century Gothic", "font": "Century Gothic" },
    { "name": "Candara", "font": "Candara" },
    { "name": "Futara", "font": "Futara" },
    { "name": "Franklin Gothic Medium", "font": "Franklin Gothic Medium" },
    { "name": "Trebuchet MS", "font": "Trebuchet MS" },
    { "name": "Geneva", "font": "Geneva" },
  ]
  isDone = false
    currentEditor = false
 directions: string[] = ['up', 'down', 'left', 'right'];

  animations: string[] = ['scale', 'fling'];



  get direction(): string {
    return this.form.get('direction').value;
  }

  get open(): boolean {
    return this.form.get('open').value;
  }

  get spin(): boolean {
    return this.form.get('spin').value;
  }

  get mouse_hover(): boolean {
    return this.form.get('mouse_hover').value;
  }

  get animation(): string {
    return this.form.get('animation').value;
  }

    onSelect(event) {
    //console.log(event);
    this.files.push(...event.addedFiles);
    //console.log(this.files)
  }

  onRemove(event) {
    //console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

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
      { key: '#001f3f', value: 'Navy', type: 'default' },
      { key: '#0074D9', value: 'Blue', type: 'default' },
      { key: '#7FDBFF', value: 'Aqua', type: 'default' },
      { key: '#39CCCC', value: 'Teal', type: 'default' },
      { key: '#3D9970', value: 'Olive', type: 'default' },
      { key: '#2ECC40', value: 'Green', type: 'default' },
      { key: '#01FF70', value: 'Lime', type: 'default' },
      { key: '#FFDC00', value: 'Yellow', type: 'default' },
      { key: '#FF851B', value: 'Orange', type: 'default' },
      { key: '#FF4136', value: 'Red', type: 'default' },
      { key: '#85144b', value: 'Maroon', type: 'default' },
      { key: '#F012BE', value: 'Fuchsia', type: 'default' },
      { key: '#B10DC9', value: 'Purple', type: 'default' },
      { key: '#111111', value: 'Black', type: 'default' },
      { key: '#AAAAAA', value: 'Gray', type: 'default' },
      { key: '#DDDDDD', value: 'Silver', type: 'default' }
    ],
    custom: []
  };

  public library: any = {
    brands: [
      { name: 'Audi', src: 'assets/libraries/brands/audi-sd.png' },
      { name: 'BMW', src: 'assets/libraries/brands/bmw-sd.png' },
      { name: 'Citroen', src: 'assets/libraries/brands/citroen-sd.png' },
      { name: 'Fiat', src: 'assets/libraries/brands/fiat-sd.png' },
      { name: 'Ford', src: 'assets/libraries/brands/ford-sd.png' },
      { name: 'General Motors', src: 'assets/libraries/brands/generalmotors-sd.png' },
      { name: 'Honda', src: 'assets/libraries/brands/honda-sd.png' },
      { name: 'Hyundai', src: 'assets/libraries/brands/hyundai-sd.png' },
      { name: 'Infiniti', src: 'assets/libraries/brands/infiniti-sd.png' },
      { name: 'Kia', src: 'assets/libraries/brands/kia-sd.png' },
      { name: 'Lexus', src: 'assets/libraries/brands/lexus-sd.png' },
      { name: 'Mazda', src: 'assets/libraries/brands/mazda-sd.png' },
      { name: 'Mercedes-Benz', src: 'assets/libraries/brands/mercedesbenz-sd.png' },
      { name: 'Mini', src: 'assets/libraries/brands/mini-sd.png' },
      { name: 'Nissan', src: 'assets/libraries/brands/nissan-sd.png' },
      { name: 'Peugeot', src: 'assets/libraries/brands/peugeot-sd.png' },
      { name: 'Porsche', src: 'assets/libraries/brands/porsche-sd.png' },
      { name: 'Renault', src: 'assets/libraries/brands/renault-sd.png' },
      { name: 'Seat', src: 'assets/libraries/brands/seat-sd.png' },
      { name: 'Skoda', src: 'assets/libraries/brands/skoda-sd.png' },
      { name: 'Tesla', src: 'assets/libraries/brands/tesla-sd.png' },
      { name: 'Toyota', src: 'assets/libraries/brands/toyota-sd.png' },
      { name: 'Volkswagen', src: 'assets/libraries/brands/volkswagen-sd.png' },
      { name: 'Volvo', src: 'assets/libraries/brands/volvo-sd.png' }
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
    fontSize: 0,
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
    'image': { key: 'image', text: 'Image', icon: 'icon-image' },
    'i-text': { key: 'i-text', text: 'Texte', icon: 'icon-text_format' },
    'rect': { key: 'rect', text: 'Rectangle', icon: 'icon-aspect_ratio' },
    'triangle': { key: 'triangle', text: 'triangle', icon: 'icon-change_history' },
    'circle': { key: 'circle', text: 'Cercle', icon: 'icon-radio_button_unchecked' },
    'polygon': { key: 'polygon', text: 'Polygone', icon: 'icon-crop_square' }
  };

  public urlName = '';


  public selectedSize: any = null;
  public sizes: any = [
    { width: 640, height: 480 },
    { width: 1024, height: 768 },
    { width: 1920, height: 1080 }
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


   handleCanvas(width: number, height: number) {


    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'black',
      preserveObjectStacking: true,

    });

    this.loadPalette();
    this.updateLayers()
    // register keyboard events
    fabric.util.addListener(document.body, 'keydown', (opt) => {
      // do not invoke keyboard events on input fields
      if (opt.target.tagName === 'INPUT') {
        return;
      }
      // if(opt.repeat) return; // prevent repeating (keyhold)

      const key = opt.which || opt.keyCode;

      /* this.handleKeyPress(key, opt); */
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
    this.canvas_style['width'] = width
    this.canvas_style['height'] = height
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canva_state = true
    ////console.log('handled')

  }
  
  toggleModifyUploadImage() {
    this.button_modify_image_upload = false
    $("#button_modify_image_upload").show()
  }

  closeModifyUploadImage() {  
    $("#button_modify_image_upload").hide()
    this.button_modify_image_upload = true
  }
   goBackSelectSize() {
    this.chooseBlock = false
    this.chooseAdSize = true

  }

   goBackFromCreatives() {

    Swal.fire({
      title: 'Avertissement',
      text: "Voulez vous annuler ce canvas ?",
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#26a69a',
      cancelButtonColor: '#d33',
      confirmButtonText: "ok"
    }).then((result) => {
      if (result.value) {
      
        this.canvas.clear()
        this.canvas.dispose()
        this.handleCreateCanvas = false
        this.chooseBlock = true
        this.chooseAdSize = true
        this.illustration = true
        this.ad_type = ""
        this.currentIdInputName = ""
        this.currentIdInputDisplay = ""
        this.canvasCreate = false
      }

    })
  }
   handleTextAdd() {
    if (this.text_add === false) {
      this.text_add = true
    } else {
      this.text_add = false
    }
  }
  handleColorTexte() {
    if (this.text_color === false) {
      this.text_color = true
    } else {
      this.text_color = false
    }
  }
  openDialogModified(img, name): void {
    let dialogRef = this.dialog.open(ImageModifedComponent, {
    
      data: { img: img, name: name }
    });
  }
  closeBudgetToolBar() {
    this.showBudgetToolbar = false
  }

   openDialogCreate(img, name): void {
    let dialogRef = this.dialog.open(ImageCreateComponent, {
    
      data: { img: img, name: name }
    });
  }

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  } */



  constructor(private notesService: NotesService, public auth: AuthService, private adGroupService: AdGroupService, private http: HttpClient, private afs: AngularFirestore, private router: Router, private adsService: Ads, private route: ActivatedRoute, public snackBar: MatSnackBar, private fb: FormBuilder, private mccColorPickerService: MccColorPickerService, public dialog: MatDialog, private ren: Renderer2) {
     this.modulesList = ModulesList;
this.auth.user.forEach(data => {
  this.currentUser = data.displayName
  this.photoURL = data.photoURL
    })
    
    this.auth.notificationAccount.forEach((value) => {
      if(value.notification != ""){
        this.numberOfNotifications = 1
        this.notificationAccountValue = value.notification
      
      }
    })
     this.type = 'timeseries';
    this.width = '400';
    this.height = '400';

 
  }
  dropdownListAges = [];
  dropdownListSexes = [];
 dropdownListZones = [{
      item_id: 9067846,
      item_text: this.dk
       },
         {
           item_id: 2686,
           item_text: this.sn
       }];
  dropdownListDevices = [];
  dropdownListNationalsWebsites = [];
   dropdownListInternationalsWebsites = [];
  dropdownListAdsWebsites = [];
  dropdownListApps = [];
  selectedItems = [];
  selectedZones = [];
  dropdownSettingsAges = {};
  dropdownSettingsSexes = {};
  dropdownSettingsZones = {};
  dropdownSettingsDevices = {};
  dropdownSettingsNationalsWebsites = {};
  dropdownSettingsInternationalsWebsites = {};
  dropdownSettingsAdsWebsites = {};
  dropdownSettingsApps = {};
  
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
  

  fetchData() {
    var self =this
    let jsonify = res => res.json();
    let dataFetch = fetch(SERVER.url+"/campaignReport/"+self.id_campagne).then(jsonify);
    
    let schemaFetch = fetch(SERVER.url+"/getSchemaReportCampaign").then(jsonify);
    Promise.all([dataFetch, schemaFetch]).then(res => {
      let data = res[0];
      ////console.log(data)
      let schema = res[1];
      ////console.log(res[1])
       var tableData = [];
      $.each(data, function (key, value) {
        ////console.log(key, value)
        tableData.push(value);
      })
      ////console.log(tableData)
   
      ////console.log(parseInt(data['clicks']))
      ////console.log(parseInt(data['impressions']))
      ////console.log(parseInt(data['cost']))
      if (parseInt(data['clicks']) !== 0 && parseInt(data['impressions']) !== 0 && parseInt(data['cost']) !== 0) {
        self.notesService.updateNote(self.id, {clicks:parseInt(data['clicks']), impressions: parseInt(data['impressions']), cost: parseInt(data['coûts']) })
        
      }
    });
  }
  cryptMoney(money: string) {
    var CryptoJS = require( 'crypto-js' );

var secretMessage = money;
    var secretKey = this.uid
   

var encryptedMessage = CryptoJS.AES.encrypt(secretMessage, CryptoJS.enc.Hex.parse(secretKey),
                       { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding });

    ////console.log('encryptedMessage: ' + encryptedMessage.ciphertext);
    
  return encryptedMessage.ciphertext

  }

  go1() {
   window.location.replace(SERVER.url_redirect)
 }
getDateArray(start, end) {
    var arr = new Array();
  var dt = new Date(start);
  var _end = new Date(end)
  ////console.log(dt)
    while (dt <= _end) {
        arr.push(new Date(dt).getDate()+"/"+(new Date(dt).getMonth()+1)+"/"+new Date(dt).getFullYear())
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}


  toggleOptionsEditCampaign() {
  if(this.showOptionsEditCampaign===false){
    this.showOptionsEditCampaign = true
  } else {
    this.showOptionsEditCampaign = false
  }
}
  
  getUser() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.auth.user.forEach(data => {
          this.email = data.email
          if (typeof (data.account_value) == typeof (0)) {
            this.accountValue = data.account_value
            
          } else {
            this.accountValue = data.account_value
          }
        
          resolve(data.uid)
        })
      }, 2000);
    });
  }

  getRoute(): Promise<any>{
    return new Promise(resolve => {
       this.route.params.subscribe(params => {
      this.name = params['name']
      this.id = params['id']
         this.id_campagne = params['id_campagne']
         if (params['message'] !== undefined) {
        var message = params['message']
        var id = params['id']
        
        this.getCurrentUserCredentials().then(credentials => {
          //console.log(credentials)
          var paymentKey = credentials[0]['paymentKey']
          this.uid = credentials[0]['uid']
          this.accountValue = credentials[0]['account_value']
          var montant = localStorage.getItem(paymentKey)
          if (montant === null) {
              this.router.navigate(['/edit', this.name, this.id, this.id_campagne])
          } else {
          
              var new_value = 0
              new_value = parseInt(montant)
             /*  if (this.accountValue > new_value) {
                //console.log("Solde du compte non null")
                //console.log("solde actuel: " + this.accountValue.toString())
                new_value = parseInt(montant) + this.accountValue
                //console.log("Nouveau solde: "+new_value.toString())
              } else {
                  //console.log("Solde du compte null")
                  //console.log("solde actuel: " + this.accountValue.toString())
                  //console.log("Nouveau solde: "+new_value.toString())
                } */
              this.auth.updateUser(this.uid, { account_value: new_value, paymentKey: "" }).then(res => {
              if (res != "error") {
                this.getNotificationId(this.uid).then(res => {
                this.auth.updateNotification
                (res, { notification: "" }).then(() => {
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
                      localStorage.removeItem(paymentKey)
             
                      if (message !== 'success') {
                        
                    resolve('ok')

                      } else {
                          resolve("ok")
                      } 
                    }
                  })
                })
                })
              }
              })
            }
        }) 
  
         } else {
           resolve("ok")
           
      }
    })
    })
  }

  verifyIfCampaignStart(startDateFrench, endDateFrench, status): Promise<any>{
    return new Promise(resolve => {
      if(status==="ENABLED"){
        this.isCampaignPause = false
      } else {
        this.isCampaignPause = true
      }

      if(this.budget===0){
        this.showBudgetToolbar = true
      }
          var tabStart = startDateFrench.split("/")
      var frenchDateStart = tabStart[2] + "-" + tabStart[1] + "-" + tabStart[0]
       var tabEnd = endDateFrench.split("/")
          var frenchDateEnd = tabEnd[2] + "-" + tabEnd[1] + "-" + tabEnd[0]
          var today_date = new Date().getDate()
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
          var now = new Date(this.today).setHours(0,0,0,0)
      var start = new Date(frenchDateStart).setHours(0, 0, 0, 0)
      var end = new Date(frenchDateEnd).setHours(0, 0, 0, 0)
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.startDateText = new Date(Date.UTC(tabStart[2], parseInt(tabStart[1].toString())-1, tabStart[0], 0, 0, 0)).toLocaleDateString('fr-FR', options)
      this.endDateText = new Date(Date.UTC(tabEnd[2], parseInt(tabEnd[1].toString())-1, tabEnd[0], 0, 0, 0)).toLocaleDateString('fr-FR', options) 
      console.log(this.startDateText)
      if (now < end) {
          
            if (now === start) {
            this.isRunning = true
            resolve("ok")
          } else if (now > start) {
            this.isRunning = true
            resolve("ok")
          } else if(now < start) {
            this.isRunning = false
            resolve("ok")
          }
         }
    })
  }

    verifyIfCampaignEnd(endDateFrench): Promise<any>{
    return new Promise(resolve => {
          var tabEnd = endDateFrench.split("/") 
          var frenchDateEnd = tabEnd[2] + "-" + tabEnd[1] + "-" + tabEnd[0] 
          var today_date = new Date().getDate()
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
          var now = new Date(this.today).setHours(0,0,0,0)
          var end = new Date(frenchDateEnd).setHours(0, 0, 0, 0)
          if (now === end) {
            console.log('end today')
            resolve("ok")
          } else if (now > end) {
            console.log("campaign ended")
            resolve("ok")
          } else if(now < end) {
            console.log("campaign not ended")
            resolve("ok")
          }
    })
  }
  toggleCreateCampaign(){
    if(this.createCampaign===false){
      this.createCampaign=true
      this.userProfile = false
      this.showHome = false
    }else{
      this.createCampaign = false
      this.showHome = true
       this.userProfile = false
    }
  }
  toggleUserProfile(){
    if(this.userProfile===false){
      this.userProfile = true
      this.createCampaign=false
      this.showHome = false
    } else {
       this.userProfile = false
      this.createCampaign=false
      this.showHome = true
    }
  }
  ngOnInit() {
 /* this.openSnackBar("Heure de diffusion modifiée avec succès", "ok") */
    /*        L10n.load({
          'fr': {
            'datepicker': {
              placeholder: 'Date de début',
              today:"Aujourd'hui"
            }
          }
        }) */
    ;
    this.getRoute().then(res => {
      if (res == "ok") {
              this.auth.user.forEach(data1 => {
      this.accountValue = data1.account_value
                this.uid = data1.uid
               
                this.email = data1.email
      
                this.notesService.getSingleCampaign(this.id_campagne, this.name).subscribe(res => {
                  this.dataSourceCampaign = res
                  this.budgetTable = res
                  this.dataSourceCampaign = res
        res.forEach(data => {
          this.status = data['status']
          this.startDateFrench = data['startDateFrench']
         
        this.endDateFrench = data['endDateFrench'] 
         this.dure_campagne = this.datediff(this.parseDate(data['startDateFrench']), this.parseDate(data['endDateFrench'] ))
          this.servingStatus = data['servingStatus']
          this.dateCampaignForm = this.fb.group({
        start: [new Date(), Validators.nullValidator],
        end: [new Date(), Validators.nullValidator],
          });
          console.log(this.dateCampaignForm.value)
        var result = data['zones']
          this.zone = result
          console.log(this.zone)
          var schedule = data['adsSchedules']
          
        this.appareils = data['devices']
        this.populations = data['ages']
        this.genres = data['sexes']
        this.clicks = data['clicks']
        this.impressions = data['impressions']
          this.cost = data['costs']
          this.budgetId = data['budgetId']
        this.budget = data['budget']
          this.dailyBudget = data['dailyBudget']
          this.numberOfDays = data['numberOfDays']
          
          this.campaignSchedule = data['adsSchedulesCriterion']
          this.currentFinalUrl = data['finalUrl']
          /* this.budgetTable.push({
            "debut": data['startDateFrench'],
            "fin": data['endDateFrench'] ,
            "budget": data['budget']
          }) */
          this.verifyIfCampaignStart(this.startDateFrench, this.endDateFrench, this.status).then(verify=>{
            if (verify === "ok") {
                    if (this.accountValue === 0 && this.budget === 0) {
            this.rechargeAccountDisabled = false
            this.increaseAccountDisabled = true
            this.defineBudgetDisabled = true
            this.increaseBudgetDisabled = true
            this.walletOptions = 'rechargeAccount'
            this.walletAction = "Recharger mon compte"
            /* this.rechargement_value = new FormControl('', [Validators.required, Validators.min(50), Validators.max(500)]); */
          } else if(this.accountValue===0 && this.budget > 0) {
            this.rechargeAccountDisabled = false
            this.increaseAccountDisabled = true
            this.defineBudgetDisabled = true
            this.increaseBudgetDisabled = false
            this.walletOptions="rechargeAccount"
            this.walletAction = "Recharger mon compte"
            /* this.rechargement_value = new FormControl('', [Validators.required, Validators.min(50), Validators.max(500)]); */
          } else if (this.accountValue > 0 && this.budget === 0) {
            this.walletOptions = "defineBudget"
            this.walletAction = "Placer un budget"
            this.defineBudgetDisabled = false
            this.increaseBudgetDisabled = true
            this.rechargeAccountDisabled = true
            this.increaseAccountDisabled = false
            
          } else {
            this.walletOptions = "increaseBudget"
            this.walletAction = "Augumenter le budget"
            this.defineBudgetDisabled = true
            this.increaseBudgetDisabled = false
            this.rechargeAccountDisabled = true
            this.increaseAccountDisabled = false
          }
          
          this.idA=data['ad_group_id_firebase']
          this.ad_group_id = data['ad_group_id']

      
         
          
           this.adgroups = this.adGroupService.getAdGroup(data['ad_group_id_firebase']).valueChanges().subscribe(res => {
             console.log(res)
                  this.status = res['status']
                  this.genres = res['sexes']
                  this.populations = res['ages']
                  this.appareils = res['devices']
                  this.placement = res['placement']



                })
          this.ads = this.adsService.getListAd(data['ad_group_id']).forEach(child => {
            console.log(data['ad_group_id'].toString())
    console.log(child)

            if (child.length > 0) {


              this.number_ads = child.length
      
              this.dataSource = new MatTableDataSource(child)
              this.dataSource.paginator = this.paginator;
            }
          })
                   this.dropdownSettingsZones = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      searchPlaceholderText: 'Rechercher',

     };
    

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
    
    for (let i = 0; i < this.NATIONALS_WEBSITES.length; i++){
      ////console.log(this.NATIONALS_WEBSITES[i][2])
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

            

 
    
    this.fetchData();

            }
          })
    
        
         
        
        
        ////console.log(data['startDate'])
           
    
      })
    }) 
    })

      }
      
         
    })

       
   
  }
   menuenter() {
   /*  this.isMatMenuOpen = true; */
   /*  if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    } */

  }

  menuLeave(trigger, button) {
    setTimeout(() => {
      if (this.isMatMenuOpen === true) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
        /* if (this.isButtonClicked === false) {
          
        } */
      }
      /*  if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenuOpen = false;
      }  */
    }, 100)
  }

  menu2enter() {
    this.isMatMenu2Open = true;
  }

  menu2Leave(trigger1, trigger2, button) {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        trigger1.closeMenu();
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        /* this.enteredButton = false; */
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100)
  }

  buttonEnter(trigger, button) {
    
    setTimeout(() => {
      if (this.isMatMenuOpen === false) {
        this.prevButtonTrigger = trigger;
        this.previousButton = button
      /*   this.isMatMenuOpen = false;
      this.isMatMenu2Open = false; */
      
        trigger.openMenu()
       
        this.isMatMenuOpen = true
      } else {
        trigger.closeMenu();
        /* this.ren.removeClass(this.previousButton['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(this.previousButton['_elementRef'].nativeElement, 'cdk-program-focused'); */
        this.isMatMenuOpen = false
         trigger.openMenu()
       /*  this.ren.addClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.addClass(button['_elementRef'].nativeElement, 'cdk-program-focused'); */
        this.isMatMenuOpen = true
    }
   }, 100)
  }

  buttonLeave(trigger, button) {

    setTimeout(() => {
      /* if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } */ if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
       /*  this.enteredButton = false; */
      }
    }, 100)
  } getNotificationId(uid: string): Promise<string>{
    return new Promise(resolve => {
      this.auth.getNotificationData(uid).forEach(data => {
        resolve(data[0]['id'])
      })
    })
  }
 getCurrentUserCredentials(): Promise<any>{
    return new Promise(resolve => {
      var response = []
       this.auth.user.forEach(data => {
        response.push({
          "uid": data.uid,
          "account_value": data.account_value,
          "paymentKey": data.paymentKey
        })
          
          resolve(response)
          
        })
    })
  } 
    defineAmountAccount() {
      var self = this
      var browser = ""
      var redirect = ""
        
        this.notesService.detectDevice().then(res => {
          browser = res
           if (browser === "Opera") {
        redirect = SERVER.opera
      } else if (browser === "Chrome") {
        redirect = SERVER.chrome
      } else if(browser === "Safari") {
        var current_browser_url = window.location.href
        if (current_browser_url.includes("www")) {
          redirect = SERVER.safari1
        } else {
          redirect = SERVER.safari2
        }
          }
          this.montant = $("#montant").val()
    if (this.montant < 20000) {
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
      var key = this.generate(100)
      localStorage.setItem(key, this.montant.toString())
      this.auth.updateUser(this.uid, {paymentKey: key})
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
            requestTokenUrl: SERVER_URL+'/rechargeAmount/'+ self.montant+"/rechargement/"+redirect,
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
                ////console.log("Je me prepare a obtenir un token");
                selector.prop('disabled', true);
                //var ads = []


            },
            didGetToken: function (token, redirectUrl) {
                ////console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
              //console.log('redirec_url')
                selector.prop('disabled', false);
            },
            didReceiveError: function (error) {
                //alert('erreur inconnu');
                selector.prop('disabled', false);
            },
            didReceiveNonSuccessResponse: function (jsonResponse) {
                ////console.log('non success response ', jsonResponse);
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
            alertDialogTextColor: '#333',
            alertDialogConfirmButtonBackgroundColor: '#0178bc',
          alertDialogConfirmButtonTextColor: '#fff',
          
        });
    }, 500)
          }
        })


      
      
      
    }
        })
     
    
  }
  downloadFile() {
    this.isCreating = true
    let download = require('../../../../../assets/js/download.js');
    let file_name = this.id_campagne
    
    let url = `${SERVER.url}/uploads/${this.id_campagne}.csv`;
    fetch(SERVER.url + "/campaignReport/" + this.id_campagne).then(res => {
  
      if (res['status'].toString() == "200") {
        
         /* fetch(url, {
          method: 'OPTIONS',
          headers: {
            'Authorization': ''
          }
        }).then(function(resp) {
          return resp.blob();
        }).then(function(blob) {
          download(blob);
        }); */
        var self = this
        var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  if (this.status == 200) {
    var myBlob = this.response;
    ////console.log(myBlob)
    download(myBlob, "Reporting", "text/csv")

    // myBlob is now the blob that the object URL pointed to.
  }
};
xhr.send();
      }
      this.isCreating = false
    });
}

  /*  this.adgroups = this.getData();
   
    
   })  */
  go() {
  window.location.replace(SERVER.url_redirect)
}

 
  targetGender() {
    if (this.genreForm.valid) {
      this.spinnerTargetGenre = true
      this.adGroupService.targetGenre(this.idA, parseInt(this.id_campagne), this.ad_group_id, this.sexes).then(res => {
        if (res == "ok") {
          this.sexes = []
          this.spinnerTargetGenre = false
          this.isCiblageGenre = false
          
        }
      })

    }
}

  targetPlacement() {
    var self = this
    var placement = []
    ////console.log(this.ads_websites)
    ////console.log(this.nationals_websites)
    ////console.log(this.internationals_websites)
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
      /* this.adGroupService.targetPlacement(this.idA, this.campagne_id, this.ad_group_id, placement).then(res => {
        this.sexes = []
      }).then(res => {
        this.isCiblageGenre = false
        this.isCreating = false
      }) */

    }
  }

 
  
  targetDevices() {
    ////console.log(this.devices)
    if (this.deviceForm.valid) {

      this.spinnerTargetDevice = true
      this.adGroupService.targetDevices(this.idA, this.id_campagne.toString(), this.ad_group_id, this.devices).then(res => {
        if (res == "ok") {
          this.devices = []
          this.spinnerTargetDevice = false
          this.isCiblageDevices = false
        }
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
  this.isPlacement = false
}


   targetAge() {
    ////console.log(this.ages)
    console.log(this.ageForm)
    if (this.ageForm.valid) {
      this.spinnerTargetAge = true
      this.adGroupService.targetAge(this.idA, parseInt(this.id_campagne), this.ad_group_id, this.ages).then(res => {
        if (res == "ok") {
          this.ages = []
          this.spinnerTargetAge = false
          this.isCiblageAge = false
        
        }
      })


    } else {

    }

  }

  closeAddCiblageAges() {
    this.isCiblageAge = false
  }

  onAgeSelect(item: any) {
    this.ages.push(item)
    ////console.log(this.ages)
  }
  onAgeSelectAll(items: any) {
    ////console.log(items);
    this.ages = []
    this.ages = items
  }
  onAgeDeSelect(item: any) {
    ////console.log(item)
    for (var i = 0; i < this.ages.length; i++) {
      if (this.ages[i]['item_id'] == item.item_id) {
        this.ages.splice(i, 1)
      }
    }
    ////console.log(this.ages)

  }
  onDeSelectAllAge() {
    this.ages = []
    ////console.log(this.ages)
  }


    onNationalsWebsitesSelect(event) {
    /*  this.nationals_errors = ''
     this.nationals_websites.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.nationals_websites.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.nationals_websites.length; i++) {
          if (this.nationals_websites[i]['item_id'] == event.source.value.item_id) {
            this.nationals_websites.splice(i, 1)
            console.log(this.nationals_websites)

          }
        }
      }
      console.log(this.nationals_websites)
      console.log(event.source.value, event.source.selected);

    }
    ////console.log(this.nationals_websites)
  }
  onNationalsWebsitesSelectAll(items: any) {
     this.nationals_errors = ''
    this.nationals_websites = []
    this.nationals_websites = items
    ////console.log(this.nationals_websites);
  }
  onNationalsWebsitesDeSelect(item: any) {
    ////console.log(item)
    for (var i = 0; i < this.nationals_websites.length; i++) {
      if (this.nationals_websites[i]['item_id'] == item.item_id) {
        this.nationals_websites.splice(i, 1)
      }
    }
    ////console.log(this.nationals_websites)

  }
  onNationalsWebsitesDeSelectAll() {
    this.nationals_websites = []
    ////console.log(this.nationals_websites)
  }


     onInternationalsWebsitesSelect(event) {
    /*    this.internationals_websites.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.internationals_websites.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.internationals_websites.length; i++) {
          if (this.internationals_websites[i]['item_id'] == event.source.value.item_id) {
            this.internationals_websites.splice(i, 1)
            console.log(this.internationals_websites)

          }
        }
      }
      console.log(this.internationals_websites)
      console.log(event.source.value, event.source.selected);
      
    }
    ////console.log(this.internationals_websites)
  }
  
  onInternationalsWebsitesSelectAll(items: any) {
    
    this.internationals_websites = []
    this.internationals_websites = items
    ////console.log(this.internationals_websites)
  }
  onInternationalsWebsitesDeSelect(item: any) {
    ////console.log(item)
    for (var i = 0; i < this.internationals_websites.length; i++) {
      if (this.internationals_websites[i]['item_id'] == item.item_id) {
        this.internationals_websites.splice(i, 1)
      }
    }


  }
  onInternationalsWebsitesDeSelectAll() {
    this.internationals_websites = []
   
  }

    onAdsWebsitesSelect(event) {
    /*     this.ads_websites.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.ads_websites.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.ads_websites.length; i++) {
          if (this.ads_websites[i]['item_id'] == event.source.value.item_id) {
            this.ads_websites.splice(i, 1)
            console.log(this.ads_websites)

          }
        }
      }
      console.log(this.ads_websites)
      console.log(event.source.value, event.source.selected);

    }
    ////console.log(this.ads_websites)
  }
  onAdsWebsitesSelectAll(items: any) {
    this.ads_websites = []
    this.ads_websites = items
    ////console.log(this.ads_websites);
    
  }
  onAdsWebsitesDeSelect(item: any) {
    ////console.log(item)
    for (var i = 0; i < this.ads_websites.length; i++) {
      if (this.ads_websites[i]['item_id'] == item.item_id) {
        this.ads_websites.splice(i, 1)
      }
    }
    ////console.log(this.ads_websites)

  }
  onAdsWebsitesDeSelectAll() {
    this.ads_websites = []
    ////console.log(this.ads_websites)
  }

   onAppsSelect(item: any) {
    this.apps.push(item)
    ////console.log(this.apps)
  }
  onAppsSelectAll(items: any) {
    this.apps = []
    this.apps = items
    ////console.log(this.apps);
  }
  onAppsDeSelect(item: any) {
    ////console.log(item)
    for (var i = 0; i < this.apps.length; i++) {
      if (this.apps[i]['item_id'] == item.item_id) {
        this.apps.splice(i, 1)
      }
    }
    ////console.log(this.apps)

  }
  onAppsDeSelectAll() {
    this.apps = []
    ////console.log(this.apps)
  }



  onDevicesSelect(item: any) {
    this.devices.push(item)
    ////console.log(this.devices)
  }
  onDevicesSelectAll(items: any) {
    ////console.log(items);
    this.devices = []
    this.devices = items
  }
  onDevicesDeSelect(item: any) {
    ////console.log(item)
    for (var i = 0; i < this.devices.length; i++) {
      if (this.devices[i]['item_id'] == item.item_id) {
        this.devices.splice(i, 1)
      }
    }
    ////console.log(this.devices)

  }
  onDeSelectAllDevices() {
    this.devices = []
    ////console.log(this.devices)
  }

  onSexeSelect(item: any) {
    this.sexes.push(item)
    ////console.log(this.sexes)
  }
  onSexeSelectAll(items: any) {
    ////console.log(items);
    this.sexes = []
    this.sexes = items
  }
  onSexeDeSelect(item: any) {
    ////console.log(item)
    for (var i = 0; i < this.sexes.length; i++) {
      if (this.sexes[i]['item_id'] == item.item_id) {
        this.sexes.splice(i, 1)
      }
    }
    ////console.log(this.sexes)

  }
  onDeSelectAllSexe() {
    this.sexes = []
    ////console.log(this.sexes)
  }
/*   onZoneSelect(item: any) {
    this.selectedZones = []
    this.selectedZones.push(item)
    ////console.log(this.selectedZones)
  } */
    
   onZoneSelect(event) {
   /* this.zones.push(item) */
    
     if (event.isUserInput) {
      this.zones = []
      this.selectedZones = []
      this.zones.push(
        event.source.value
       )
       this.selectedZones.push(event.source.value)
       console.log(this.selectedZones)
    /*   if (event.source.selected === true) {
      } else {
        for (var i = 0; i < this.zones.length; i++) {
          if (this.zones[i]['item_id'] == event.source.value.item_id) {
            this.zones.splice(i, 1)
            console.log(this.zones)

          }
        }
      } */
     
    }
    ////console.log(this.zones)
  }
/*   onZoneSelectAll(items: any) {
    ////console.log(items);
  } */
  onZoneDeSelect(item: any) {
    ////console.log(item)
    this.selectedZones = []
    ////console.log(this.selectedZones)

  }
/*   onDeSelectAllZone() {
    this.zones = []
    ////console.log(this.zones)
  } */
  parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1], mdy[0]);
}

 datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
 }
  
 

  getData(): Observable < any[] > {
    // ['added', 'modified', 'removed']

    return this.adGroupCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return {
            id: a.payload.doc.id,
            ...data
          };
        });
      })
    );
  }
  addAdGroup() {
    this.loadProgress= true;
    var self = this
    var name = $('#adgroup').val().replace(/\s/g, "")
    this.adGroupService.newAdGroup(this.id_campagne, this.uid, name).then(res => {
      //console.log(res)
      if (res != "error") {
        
        this.loadProgress = false
        this.isAdGroup = false
        setTimeout(() => {
          document.getElementById(res).click()
          
        }, 1500)
       
        
      }
    }).catch(err => {
      this.isCreating = false
      //alert('Opération échouée')
    })
  }

  onDateStartChange(args) {
    var DATE = args.value.toString().split(' ')
    ////console.log(DATE)
    var parsed = JSON.parse(JSON.stringify(MONTH))
    var DATE_ELEMENT = parsed[0][DATE[1]]
    var day = DATE[2]
    var month = DATE_ELEMENT.number
    var years = DATE[3]
    this.startDate = `${day}/${month}/${years} `
    var date = `${years}${month}${day}`
    
    this.isCreating = true
    this.notesService.getCampaignDates(this.id_campagne, this.name).then(value => {

      if (value['startDate'] == date || value['endDate'] == date) {
        //alert('erreur de date de début')
        this.isCreating = false
      } else {
        this.notesService.updateStartDate(this.id, this.id_campagne, date, this.startDate)
        
        this.isCreating = false

      }
      

    })
    
    
  }
 /*  onEndDateChange(args) {
  var DATE = args.value.toString().split(' ')
  
    var parsed = JSON.parse(JSON.stringify(MONTH))
    var DATE_ELEMENT = parsed[0][DATE[1]]
    var day = DATE[2]
    var month = DATE_ELEMENT.number
    var years = DATE[3]


    this.endDate = `${day}/${month}/${years} `
    var date = `${years}${month}${day}`
    this.isCreating = true
    this.notesService.getCampaignDates(this.id_campagne, this.name).then(value => {

 
      if (value['startDate'] == date || value['endDate'] == date) {
    
          this.isCreating = false
        //alert('erreur de date de fin')
        

      } else {
        this.notesService.updateEndDate(this.id, this.id_campagne, date, this.endDate)

        this.isCreating = false
      }

    })
  } */
  openAddLocation() {
    this.isCiblage = true;
  }
  closeAddLocation() {
    this.isCiblage = false
  }
  targetZones() {
    this.isCreating = true
  
    this.notesService.targetLocation(this.id, this.id_campagne, this.name, this.selectedZones).then(res => {
      if (res == "ok") {
        this.isCiblage = false
        this.isCreating = false
        
      } else {
         this.isCreating = false
      }
    })
  }

  updateTargetZones() {
   
    if (this.location.valid) {
      this.notesService.updateTargetLocation(this.id, this.id_campagne, this.name, this.selectedZones).then(res => {
    
    })
  }
  }

  toggleAddNewAdGroup() {
    this.isAdGroup = true
  }
  closeAddAdGroup() {
    this.isAdGroup = false
  }
 toggleCampaignZones() {
   if (this.showZonesBlock === false) {
       this.showBudgetBlock = false
      this.showZonesBlock = true

        this.location = this.fb.group({
           zone: [{value: '', Validators: Validators.required}],
         
    });
    }else{
      this.showZonesBlock = false
    }
  }
  toggleBudgetBlock() {
    if (this.showBudgetBlock === false) {
      this.showBudgetBlock = true
      this.showZonesBlock = false
    
      
        /*  if (this.accountValue !== 0) {
           this.rechargement_value_budget = new FormControl('', [Validators.required, Validators.min(50), Validators.max(this.accountValue/1000)]);
         }  */
    } else {
      this.showBudgetBlock = false
    }
  }
  toggleCreateCreativesBlock() {
    if (this.blockCreatives === false) {
      this.titleBlock="Créer un visuel"
      this.blockCreatives = true
      this.blockListCreatives = false
      this.blockPrincipal = false
       this.createCampaign = false
        this.userProfile = false
      this.showHome = true
    } else {
      this.blockCreatives = false
       this.userProfile = false
      this.blockPrincipal = true
      this.titleBlock="Paramètres de la campagne"
    }
  }

  toggleListCreatives() {
    if (this.blockListCreatives === false) {
      this.blockListCreatives = true
      this.blockPrincipal = false
      this.blockCreatives = false
      this.titleBlock="Tous les visuels"
      this.createCampaign = false
       this.userProfile = false
      this.showHome = true
      
    } else {
       this.userProfile = false
      this.blockListCreatives = false
      this.blockPrincipal = true
      this.titleBlock="Créer un visuel"
    }
  }
  toggleHomeBlock() {
    if (this.showHome === false) {
      this.createCampaign = false
      this.blockPrincipal = true
      this.blockListCreatives = false
      this.blockCreatives = false
      this.userProfile = false
      this.showHome = true

      
    }
  }
    actionClicked(action: string) {
       this.ren.addClass(this.previousButton['_elementRef'].nativeElement, 'cdk-focused');
      this.ren.addClass(this.previousButton['_elementRef'].nativeElement, 'cdk-program-focused');
      this.isButtonClicked = false
    if (action === "createCreatives") {
      
      this.toggleCreateCreativesBlock()
    } else if (action === "listCreatives") {
      this.toggleListCreatives()
    } else if (action === "home") {
    this.toggleHomeBlock()
    }else if(action==="toggleCampaignList"){
      this.router.navigate(["/"])
    }else if(action==="createCampaign"){
      this.toggleCreateCampaign()
    }else if(action==="showUserData"){
      this.toggleUserProfile()
    }
  }
  deleteCampaign() {
     this.http.post(SERVER_URL+'/deleteCampaign', {
            'id': this.id_campagne,
          })
          .subscribe(
            res => {
              if (res[0].status ==="ok") {
                this.notesService.deleteNote(this.id).then(res => {
                  if (res == "ok") {
                    this.notesService.getListCampaign(this.uid).subscribe(data => {
                      if (data.length === 0) {
                        this.router.navigate(['userProfile'])
                      }
                    })
                  }
                })
              } 
            },
            err => {
            }
          );
  }

  enableCampaign() {
    this.progressBarEnableDisableCampaign = true
     this.http.post(SERVER_URL+'/updateCampaignStatus', {
            'campaign_id': this.id_campagne,
            'status': 'ENABLED'
          })

          .subscribe(
            res => {
              if (res[0].status != "error") {
                this.notesService.updateNote(this.id, {
                  status: res[0].status
                })
                this.progressBarEnableDisableCampaign = false
                this.openSnackBar('Campagne activée avec succès', "ok")
              }

             
            },
            err => {
           
             
            }
          );
  }
  disableCampaign() {
    this.progressBarEnableDisableCampaign = true
     this.http.post(SERVER_URL+'/updateCampaignStatus', {
            'campaign_id': this.id_campagne,
            'status': 'PAUSED'
          })

          .subscribe(
            res => {
              if (res[0].status != "error") {
                this.notesService.updateNote(this.id, {
                  status: res[0].status
                })
                this.progressBarEnableDisableCampaign = false
                this.openSnackBar('Campagne mise en veille avec succès', "ok")
              }

             
            },
            err => {
           
             
            }
          );
  }
  
  updateCampaign() {

    ////console.log(this.id_campagne)
    ////console.log(this.name)
    Swal.fire({
      title: '',
      type: 'info',
      html: ' <div class="card shadow no-b r-0"><div class="card-header text-center white b-0"><h6>Modifier la campagne</h6></div>' +
        ' <div class="card-body"><form class="needs-validation" novalidate><div class="form-row">' +
        '<div class="col-md-6"> <label for="validationCustom01">Nom</label> <input type="text" class="form-control"  placeholder="Nom de la campagne" id="campagne_name" value=' + this.name + ' required><div class="valid-feedback">Looks good!</div></div>' +
        '<div class="col-md-6"> <label for="validationCustom01">Status</label>  <select class="custom-select select2" required><option value=""></option> <option value="PAUSED">Désactiver</option><option value="ENABLED">Activer</option> </select></div>' +
        '</form></div></div></div>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="icon-check"></i> Valider',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="icon-remove"></i>',
      cancelButtonAriaLabel: 'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

      if (result.dismiss) {
        this.isCreating = false
      } else {
        var data = []
        this.isCreating = true
        //Si nom inshangé et status inchangé
        if (this.name == $("#campagne_name").val() && this.status == $('.custom-select').val()) {
          Swal.fire({
            title: 'Modification!',
            text: 'Aucune modification détectée',
            type: 'warning',
            showCancelButton: false,
            focusConfirm: false,
            buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
            confirmButtonText: 'Ok'
          })
          this.isCreating = false
          //Si nom inchangé et status changé
        } else if (this.name == $("#campagne_name").val() && this.status != $('.custom-select').val() && $('.custom-select').val() != "") {
          data.push({
            "id": this.id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": this.name,
            "email": this.email,
            "status": $('.custom-select').val(),
            "state": "1"
          })
          $.ajax({
            type: "POST",
            url: SERVER_URL+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            ////console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(this.id, {
                status: response[0].status
              })
              this.isCreating = false

              Swal.fire({
                title: 'Modification!',
                text: 'Status de la campagne modifié avec succès.',
                type: 'success',
                showCancelButton: false,
   buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              }).then((result) => {
                this.isCreating = false
                if (result.value) {
                  window.location.reload()

                }
              })



            } else {
              this.isCreating = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
   buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              })
            }
          })
          //Si nom changé et status inchangé
        } else if (this.name != $("#campagne_name").val() && this.status == $('.custom-select').val()) {
          data.push({
            "id": this.id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": this.name,
            "email": this.email,
            "status": this.status,
            "state": "2"
          })
          $.ajax({
            type: "POST",
            url: SERVER_URL+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            ////console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(this.id, {
                name: response[0].name
              })
              this.isCreating = false
              Swal.fire({
                title: 'Modification!',
                text: 'Nom de la campagne modifié avec succès.',
                type: 'success',
                showCancelButton: false,
   buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  window.location.reload()

                }
              })
            } else {
              this.isCreating = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
   buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              })

            }
          })
          //Si nom et status modifés
        } else if (this.name != $("#campagne_name").val() && this.status != $('.custom-select').val() && $('.custom-select').val() != "" && $("#campagne_name").val() != "") {
          data.push({
            "id": this.id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": this.name,
            "email": this.email,
            "status": $('.custom-select').val(),
            "state": "3"
          })
          $.ajax({
            type: "POST",
            url: SERVER_URL+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            ////console.log(response)
            if (response[0].status != "error") {

              this.notesService.updateNote(this.id, {
                name: response[0].name,
                status: response[0].status
              })

              Swal.fire({
                title: 'Modification!',
                text: 'Le nom et le status de votre campagne ont été modifié avec succès.',
                type: 'success',
                showCancelButton: false,
   buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  window.location.reload()

                }
              })

            } else {
              this.isCreating = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
   buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              })
            }
          })
          //Si nom changé et status vide
        } else if (this.name != $("#campagne_name").val() && $('.custom-select').val() == "") {
          data.push({
            "id": this.id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": this.name,
            "email": this.email,
            "status": this.status,
            "state": "4"
          })
          $.ajax({
            type: "POST",
            url: SERVER_URL+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            ////console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(this.id, {
                name: response[0].name
              })
              this.isCreating = false
              Swal.fire({
                title: 'Modification!',
                text: 'Nom de la campagne a été modifié avec succès.',
                type: 'success',
                showCancelButton: false,
   buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  window.location.reload()

                }
              })
            } else {
              this.isCreating = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              })

            }
          })

        } else if ($("#campagne_name").val() == "" && $('.custom-select').val() == "") {
          Swal.fire({
            title: 'Modification!',
            text: 'Aucune Modification détectée',
            type: 'warning',
              buttonsStyling: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
            confirmButtonText: 'Ok'
          })


        } else {
          this.isCreating = false
          Swal.fire({
            title: 'Errur!',
            text: 'Données invalides',
            type: 'error',
              buttonsStyling: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
            confirmButtonText: 'Ok'
          })
        }
      }
    })
  }




  changeAdGroupStatus(id: string, adgroup_id: string, last_status: string) {
    Swal.fire({
      title: "Status groupe d'annonce",
      text: "Voulez vous modifier le status de votre groupe d'annonce!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, modifier!'
    }).then((result) => {
      if (result.value) {
        /*  */
        this.isCreating = true
        this.http.post(SERVER_URL+'/updateAdGroupStatus', {
            'adgroup_id': adgroup_id,
            'last_status': last_status
          })

          .subscribe(
            res => {
              ////console.log(res)

              this.adGroupService.updateAdgroup(id, {
                status: res['status_adgroup']
              }).then(res => {
                Swal.fire(
                  'Modifier!',
                  'Status du groupe modifié.',
                  'success'
                ).then(res => {
                  this.isCreating = false
                })
              })

            },
            err => {
              this.isCreating = false
              Swal.fire({
                title: "Service Groupe d'annonce!",
                text: 'Erreur.',
                type: 'error',
                showCancelButton: false,
   buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {}
              })
            }
          );


      }
    })
  }


  removeAdGroup(id: string, adgroup_id: string) {
    Swal.fire({
      title: "Service groupe d'annonce",
      text: "Voulez vous supprimer votre groupe d'annonce!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        /*  */
        this.isCreating = true
        this.http.post(SERVER_URL+'/deleteAdGroup', {
            'adgroup_id': adgroup_id,

          })

          .subscribe(
            res => {
              ////console.log(res)

              this.adGroupService.deleteAdGroup(id).then(res => {
                Swal.fire(
                  'Supprimer!',
                  "Groupe d'annonce supprimé avec succès!",
                  'success'
                ).then(res => {
                  this.isCreating = false
                })
              })

            },
            err => {
              this.isCreating = false
              Swal.fire({
                title: "Service Groupe d'annonce!",
                text: 'Erreur.',
                type: 'error',
                showCancelButton: false,
   buttonsStyling: true,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {}
              })
            }
          );

      }
    })
  }
  getListIdAdGroup(): Promise<any>{
    return new Promise(resolve => {
      
      this.adGroupService.getListAdGroup(this.id_campagne).forEach(child => {
        ////console.log(child)
        if (child.length == 0) {
          ////console.log("aucun groupe d'annonce")
          this.ad_groups_list_id = []
          this.ad_group_tab_content = []
        } else if (child.length == 1) {
          ////console.log("un seul groupe")
          this.ad_groups_list_id.push(child[0]['id'])
          this.ad_group_tab_content.push(child[0]["ad_group_id"])
        } else {
          
          ////console.log('plusieurs groupes')
          for (let i = 0; i < child.length; i++){
            ////console.log(`child i ${child[i]}`)
            this.ad_groups_list_id.push(child[i]['id'])
            this.ad_group_tab_content.push(child[i]["ad_group_id"])
          }
          
        }
              /*  this.ad_group_tab_content.push(child[i]["ad_group_id"])
                this.ad_groups_list_id.push(child[i]['id']) */
            
            /* if (child.length > 0) {
              ////console.log(child)
              child.forEach(element => {
                ////console.log(element['id'])
               
              })
              
            } */
            resolve('ok')
          }) 
      
    })
  }

  getListIdAd(): Promise<any>{
    
    return new Promise(resolve => {
      this.getListIdAdGroup().then(res => {
        for (let i = 0; i < this.ad_group_tab_content.length; i++){
          this.adsService.getListAd(this.ad_group_tab_content[i]).forEach(child => {
            if (child.length == 0) {
          ////console.log("aucune annonce")
          this.ads_list_id = []
          //this.ad_group_tab_content = []
        } else if (child.length == 1) {
          ////console.log("une seule annonce")
          this.ads_list_id.push(child[0]['id'])
         
        } else {
          
          ////console.log('plusieurs annonces')
          for (let i = 0; i < child.length; i++){
            this.ads_list_id.push(child[i]['id'])
           
          }
          
        }
          
            
          }) 
        }
        resolve('ok')
        
      })
      /*      */
      
    })
  }

 

  goAdGroups(ad_group_name: string, idA: string, ad_group_id: string) {
    
    this.router.navigate(['ads', ad_group_name, this.id, idA, ad_group_id, this.id_campagne]).then(() => {
     
     })
   
  }
  handleErrorBudget() {
    $('#error_budget').hide()
    
  }
  OpenModifyDateCampaign() {
    this.button_payments = false
    this.modifyDate = true
    this.isSetBudget = false
    this.isAccountRechargement = false
    this.isPlacementBudgetFromAccount = false
    $("#finalButtonPublier").hide()
    $("#dateBlock").hide()
  }
  CloseUpdateCampaignDate() {
    this.modifyDate = false
    this.button_payments = true
    $("#finalButtonPublier").show()
    $("#dateBlock").show()

  }
  CloseBudgetOperation() {
    this.isSetBudget = false
    this.button_payments = true
  }
  ClosePlaceBudgetFromAccountValue() {
    this.isPlacementBudgetFromAccount = false
    this.button_payments = true
  }
   CloseRechargeAccountOperation() {
     this.isAccountRechargement = false
     this.button_payments = true
  }
  onEndDateChange(args) {
    ////console.log(args.value)
    if (args.value != undefined) {
      this.newEndDate = args.value.toString()
      
    } else {
      this.newEndDate = ""
    }
  
    }
  
  onStartDateChange(args) {
    ////console.log(args.value)
    if (args.value != undefined) {
      this.newStartDate = args.value.toString()
      ////console.log(this.newStartDate)
      
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
    ////console.log(date)
    ////console.log(new Date(frenchDateStart))
    ////console.log(new Date(frenchDateEnd))
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
                   this.notesService.updateStartDate(this.id, this.id_campagne, date_start, this.UpdatedStartDate).then(res=>{
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
                   this.notesService.updateStartDate(this.id, this.id_campagne, date_start, this.UpdatedStartDate).then(res=>{
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
                   this.notesService.updateEndDate(this.id, this.id_campagne, date_end, this.UpdatedEndDate).then(res=>{
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
                   this.notesService.updateEndDate(this.id, this.id_campagne, date_end, this.UpdatedEndDate).then(res=>{
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
                   this.notesService.updateEndDate(this.id, this.id_campagne, date_end, this.UpdatedEndDate).then(res=>{
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
                   this.notesService.updateEndDate(this.id, this.id_campagne, date_end, this.UpdatedEndDate).then(res=>{
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
                   this.notesService.updateEndDate(this.id, this.id_campagne, date_end, this.UpdatedEndDate).then(res=>{
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
                  this.notesService.updateDates(this.id, this.id_campagne, date_start, this.UpdatedStartDate, date_end, this.UpdatedEndDate).then(res=>{
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
          confirmButtonColor: '#26a69a',
          cancelButtonColor: '#d33',
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
                  this.notesService.updateDates(this.id, this.id_campagne, date_start, this.UpdatedStartDate, date_end, this.UpdatedEndDate).then(res=>{
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
                  this.notesService.updateDates(this.id, this.id_campagne, date_start, this.UpdatedStartDate, date_end, this.UpdatedEndDate).then(res=>{
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


    ////console.log(`startDate: ${this.startDate}, updatedStartDate: ${this.UpdatedStartDate}`)
    ////console.log(`endDate: ${this.endDate}, updatedEndDate: ${this.UpdatedEndDate}`)
    ////console.log(`startDateFrench: ${this.startDateFrench.replace("/", "-").replace("/", "-")}, endDateFrench: ${this.endDateFrench.replace("/", "-").replace("/", "-")}`)
    ////console.log(this.today)
 */
  }



  listCampagne() {
    this.router.navigate(['CampaignList']).then((value) => {
      if (value === true) {
        window.location.replace(SERVER.url_redirect)
        
      }
    })
    
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
     /*    ////console.log(`start date from firebase: ${value['startDate']} end date from firebase: ${value['endDate']}`)
      ////console.log(`end date from me: ${date}`)  */
       resolve('error')
        
      } else {
  this.notesService.updateStartDate(this.id, this.id_campagne, date, this.UpdatedStartDate)
  ////console.log(this.id)
          
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
     /*    ////console.log(`start date from firebase: ${value['startDate']} end date from firebase: ${value['endDate']}`)
      ////console.log(`end date from me: ${date}`)  */
          resolve('error')
          

      } else {
        this.notesService.updateEndDate(this.id, this.id_campagne, date, this.UpdatedEndDate)
        resolve('ok')
      }
    })
  }
  
 
  handleSimulatedImpressionsCount() {
    ////console.log('keyup')
    $('#error_recharge').hide()
    this.isSimulation = true
    var montant = $("#montant").val()
    if (montant == "" ) {
    
      this.number_of_impressions_simulated = 0
      this.my_gain = 0
      this.budget_to_place = 0
      this.error_recharge = "Saisir un budget"
       $('#error_recharge').show()
    } else if (montant < MIN_BUDGET_VALUE) {
        this.number_of_impressions_simulated = 0
      this.my_gain = 0
      this.budget_to_place = 0
      this.error_recharge = "Budget doit être supérieur ou égal à 10 000 FCFA"
      $('#error_recharge').show()
    } else if (montant > MAX_BUDGET_VALUE) {
         this.number_of_impressions_simulated = 0
      this.my_gain = 0
      this.budget_to_place = 0
      this.error_recharge = "Budget indisponible"
      $('#error_recharge').show()
    } else{
      this.my_gain = (20 * montant) / 100
      this.budget_to_place = montant - this.my_gain
      this.number_of_impressions_simulated = parseInt(((this.budget_to_place *1000) / 33.3).toString())
      this.montant = montant
      //var budget_to_place_in_dollar = budget_to_place * 550
      
      
    }
  }

   handleIfValide() {
    ////console.log('keyup')
/*     $('#error_recharge').hide()
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
      
      
    } */
     console.log(this.value_for_account_recharge)
     console.log(this.rechargement_value.hasError("min"))
   }
  
  handleIfBudgetToPlaceFromAccountIsValid() {
    $('#error_recharge').hide()
    var montant = this.rechargement_value_budget.value * 1000


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
      this.number_of_impressions_simulated = parseInt(((this.budget_to_place *1000) / 33.3).toString())
      this.montant = montant
      
      
    }
  }

  handleIfBudgetToIncreaseFromAccountIsValid() {
    $('#error_recharge').hide()
    var montant = (this.rechargement_value_budget_increase.value * 1000)
    var new_budget = montant + this.budget


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
      this.budget_to_place = new_budget - this.my_gain
      this.number_of_impressions_simulated = parseInt(((this.budget_to_place *1000) / 33.3).toString())
      this.montant = new_budget
      
      
    }
  }

   handleBudgetPlacement() {
     this.isAccountRechargement = false
     this.isPlacementBudgetFromAccount = false
     this.button_payments = false
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
    this.button_payments = false
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
     this.button_payments = false
     this.isAccountRechargement = true
    
    
  }
  defineBudget() {
    var self = this
    var browser = ""
      var redirect = ""
        
        this.notesService.detectDevice().then(res => {
          browser = res
           if (browser === "Opera") {
        redirect = SERVER.opera
      } else if (browser === "Chrome") {
        redirect = SERVER.chrome
      } else if(browser === "Safari") {
        var current_browser_url = window.location.href
        if (current_browser_url.includes("www")) {
          redirect = SERVER.safari1
        } else {
          redirect = SERVER.safari2
        }
          }
          if (this.montant < 10000) {
         Swal.fire({
          title: "Service budget",
          text: "Montant invalide",
          type: 'warning',
          showCancelButton: true,
           confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
          confirmButtonText: 'réessayer '
        }).then((result) => {
          if (result.value) {
          
          }
        })
    } else if (this.montant > 1000000) {
       Swal.fire({
          title: "Service budget",
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
    } else {
      Swal.fire({
        title: "Service budget",
        html: "<span>Vous allez procéder au paiement dans quelques instant saisissez le <strong class='adafri font-weight-bold adafri-police-18'>#144#391#</strong> sur votre téléphone pour payer avec orange money<span>",
        type: 'info',
        showCancelButton: true,
        confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
        cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
        confirmButtonText: 'Procéder au paiement',
        cancelButtonText: "annuler"
      }).then((result) => {
        if (result.value) {
            var self = this
          this.isCreating = true
                
          var key = this.generate(100)
          localStorage.setItem(key, this.budget_to_place.toString())
          this.auth.updateUser(this.uid, {paymentKey: key})
    
      setTimeout(function () {
    
        var btn = document.getElementById("budgetSet");
        var selector = pQuery(btn);
        (new PayExpresse({
          item_id: 1,
        })).withOption({
            requestTokenUrl: SERVER_URL+'/Budget/'+self.id+"/"+self.id_campagne+"/"+self.budgetId+"/"+ self.montant+"/"+self.budget_to_place+"/"+self.dure_campagne+"/"+redirect,
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
                ////console.log("Je me prepare a obtenir un token");
                selector.prop('disabled', true);
                //var ads = []


            },
            didGetToken: function (token, redirectUrl) {
                ////console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                selector.prop('disabled', false);
            },
            didReceiveError: function (error) {
                //alert('erreur inconnu');
                selector.prop('disabled', false);
            },
            didReceiveNonSuccessResponse: function (jsonResponse) {
                ////console.log('non success response ', jsonResponse);
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
            alertDialogTextColor: '#333',
            alertDialogConfirmButtonBackgroundColor: '#0178bc',
          alertDialogConfirmButtonTextColor: '#fff',
          
        });
    }, 500)
        }
      })
      }
    
        })
     
    
     /*  $('#button_modal_define_budget').trigger('click') */
    

      
      
      
    
  }



  increaseBudgetValue() {
    if (this.rechargement_value_budget_increase.valid) {
      var self = this
      var montant = this.rechargement_value_budget_increase.value * 1000
      var newAccountValue = this.accountValue - montant
      var last_budget = this.budget 
      
           this.montant = montant + last_budget
         this.http.post(SERVER_URL+'/setBudgetFromAccount', {
      'budgetId': this.budgetId,
           'amount': this.budget_to_place,
      'dure': this.dure_campagne,
    })
      .subscribe(
        res => {
          
          if (res[0]['status'] == "ok") {
            this.notesService.updateNote(this.id, { budget: this.budget_to_place, dailyBudget: res[0]['dailyBudget'] }).then(res => {
              
              if (res == "ok") {
                 
                      this.auth.updateUser(this.uid, {account_value: newAccountValue }).then(res => {
                        
                        if (res == "ok") {
                          self.isCreating = false
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
                   window.location.reload()
                  }else{
                    window.location.reload()
                  }
                })
                        } else {
                          self.isCreating = false
                        }
              })
              } else {
                self.isCreating = false
              }
                 
               })
            
          } else {
            self.isCreating = false
          }
          
          
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

  defineBudgetFromAccount() {
    if (this.rechargement_value_budget.valid) {
      var self = this
      var montant = this.rechargement_value_budget.value * 1000
      var newAccountValue = this.accountValue - montant
           this.montant = montant
         this.http.post(SERVER_URL+'/setBudgetFromAccount', {
      'budgetId': this.budgetId,
           'amount': this.budget_to_place,
      'dure': this.dure_campagne,
    })
      .subscribe(
        res => {
          
          if (res[0]['status'] == "ok") {
            this.notesService.updateNote(this.id, { budget: this.budget_to_place, dailyBudget: res[0]['dailyBudget'] }).then(res => {
              
              if (res == "ok") {
                 
                      this.auth.updateUser(this.uid, {account_value: newAccountValue }).then(res => {
                        
                        if (res == "ok") {
                          self.isCreating = false
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
                   window.location.reload()
                  }else{
                    window.location.reload()
                  }
                })
                        } else {
                          self.isCreating = false
                        }
              })
              } else {
                self.isCreating = false
              }
                 
               })
            
          } else {
            self.isCreating = false
          }
          
          
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

  encrypted(text, password){

  return CryptoJS.AES.encrypt(text, password);
}
  
  
  
  defineAmountAccountBeforeBudget() {
    if (this.rechargement_value.valid) {
      this.montant = this.rechargement_value.value * 1000
      var browser = ""
        var redirect = ""
      this.notesService.detectDevice().then(res => {
        browser = res
          
        if (browser === "Opera") {
          redirect = SERVER.opera
        
        } else if (browser === "Chrome") {
          redirect = SERVER.chrome
               
        } else if (browser === "Safari") {
          var current_browser_url = window.location.href
          if (current_browser_url.includes("www")) {
            redirect = SERVER.safari1
            
          } else {
            redirect = SERVER.safari2
            
          }
          
        }

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
              /* var crypt = this.cryptMoney(this.montant.toString()) */
              this.isCreating = true
       var key = this.generate(100)
      localStorage.setItem(key, this.montant.toString())
      this.auth.updateUser(this.uid, {paymentKey: key})
     /*  var crypt = this.encrypted(this.montant.toString(), this.uid) */
      $('#closeModalRecharge').trigger('click')
      var self = this
      setTimeout(function () {
    
        var btn = document.getElementById("budgetSet");
        var selector = pQuery(btn);
        (new PayExpresse({
          item_id: 1,
        })).withOption({
            requestTokenUrl: SERVER_URL+'/rechargeAmountBeforeBudget/'+ self.montant + "/"+self.id_campagne+"/"+self.name+"/"+self.id+"/"+redirect,
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
                ////console.log("Je me prepare a obtenir un token");
                selector.prop('disabled', true);
                //var ads = []


            },
            didGetToken: function (token, redirectUrl) {
                ////console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                selector.prop('disabled', false);
            },
            didReceiveError: function (error) {
                //alert('erreur inconnu');
              selector.prop('disabled', false);
              self.isCreating = false
            },
            didReceiveNonSuccessResponse: function (jsonResponse) {
                ////console.log('non success response ', jsonResponse);
                //alert(jsonResponse.errors);
              selector.prop('disabled', false);
              self.isCreating = false
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
      })
    } else {
      this.getErrorMessageRechargement()
    }
        
        
  
   
     

  }
  increaseAmountValue() {
    if (this.rechargement_value_increase.valid) {
      this.montant = (this.rechargement_value_increase.value * 1000)
      var montant = (this.rechargement_value_increase.value * 1000) + this.accountValue
      var browser = ""
      var redirect = ""
      this.notesService.detectDevice().then(res => {
        browser = res
          
        if (browser === "Opera") {
          redirect = SERVER.opera
        
        } else if (browser === "Chrome") {
          redirect = SERVER.chrome
               
        } else if (browser === "Safari") {
          var current_browser_url = window.location.href
          if (current_browser_url.includes("www")) {
            redirect = SERVER.safari1
            
          } else {
            redirect = SERVER.safari2
            
          }
          
        }

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
            /* var crypt = this.cryptMoney(this.montant.toString()) */
            this.isCreating = true
            var key = this.generate(100)
            localStorage.setItem(key, montant.toString())
            this.auth.updateUser(this.uid, { paymentKey: key })
            /*  var crypt = this.encrypted(this.montant.toString(), this.uid) */
            $('#closeModalRecharge').trigger('click')
            var self = this
            setTimeout(function () {
    
              var btn = document.getElementById("budgetSet");
              var selector = pQuery(btn);
              (new PayExpresse({
                item_id: 1,
              })).withOption({
                requestTokenUrl: SERVER_URL + '/rechargeAmountBeforeBudget/' + self.montant + "/" + self.id_campagne + "/" + self.name + "/" + self.id + "/" + redirect,
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
                  ////console.log("Je me prepare a obtenir un token");
                  selector.prop('disabled', true);
                  //var ads = []


                },
                didGetToken: function (token, redirectUrl) {
                  ////console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                  selector.prop('disabled', false);
                },
                didReceiveError: function (error) {
                  //alert('erreur inconnu');
                  selector.prop('disabled', false);
                  self.isCreating = false
                },
                didReceiveNonSuccessResponse: function (jsonResponse) {
                  ////console.log('non success response ', jsonResponse);
                  //alert(jsonResponse.errors);
                  selector.prop('disabled', false);
                  self.isCreating = false
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
      })
    } else {
      this.getErrorMessageRechargementIncrease()
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
handleTogglePlacement() {
    if (this.isPlacement == false) {
      this.isPlacement = true
      this.emplacement = this.fb.group({
        nationalWeb: ['', Validators.required],
        internationalWeb: ['', Validators.nullValidator],
        adWeb: ['', Validators.nullValidator]
      });


    } else {
      this.isPlacement = false

    }
  }
    setPlacement(): Promise<any> {
    return new Promise(resolve => {
      var placement = []
    placement.push(this.nationals_websites, this.internationals_websites, this.ads_websites)

      this.adGroupService.targetPlacement(this.idA, parseInt(this.id_campagne), this.ad_group_id, placement).then(res => {
        if (res == "ok") {


          resolve("ok")
        } else {
          resolve('error')
        }
      })
    })
  }
    updatePlacement() {

      if (this.emplacement.valid) {
        this.spinnerTargetPlacement = true
      this.setPlacement().then(res => {
      if (res == "ok") {
        this.nationals_websites = []
        this.internationals_websites = []
        this.ads_websites = []
        this.spinnerTargetPlacement = false
        this.isPlacement = false
        
      }
    })
   }
  }
   openAddCiblageAge() {
    this.isCiblageAge = true;
    this.ageForm = this.fb.group({
      age: ['', Validators.required],

    });


  }
   openAddCiblageGenre() {
    this.isCiblageGenre = true;
    this.genreForm = this.fb.group({
      genre: ['', Validators.required],

    });

  }
  openAddCiblageDevices() {
    this.isCiblageDevices = true;
    this.deviceForm = this.fb.group({
      device: ['', Validators.required],

    });
  }
  chooseAdType() {

    /* this.chooseAdSize = false */
    this.chooseBlock = true
    /* setTimeout(() => {
  $('html, body').animate({
       scrollTop: $("#blockChoisir").offset().top
     }, 800);
   }, 500) */


  }
    checkAdType(img, width, height, url, name) {

    ////console.log('click on img')
    ////console.log(img)
    if (this.element_checked == "") {
      $("#" + img).toggleClass('check')
      this.element_checked = "#" + img
      this.selectedWidth = width
      this.selectedHeight = height

      this.illustration = true
      this.illustrationUrl = url
      this.selectedAdType = name
      setTimeout(() => {
        $('html, body').animate({
          scrollTop: $("#illustration").offset().top
        }, 800);
      }, 500)
      this.chooseAdType()

    } else {
      this.illustration = false
      $(this.element_checked).toggleClass('check')
      $("#" + img).toggleClass('check')
      this.element_checked = "#" + img
      this.selectedWidth = width
      this.selectedHeight = height
      this.illustration = true
      this.illustrationUrl = url
      this.selectedAdType = name
      setTimeout(() => {
        $('html, body').animate({
          scrollTop: $("#illustration").offset().top
        }, 800);
      }, 500)
      this.chooseAdType()
    }
  }
    handleUploadBanner() {
    this.chooseBlock = false
    this.chooseAdSize = false
    this.illustration = false
    $("#block").show()
   /*  this.handleCreateUpload = true */
    /* this.loadScript('../../../../assets/js/app.js') */
    this.is_upload_way = true
    this.ad_type = "UPLOAD"
    this.currentIdInputName = this.idOfAdNameCreateUpload
 this.currentIdInputDisplay = this.idOfDisplayUrlCreateUpload
     /* if (this.handleCreateUpload === false) {
    setTimeout(() => {
      $('html, body').animate({
        scrollTop: $("#block").offset().top
      }, 800);
    }, 500)
    }else{
      this.handleCreateUpload = false
    } */





  }
  goBackFromUpload() {

      $("#block").hide()
      this.isUpload = false
      this.is_upload_way = false
      this.ad_type = ""
      this.currentIdInputName = ""
      this.currentIdInputDisplay = ""

      this.chooseBlock = true
      this.chooseAdSize = true
      this.illustration = true



  }
   promiseSave(ad_group_id, image_name, uid, url, image_content, FINAL_ARRAY_TO_SEND, size, ad_type): Promise<any>{
    return new Promise(resolve => {
      this.adsService.saveAdOnFirebase(ad_group_id, image_name, uid, url, image_content, FINAL_ARRAY_TO_SEND, size, ad_type).then(res => {
        if (res == "ok") {
          resolve("ok")

       }




        })
  })
}
    storageUpload(image_name, src,size): Promise<any>{
    return new Promise(resolve => {
      var self = this
      console.log("upload image in process")
        var storage = app().storage("gs://comparez.appspot.com/");
    var storageRef = storage.ref();
   //console.log(src)
    var imageRefStorage = this.uid + "/" + this.ad_name + new Date().getTime().toString()+ ".png"
    var imagesRef = storageRef.child(imageRefStorage);
    var metadata = {
  contentType: 'image/png',
};
      var value_replace = ""
      if (src.includes('data:image/png;base64,')) {
        value_replace = "data:image/png;base64,"
        image_name.replace(" (image/png)", "")
                   imagesRef.putString(src.replace(value_replace, ''), 'base64', metadata).then(function (snapshot) {
             ////console.log('ok')
       console.log(self.imagesUpload)

       storage.ref().child(imageRefStorage).getDownloadURL().then(url => {
          var xhr = new XMLHttpRequest();
   xhr.responseType = 'blob';
   xhr.onload = function(event) {
     var blob = xhr.response;
   };
   xhr.open('GET', url);
         xhr.send();

         const image_content = "";

         self.promiseSave(self.ad_group_id, image_name.replace(" (image/png)", ""), self.uid, url, image_content, self.FINAL_ARRAY_TO_SEND, size, self.ad_type,).then(reponse => {
           if (reponse == "ok") {
             console.log("save-success")
             resolve('ok')
           }

        })
      })

    });
      } else {
        value_replace = "data:image/jpeg;base64,"
        image_name.replace(" (image/jpeg)", "")
                   imagesRef.putString(src.replace(value_replace, ''), 'base64', metadata).then(function (snapshot) {
             ////console.log('ok')
       //console.log(self.imagesUpload)

       storage.ref().child(imageRefStorage).getDownloadURL().then(url => {
          var xhr = new XMLHttpRequest();
   xhr.responseType = 'blob';
   xhr.onload = function(event) {
     var blob = xhr.response;
   };
   xhr.open('GET', url);
         xhr.send();

         const image_content = "";

         self.promiseSave(self.ad_group_id, image_name.replace(" (image/jpeg)", ""), self.uid, url, image_content, self.FINAL_ARRAY_TO_SEND, size, self.ad_type).then(reponse => {
           if (reponse == "ok") {
             resolve('ok')
           }

        })
      })

    });
      }



  })
  }
      saveNewCreativeAd() {
    var self = this



    this.getCreateCreatives().then(res => {
      ////console.log(res)
      this.ad_name = new Date().setHours(0,0,0,0).toString()
      if (res != 'error') {
          this.FINAL_ARRAY_TO_SEND.push({
          "lib": "finalUrls",
          "content": this.currentFinalUrl
         })
        this.progresBarCreateImageCreatives = true


        var size = [{'width': this.selectedWidth, 'height': this.selectedHeight}]



        var storage = app().storage("gs://comparez.appspot.com/");
    var storageRef = storage.ref();

    var imageRefStorage = this.uid + "/" + this.ad_name + new Date().getTime().toString()+ ".png"
    var imagesRef = storageRef.child(imageRefStorage);
    var metadata = {
  contentType: 'image/png',
};
        imagesRef.putString(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
       ////console.log('ok')

       storage.ref().child(imageRefStorage).getDownloadURL().then(url => {
          var xhr = new XMLHttpRequest();
   xhr.responseType = 'blob';
   xhr.onload = function(event) {
     var blob = xhr.response;
   };
   xhr.open('GET', url);
         xhr.send();

         const image_content = JSON.stringify(self.canvas);
         ////console.log(self.FINAL_ARRAY_TO_SEND)
        self.adsService.saveAdOnFirebase(self.ad_group_id, self.ad_name, self.uid, url, image_content, self.FINAL_ARRAY_TO_SEND, size, self.ad_type).then(res => {
          ////console.log('success')
          ////console.log(res)
          if (res != "error") {
            self.progresBarCreateImageCreatives = false
            self.openSnackBarSuccessImage('Visuel créé avec succès !', "")
            setTimeout(() => {
              window.location.reload()
            }, 2000)


          } else {
            self.progresBarCreateImageCreatives = false
            self.openSnackBarErrorImage('Opération échouée !', "")


          }


        })
     })

     });

      }
    })
  }
    saveNewUploadAd(){
    var self = this
    var promesse = ""
 this.FINAL_ARRAY_TO_SEND = []
    this.getCreateUpload().then(res => {
      if (res !== "error") {
         this.FINAL_ARRAY_TO_SEND.push({
          "lib": "finalUrls",
          "content": this.currentFinalUrl
         })
         var size = [{'width': this.selectedWidth, 'height': this.selectedHeight}]
        this.progresBarCreateImageUpload = true
                for (var i = 0; i < this.imagesUpload.length; i++) {
        if (i == this.imagesUpload.length - 1) {
        
          this.storageUpload(this.imagesUpload[i]['name'], this.imagesUpload[i]['src'], size).then(response=>{
            if (response !== "error") {
              this.openSnackBarSuccessImage("Visuel(s) ajouté(s) avec succès !", "")
              this.progresBarCreateImageUpload = false
              setTimeout(()=>{
                window.location.reload()
              }, 1000)

            }
          })
        } else {
           this.storageUpload(this.imagesUpload[i]['name'], this.imagesUpload[i]['src'], size).then(response => {
            promesse = response
           })

           if(promesse=="ok"){continue}
        }
        }

      }
    })
  }
    handleImageModal() {
    ////console.log(this.canvas.toDataURL('png'))

    var name = new Date().setHours(0,0,0,0).toString()
    var url = this.currentFinalUrl
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
      var self = this

   
          this.imagesUpload.push({
            "name": name,
            "src": self.canvas.toDataURL('png')
          })

          this.openDialogCreate(self.canvas.toDataURL('png'), name)
/*           $('#button_modal_init').trigger('click') */

        /*   $('#ad_image').attr("src", self.canvas.toDataURL('png')) */
          //this.ad_name = $("#").val()

       
    }
  }
   handleImageUploadModal() {

    /*  var name = $("#" + this.currentIdInputName).val().replace(/\s/g, "") */
    var url = this.currentFinalUrl.replace(/\s/g, "")
  /*   //console.log(document.querySelector('.dz-preview')) */
  /*  var el = document.querySelector('#block > div.card.white.no-b.paper-card > ngx-dropzone > ngx-dropzone-image-preview > img') */

    var selector = "#block > mat-card > mat-card-content > mat-card > ngx-dropzone > ngx-dropzone-image-preview"
     if( document.querySelector(selector)===null){
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

   if (this.currentFinalUrl == "") {
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


      


            /* var child_count = document.querySelector('#block > mat-card > mat-card-content:nth-child(3) > mat-card > ngx-dropzone').childElementCount - 1 */
             var elements = document.querySelectorAll(selector)
            for (var i = 0; i < elements.length; i++){
              var image = elements[i].getElementsByTagName('img')[0]
              var name = elements[i].getElementsByTagName('ngx-dropzone-label')[0].textContent

              //console.log(image)
              //console.log(name)
            //console.log(child_count)
              if (image.naturalWidth != parseInt(this.selectedWidth) || image.naturalHeight != parseInt(this.selectedHeight)) {
              Swal.fire({
                     title: "Service Groupe d'annonce!",
                     text: 'Image '+name+' invalide',
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
                this.imagesUpload.push({
                  "name": name,
                  "src": image.src
                })
                 //console.log(this.imagesUpload)
            this.img_view_create_style['width']=this.selectedWidth+'px'
            this.img_view_create_style['height']=this.selectedHeight+'px'
             this.openDialogCreate(image.src, name)
              /*  $('#button_modal_init').trigger('click') */
                /*    $('#ad_image').attr("src", $(selector).find('img').attr("src"))
                this.ad_name = $("#"+this.currentIdInputName).val() */
              }
          



       } 
       }
     }
  }
  handleCreatives() {

    if (this.canvasModify === false) {
      /*  var percentWidth = (parseInt(this.selectedWidth) * 100) / 16
   var percentHeight = (parseInt(this.selectedHeight) * 100) / 16 */

      var self = this
      this.chooseAdSize = false
      this.illustration = false
      this.handleCreateCanvas = true
      this.isCreating = true
      this.chooseBlock = false
      this.ad_type = "CREATIVE"

      this.currentIdInputName = this.idOfAdNameCreateCreatives
      this.currentIdInputDisplay = this.idOfDisplayUrlCreateCreatives

      /*       setTimeout(function(){


            }, 2000); */
            this.form = this.fb.group({
          direction: ['right'],
          open: [false],
          spin: [true],
          mouse_hover: [false],
          animation: ['scale']
        });
      $("#body > section > app-root > app-annonces > mat-sidenav-container > mat-sidenav-content > div > div > mat-card.lime.lighten-5.p-0.mat-card > mat-horizontal-stepper > div.mat-horizontal-content-container").css("padding", "0px !important")
      setTimeout(function () {

        self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight))
        self.isCreating = false

      }, 2500);


      setTimeout(() => {
        $('html, body').animate({
          scrollTop: $("#blockCreateCreatives").offset().top
        }, 800);
      }, 1500)
      this.canvasCreate = true
    } else {
      this.confirmClear()
    }




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
                    var check = this.validURL(urls)


      if (check === true) {
        ////console.log(urls + " valide")
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
        ////console.log(urls + ' invalide, vérifier les urls renseignées')
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
        ////console.log(urls + " valide")
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
        ////console.log(urls + ' invalide, vérifier les urls renseignées')
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
           /*  case 65:
                if (event.ctrlKey) {
                    this.selectAllObjects();
                }
                event.preventDefault();
                break; */
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

  toolbarChange() {
    document.querySelector('#tool').classList.remove("btn-group-vertical")

     document.querySelector('#tool').classList.add("btn-group")
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

  /* confirmClear(): Promise<any>{
    return new Promise(resolve => {
      if (this.canva_state === true) {
        this.canvas.dispose()
        this.canva_state = false
        resolve("ok")
      } else {
        this.canva_state = false
        resolve("ok")
      }
    })
  } */


  checkStateCanvas() {
    if (this.canva_state === true) {
      this.confirmClear()
    } else {
      //donothing
    }
  }

  toggleCurrentEditor() {
    if (this.canvasCreate === false) {
      var self = this
    self.isEditor = false

    if (this.currentEditor == true) {
              this.canvas.dispose()
            this.canvasModify = false
        this.currentEditor = false
        this.iconEditor = "icon-chevron-down"
        this.text_modify = "modifier"
        this.currentIdInputName = ""
        this.currentIdInputDisplay = ""
      } else {
           this.form = this.fb.group({
          direction: ['right'],
          open: [false],
          spin: [true],
          mouse_hover: [false],
          animation: ['scale']
        });
      this.canvasModify=true
         this.currentEditor = true
        this.iconEditor = "icon-chevron-up"
        this.text_modify = "annuler la modification"
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

         setTimeout(() => {
   $('html, body').animate({
        scrollTop: $("#blockModifyCreatives").offset().top
      }, 800);
    }, 1500)

      }

    } else {
      this.confirmClear()
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
        // ////console.log(complete);
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

    setFill(fill): void {
        this.setActiveStyle('fill', fill, null);
    }

  handleChange(event){
    console.log(event)
    this.setFill(event)

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

    setFontSize(size): void {
        this.setActiveStyle('fontSize', parseInt(size, 10), null);
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

    setFontFamily(font): void {
        this.setActiveProp('fontFamily', font);
    }

    setFillColor(swatch: any): void {
        this.palettes.selected = swatch;
        this.props.fill = swatch.key;
        /* this.setFill(); */
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
    confirmClear():Promise<any> {
      return new Promise(resolve => {
        if (this.canva_state === true) {
          Swal.fire({
          title: 'Avertissement',
          text: "Une opération est en cours sur un canvas annuler cette opération pour continuer",
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#26a69a',
          cancelButtonColor: '#d33',
          confirmButtonText: "ok"
        }).then((result) => {
          if (result.value) {
            /*  this.canvas.clear();
          this.canvas.dispose()
            this.canva_state = false */
            resolve("ok")
          }
        })

       }else{
         resolve("ok")
       }

      })
    }

  destroyModifyCanvas() {
       Swal.fire({
          title: 'Avertissement',
          text: "Voulez vous annuler ce canvas ?",
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#26a69a',
          cancelButtonColor: '#d33',
          confirmButtonText: "ok"
        }).then((result) => {
          if (result.value) {
              this.canvas.dispose()
            this.canvasModify = false
        this.currentEditor = false
        this.iconEditor = "icon-chevron-down"
        this.text_modify = "modifier"
        this.currentIdInputName = ""
        this.currentIdInputDisplay = ""
          }
        })
    }

  destroyCanvas() {
      Swal.fire({
          title: 'Avertissement',
          text: "Voulez vous annuler ce canvas ?",
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#26a69a',
          cancelButtonColor: '#d33',
          confirmButtonText: "ok"
        }).then((result) => {
          if (result.value) {
            this.canvas.clear();
          this.canvas.dispose()
            if (this.canvasCreate === true) {
             this.canvasCreate=false
            } else if (this.canvasModify === true) {
              this.canvasModify=false
           }

          }
        })
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
    ////console.log(typeof(CANVAS))
    ////console.log(typeof(this.currentCanvasContent))
        // and load everything from the same json

        this.canvas.loadFromJSON(this.currentCanvasContent, () => {

            // making sure to render canvas at the end
            this.canvas.renderAll();

            // TODO: Retrieve additional data and bind accordingly
            ////console.log(this.canvas);
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
  addText() {
    const textString = $('#text_canvas').val();
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
  }

    getCreateCreatives(): Promise<any> {
    return new Promise(resolve => {
      var name = new Date().setHours(0,0,0,0).toString()
      var url = this.currentFinalUrl
      if (name == "") {
        this.openSnackBarErrorImage("Nom de l'annonce obligatoire", "")
        resolve("error")
      } else if (url == "") {
        this.openSnackBarErrorImage("Url de redirection de l'annonce ne peut être vide", "")
        resolve("error")

      } else {
        var self = this

            this.imagesUpload.push({
              "name": name,
              "src": self.canvas.toDataURL('png')
            })
            resolve("ok")

         
      }
    })
  }


  getCreateUpload(): Promise<any> {
    return new Promise(resolve => {
      /* var url = $("#" + this.currentIdInputDisplay).val().replace(/\s/g, "") */
      var url = this.currentFinalUrl
      /*   //console.log(document.querySelector('.dz-preview')) */
      /*  var el = document.querySelector('#block > div.card.white.no-b.paper-card > ngx-dropzone > ngx-dropzone-image-preview > img') */

      var selector = "#block > mat-card > mat-card-content > mat-card > ngx-dropzone > ngx-dropzone-image-preview"
      if (document.querySelector(selector) === null) {
        this.openSnackBarErrorImage("Aucune image chargée !", "")
        resolve("error")

      } else if (url == "") {
           this.openSnackBarErrorImage("Url de redirection de l'annonce ne peut être vide !", "")
          resolve("error")
        } else {





              var elements = document.querySelectorAll(selector)
              for (var i = 0; i < elements.length; i++) {
                var image = elements[i].getElementsByTagName('img')[0]
                var name = elements[i].getElementsByTagName('ngx-dropzone-label')[0].textContent
                if (image.naturalWidth != parseInt(this.selectedWidth) || image.naturalHeight != parseInt(this.selectedHeight)) {
                  this.openSnackBarErrorImage("Image " + name + " invalide !", "")
                  resolve("error")
                } else {
                  this.imagesUpload.push({
                    "name": name,
                    "src": image.src
                  })
                  //console.log(this.imagesUpload)
                  this.img_view_create_style['width'] = this.selectedWidth + 'px'
                  this.img_view_create_style['height'] = this.selectedHeight + 'px'
                  /*    $('#ad_image').attr("src", $(selector).find('img').attr("src"))
                  this.ad_name = $("#"+this.currentIdInputName).val() */
                }
              }
              resolve("ok")



            
        
        }


    })
  }
  openSnackBar(message: string, action: string) {
/*     this.snackBar.openFromComponent(ImageCreateComponent) */
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'top',
      horizontalPosition: 'right'

    });
  }
  openSnackBarErrorImage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
  openSnackBarSuccessImage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
  triggerText() {
    this.addText()
    $(".text-block").css("display", "block")
    $(".tools").css("display", "block")
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
  triggerImage() {
    $("#image").trigger("click")

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
       
        this.isCreating = true
        this.http.post(SERVER_URL+'/changeAdStatus', {
          'ad_group_id': adgroup_id,
          'ad_id': ad_id,
            'last_status': last_status
          })

          .subscribe(
            res => {
              ////console.log(res)

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
          if (res == "ok") {

            this.isCreating = false
          }
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
              ////console.log(res)

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
 addShape(shape): void {
        let add: any;
        switch (shape) {
            case 'rectangle':
                add = new fabric.Rect({
                    width: 200, height: 100, left: 10, top: 10, angle: 0,
                    fill: '#3f51b5',
                    title: 'Rechteck'
                });
                break;
            case 'square':
                add = new fabric.Rect({
                    width: 100, height: 100, left: 10, top: 10, angle: 0,
                    fill: '#4caf50',
                    title: 'Rechteck'
                });
                break;
            case 'triangle':
                add = new fabric.Triangle({
                    width: 100, height: 100, left: 10, top: 10, fill: '#2196f3', title: 'Dreieck'
                });
                break;
            case 'circle':
                add = new fabric.Circle({
                    radius: 50, left: 10, top: 10, fill: '#ff5722', title: 'Kreis'
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
                    title: 'Stern'
                });
                break;
        }

        this.extend(add, this.randomId());
        this.canvas.add(add);
        this.selectItemAfterAdded(add);
        this.updateLayers();
    }


  removeAdBeforeUpdate(id: string, adgroup_id: string, ad_id: string): Promise<any> {
    return new Promise(resolve => {
      this.http.post(SERVER_URL+'/removeAd', {
        'ad_group_id': adgroup_id,
        'ad_id': ad_id

      })

        .subscribe(
          res => {
            ////console.log(res)
            if (res[0]['status'] == "ok") {

              resolve('ok')
            }
          }
            )



    })
  }
  closeModifyCreatives(){
    this.isAdBlock = false

  }

  goAdSettings(id_ad_firebase: string, ad_name: string, ad_group_id: string, ad_id: string, status: string, image_url: string, finalUrls: any, finalAppUrls: any, finalMobileUrls:any,  image_content: any, referenceId: any, size: any, ad_type: any) {
    
    this.isAdBlock = true
    
    this.currentAdName = ad_name
    this.currentImageUrl = image_url
    this.currentCanvasContent = image_content
    this.ad_group_id = parseInt(ad_group_id)
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
    this.currentFinalUrls = finalUrls.toString()
    setTimeout(() => {
      $('html, body').animate({
        scrollTop: $("#isAdBlock").offset().top
      }, 1000);

    },500)
    ////console.log(finalUrls.length)
  /*   if (finalUrls.length == 0) {
      this.currentFinalUrls = ""
    } else if(finalUrls.length == 1) {

    } else{
       for (let i = 0; i < finalUrls.length - 1; i++) {

        ////console.log(finalUrls)
        ////console.log(finalUrls[i])
        this.currentFinalUrls += finalUrls[i].toString() + ","

      }
    } */


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
   handleModifiedImage() {

    if (this.currentAdType === 'CREATIVE') {
      this.new_image_content = ""
  /*     if ($("#" + this.currentIdInputName).val() === "") {
        Swal.fire({
          title: "Service Visuel!",
          text: "Nom de l'annonce ne peut être vide ",
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'réessayer'
        }).then((result) => {
          if (result.value) {

          } else {

          }
        })
      } else { */
        this.new_image_content = JSON.stringify(this.canvas)
        ////console.log(this.canvas.toDataURL('png'))
      /*   this.getWebsites(this.currentIdInputDisplay).then(res => {
          if (res != 'error') { */
            this.img_view_create_style['width'] = this.currentAdSize[0]['width'] + 'px'
            this.img_view_create_style['height'] = this.currentAdSize[0]['height'] + 'px'
          /* $('#button_modal_modified').trigger('click') */
            this.openDialogModified(this.canvas.toDataURL('png'), new Date().setHours(0,0,0,0).toString())
            $('#ad_image_modified').attr("src", this.canvas.toDataURL('png'))
            $("#modified_name").text($("#" + this.currentIdInputName).val().replace(/\s/g, ""))
            this.url_modify = $("#" + this.currentIdInputDisplay).val()



        /*   }
        }) */
   /*  } */



  }else {
       
        //alert(this.button_modify_image_upload)
          /*   if (this.button_modify_image_upload === true) {
              this.img_view_create_style['width']=this.currentAdSize[0]['width']+'px'
              this.img_view_create_style['height']=this.currentAdSize[0]['height']+'px'
              $('#button_modal_modified').trigger('click') 
               this.openDialogModified(this.currentImageUrl, this.currentAdName)
              $('#ad_image_modified').attr("src", this.currentImageUrl)
              $("#modified_name").text(this.currentAdName)
              this.url_modify = $("#"+this.currentIdInputDisplay).val()
            } else  */if(document.querySelector("#button_modify_image_upload > mat-card-content > ngx-dropzone > ngx-dropzone-image-preview > img") !== null) {

              var image = document.querySelector("#button_modify_image_upload > mat-card-content > ngx-dropzone > ngx-dropzone-image-preview").getElementsByTagName('img')
        ////console.log(image)
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
       this.img_view_create_style['width']=this.currentAdSize[0]['width']+'px'
              this.img_view_create_style['height']=this.currentAdSize[0]['height']+'px'
        /*      $('#button_modal_modified').trigger('click') */
           this.openDialogModified(image[0].src, this.currentAdName)
          $('#ad_image_modified').attr("src", image[0].src)
          $("#modified_name").text(document.querySelector("#button_modify_image_upload > mat-card-content > ngx-dropzone > ngx-dropzone-image-preview").getElementsByTagName('ngx-dropzone-label')[0].textContent)
          this.url_modify = $("#"+this.currentIdInputDisplay).val()
        }
            } else if (document.querySelector("#button_modify_image_upload > mat-card-content > ngx-dropzone > ngx-dropzone-image-preview > img") === null) {
              this.img_view_create_style['width']=this.currentAdSize[0]['width']+'px'
              this.img_view_create_style['height']=this.currentAdSize[0]['height']+'px'
              /* $('#button_modal_modified').trigger('click') */
              this.openDialogModified(this.currentImageUrl, this.currentAdName)
             /*  $('#ad_image_modified').attr("src", this.currentImageUrl)
              $("#modified_name").text(this.currentAdName)
              this.url_modify = $("#"+this.currentIdInputDisplay).val() */
            }



    
}


  }
    updateAdOnFirebase() {

    if (this.currentAdStatus == "") {


      var displayUrl = []
     var finalUrls = []
     var finalMobileUrls = []
     var finalAppUrls = []
      var name =""
      var image = ""
     var storage = app().storage("gs://comparez.appspot.com/");
      var storageRef = storage.ref();

      var imageRefStorage = this.uid + "/" + this.ad_name + new Date().getTime().toString() + ".png"
      ////console.log(imageRefStorage)
     var imagesRef = storageRef.child(imageRefStorage);
     var metadata = {
   contentType: 'image/png',
  };
      var self = this

      if (this.currentAdType === 'UPLOAD') {

        this.progresBarModifiedImageUpload = true
        this.getModifiedImage().then(modified => {
          if (modified !== 'error') {
            var name =this.MODIFIED_IMAGE_UPLOAD_NAME
            var image = this.MODIFIED_UPLOAD_IMAGE
         
            displayUrl.push(this.currentFinalUrls)

            if (image.startsWith("https") == false) {
              if (image.includes('data:image/png;base64,')) {
              name.replace('data:image/png;base64,', "")
              var replace = image.replace('data:image/png;base64,', "")
                                           imagesRef.putString(replace, 'base64', metadata).then(function (snapshot) {
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
      createdAt: firestore.FieldValue.serverTimestamp(),
    }).then(res => {
          ////console.log('success')
          ////console.log(res)
          if(res=="ok"){
            self.progresBarModifiedImageUpload = false
            self.openSnackBarSuccessImage("Visuel modifié avec succès !", "")
            setTimeout(()=>{
              window.location.reload()
            }, 2000)

      }

    }).catch(err => {
          self.progresBarModifiedImageUpload = false
          self.openSnackBarErrorImage("Opération échouée !", "")

        })
     })

     });
            } else {
              name.replace('data:image/jpeg;base64,', "")
              var replace = image.replace('data:image/jpeg;base64,', "")
                                           imagesRef.putString(replace, 'base64', metadata).then(function (snapshot) {
       ////console.log('ok')

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
      createdAt: firestore.FieldValue.serverTimestamp(),
    }).then(res => {
          ////console.log('success')
          ////console.log(res)
          if(res=="ok"){
            self.progresBarModifiedImageUpload = false
        self.openSnackBarSuccessImage("Visuel modifié avec succès !", "")
        setTimeout(()=>{
          window.location.reload()
        }, 2000)
      }

    }).catch(err => {
          self.progresBarModifiedImageUpload = false
        self.openSnackBarErrorImage("Opération échouée !", "")

        })
     })

     });
            }

            } else {

                self.adsService.updateAd(self.id_ad_firebase, {

      ad_name: name,
      url_image: image,
      displayUrl: displayUrl[0],
      finalUrls: displayUrl[0],
      finalMobileUrls: finalMobileUrls,
      finalAppUrls: finalAppUrls,
      createdAt: firestore.FieldValue.serverTimestamp(),
    }).then(res => {
          ////console.log('success')
      ////console.log(res)

      if (res == "ok") {
        self.progresBarModifiedImageUpload = false
       self.openSnackBarSuccessImage("Visuel modifié avec succès !", "")
       setTimeout(()=>{
        window.location.reload()
       }, 2000)
      }

    }).catch(err => {
        self.progresBarModifiedImageUpload = false
            self.openSnackBarErrorImage("Opération échouée !", "")

        })
        }

          }
        })
        ////console.log('upload')
        ////console.log(image)


      } else {
            if (!fabric.Canvas.supports('toDataURL')) {
      //alert('This browser doesn\'t provide means to serialize canvas to an image');
    } else {

              this.getModifiedImage().then(modified => {
                if (modified !== "error") {
                  this.progresBarModifiedImageCreative = true
                  var image = this.MODIFIED_CREATIVE_IMAGE
                  var name = this.MODIFIED_IMAGE_CREATIVE_NAME
            displayUrl.push(this.currentFinalUrls)
                    //$('#ad_image').attr("src", this.canvas.toDataURL('png'))
      //////console.log(this.canvas.toDataURL('png'))
      this.canvas.toDataURL('png').replace('data:image/png;base64,', '')
      //////console.log(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''))
      imagesRef.putString(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
       ////console.log('ok')

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
      createdAt: firestore.FieldValue.serverTimestamp(),
    }).then(res => {
          ////console.log('success')
          ////console.log(res)
        self.isRoller = false
      if (res == "ok") {
        self.progresBarModifiedImageCreative = false
        self.openSnackBarSuccessImage("Visuel modifié avec succès !", "")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }

    }).catch(err => {

        self.progresBarModifiedImageCreative = false
        self.openSnackBarSuccessImage("Opération échouée !", "")

        })
     })

     });
            }
          })





    }
      }

    } else {



      var name = $('#ad_name_modify').val()
      var data_to_send = []
      this.getModifiedWebsites().then(res => {
        ////console.log(res)
        if (res != "error") {
          ////console.log(this.compareObjectsUrls(this.tabUpdatedCurrentFinalUrls, this.finalUrls))

          ////console.log(this.tabUpdatedCurrentFinalUrls)
          ////console.log(this.finalUrls)
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

                this.removeAdBeforeUpdate(this.id_ad_firebase, this.ad_group_id.toString(), this.ad_id).then(res=>{
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

                this.removeAdBeforeUpdate(this.id_ad_firebase, this.ad_group_id.toString(), this.ad_id).then(res=>{
                  if (res != "error") {

                    this.adsService.addAd(this.id_ad_firebase, this.ad_group_id.toString(), name, this.currentImageUrl, this.finalUrls, [], [], this.currentAdSize).then(res => {
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

                this.removeAdBeforeUpdate(this.id_ad_firebase, this.ad_group_id.toString(), this.ad_id).then(res=>{
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

   publishOnAdwords(id, ad_group_id, ad_name, image_url, finalUrls, finalAppUrls, finalMobileUrls, size) {
     this.spinnerPublish = true
      this.adsService.addAd(id, ad_group_id, ad_name, image_url, finalUrls, finalAppUrls, finalMobileUrls, size).then(res => {
        ////console.log('success')
     ////console.log(res)
     if (res != "error") {
       this.spinnerPublish = false
       this.successPublish = true
       setTimeout(()=>{
         this.successPublish = false
       }, 2500)

     } else {
       this.spinnerPublish = false

     }
      })
    }
    getModifiedImage(): Promise<any>{
    return new Promise(resolve => {
       if (this.currentAdType === 'CREATIVE') {
      this.new_image_content = ""
      /*    if ($("#" + this.currentIdInputName).val() === "") {
         this.openSnackBarErrorImage("Nom de l'annonce obligatoire", "")
          resolve('error')
      } else { */
        this.new_image_content = JSON.stringify(this.canvas)
        ////console.log(this.canvas.toDataURL('png'))
       /*  this.getWebsites(this.currentIdInputDisplay).then(res => {
          if (res != 'error') { */
            this.img_view_create_style['width'] = this.currentAdSize[0]['width'] + 'px'
            this.img_view_create_style['height'] = this.currentAdSize[0]['height'] + 'px'

            this.MODIFIED_CREATIVE_IMAGE = this.canvas.toDataURL('png')
            this.MODIFIED_IMAGE_CREATIVE_NAME = new Date().setHours(0,0,0,0).toString()
            this.url_modify = this.currentFinalUrls
              resolve("ok")


        /*   }
        }) */
    /* } */



  }else {
      
           /*  if (this.button_modify_image_upload === true) {
              this.img_view_create_style['width']=this.currentAdSize[0]['width']+'px'
              this.img_view_create_style['height'] = this.currentAdSize[0]['height'] + 'px'
              this.MODIFIED_UPLOAD_IMAGE = this.currentImageUrl
              this.MODIFIED_IMAGE_UPLOAD_NAME = this.currentAdName
          
              this.url_modify = $("#" + this.currentIdInputDisplay).val()
              resolve("ok")
            } else */
         if (document.querySelector("#button_modify_image_upload > mat-card-content > ngx-dropzone > ngx-dropzone-image-preview") !== null) {

              var image = document.querySelector("#button_modify_image_upload > mat-card-content > ngx-dropzone > ngx-dropzone-image-preview").getElementsByTagName('img')
        ////console.log(image)
        if (image[0].naturalWidth != parseInt(this.currentAdSize[0]['width']) || image[0].naturalHeight != parseInt(this.currentAdSize[0]['height'])) {
          this.openSnackBarErrorImage("Taille ou format de l'image in valide", "")
          resolve("error")
        } else {
       this.img_view_create_style['width']=this.currentAdSize[0]['width']+'px'
              this.img_view_create_style['height']=this.currentAdSize[0]['height']+'px'
          this.MODIFIED_UPLOAD_IMAGE = image[0].src
          this.MODIFIED_IMAGE_UPLOAD_NAME = document.querySelector("#button_modify_image_upload > mat-card-content > ngx-dropzone > ngx-dropzone-image-preview").getElementsByTagName('ngx-dropzone-label')[0].textContent
        /*   $('#ad_image_modified').attr("src", image[0].src) */
         /*  $("#modified_name").text(document.querySelector("#button_modify_image_upload > mat-card-content > ngx-dropzone > ngx-dropzone-image-preview").getElementsByTagName('ngx-dropzone-label')[0].textContent) */
          this.url_modify = this.currentFinalUrls
          resolve("ok")
        }
            } else if (this.button_modify_image_upload === false && document.querySelector("#button_modify_image_upload > mat-card-content > ngx-dropzone > ngx-dropzone-image-preview > img") === null) {
              this.img_view_create_style['width']=this.currentAdSize[0]['width']+'px'
              this.img_view_create_style['height']=this.currentAdSize[0]['height']+'px'
            /*  $('#button_modal_modified').trigger('click') */
              this.MODIFIED_UPLOAD_IMAGE = this.currentImageUrl
              this.MODIFIED_IMAGE_UPLOAD_NAME = this.currentAdName
          /*     $('#ad_image_modified').attr("src", this.currentImageUrl) */
             /*  $("#modified_name").text(this.currentAdName) */
              this.url_modify = this.currentFinalUrls
              resolve("ok")
            }



     
}
    })
  }
  openStartDateCalendar(): void {
    var minDate: any;
    var maxDate: any;
         var today_date = new Date().getDate()
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
      
    var dateStart = this.startDateFrench.split("/")
    var dateEnd = this.endDateFrench.split("/")
    var formattedDateStart = dateStart[2] + "-" + dateStart[1] + "-" + dateStart[0]
    var formattedDateEnd = dateEnd[2] + "-" +dateEnd[1] + "-" + dateEnd[0]
        var now = new Date(this.today).setHours(0,0,0,0)
    var start = new Date(formattedDateStart).setHours(0, 0, 0, 0)
    var end = new Date(formattedDateEnd).setHours(0, 0, 0, 0)
    if (now > start) {
      minDate = new Date()
    }else{
      minDate = new Date(formattedDateStart)
    }
    console.log(formattedDateStart)
    let dialogRef = this.dialog.open(StartDateCalendar, {
      
      data: { start:  minDate, end: new Date(new Date().setDate(new Date(formattedDateEnd).getDate() -1 )), id: this.id, campaign_id: this.id_campagne }
    });
   
    
  }


  openEndDateCalendar(): void {
    var minDate: any;
    var maxDate: any;
    var startAt: any;
         var today_date = new Date().getDate()
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
      
    var dateStart = this.endDateFrench.split("/")
    var dateEnd = this.endDateFrench.split("/")
    var formattedDateStart = dateStart[2] + "-" + dateStart[1] + "-" + dateStart[0]
    var formattedDateEnd = dateEnd[2] + "-" +dateEnd[1] + "-" + dateEnd[0]
        var now = new Date(this.today).setHours(0,0,0,0)
    var start = new Date(formattedDateStart).setHours(0, 0, 0, 0)
    var end = new Date(formattedDateEnd).setHours(0, 0, 0, 0)
    if (now < end) {
      minDate = new Date(new Date().setDate(new Date(formattedDateStart).getDate() + 1))
      startAt =  new Date(new Date().setDate(new Date(formattedDateStart).getDate()))
    }else{
      minDate = ""
    }
    console.log(formattedDateStart)
    let dialogRef = this.dialog.open(EndDateCalendar, {
      
      data: { start: minDate,startAt: startAt, end: "", id: this.id, campaign_id: this.id_campagne }
    });
   
    
  }
  removePlacement(criterion_id) {
     
    var promesse = ""
    let dialogRef = this.dialog.open(DeletePlacementConfirm, {
      width: '250px',
      data: {
        title: "Attention",
        content: "Vous êtes sûr ?",
        submit_text: "Supprimer",
        cancel_text: "Annuler",
        submitColor: "warn",
        cancelColor: "primary"
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      var self = this
      this.SELECTED_PLACEMENT.push({
       "criterion_id": criterion_id
     })
      if (result === true) {
        this.spinnerDeletePlacement = true
        for (var i = 0; i <= this.SELECTED_PLACEMENT.length - 1; i++) {
          (function (ind) {
            setTimeout(function () {

              if (ind === self.SELECTED_PLACEMENT.length - 1) {
                self.promiseRemoveSingleForMultiple(self.SELECTED_PLACEMENT[ind]['criterion_id'])
                  .then(res => {
                    if (res != "error") {
                      self.spinnerDeletePlacement = false
                      self.SELECTED_PLACEMENT = []
                      self.openSnackBar("Emplacement(s) supprimé(s) avec succès", "ok")
                    }
                  })
                console.log('It was the last one');
              } else {

                console.log(ind);
                self.promiseRemoveSingleForMultiple(self.SELECTED_PLACEMENT[ind]['criterion_id'])
              }
            }, 1000 + (3000 * ind));
          })(i);
        }
      


      }

    });

  }
  promiseRemoveSingleForMultiple(criterion_id): Promise<any> {
    return new Promise(resolve => {
      this.adGroupService.removePlacement(this.idA, this.id_campagne, this.ad_group_id, criterion_id).then(res => {
        if (res != "error") {
          resolve("ok")
        }
      })
    })
  }

 
}

@Component({
  selector: 'start-date-calendar',
  templateUrl: './start-date-calendar.component.html',
})
export class StartDateCalendar {
  maxDateEnd: any;
  minDateEnd: any;
      startDateEnglishSelected = ""
      startDateFrenchSelected = ""
  englishStartDateFormated = ""
  progressBarUpdateStarDate = false
  constructor(
    public dialogRef: MatDialogRef<StartDateCalendar>,
    @Inject(MAT_DIALOG_DATA) public data: any, private notesservice: NotesService, public snackBar: MatSnackBar) { }
     openSnackBarDateStart(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
   dateStartChange(event) {

      
      var d = new Date(event);
      let startDateFrench = [('0' + (d.getDate())).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('/');
      let startDateEnglish = [d.getFullYear(),('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2),].join('');
       this.maxDateEnd = new Date(new Date().setDate(d.getDate() + 7))
      this.minDateEnd = new Date(new Date().setDate(d.getDate() + 1))
      this.startDateEnglishSelected = startDateEnglish
      this.startDateFrenchSelected = startDateFrench
     this.englishStartDateFormated = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2)].join('-')
     console.log(this.startDateEnglishSelected)
     console.log(this.startDateFrenchSelected)
     console.log(this.englishStartDateFormated)
    
    
  }
  updateStartDate() {
    this.progressBarUpdateStarDate = true
    this.notesservice.updateStartDate(this.data.id, this.data.campaign_id, this.startDateEnglishSelected, this.startDateFrenchSelected).then(res=>{
      if(res==="ok"){
        this.progressBarUpdateStarDate = false
        this.dialogRef.close()
        this.openSnackBarDateStart("Date de début de la campagne modifiée avec succès", "ok")
      }else{
        this.progressBarUpdateStarDate = false
        this.dialogRef.close()
         this.openSnackBarDateStart("Une erreur s'est produite", "fermer")
      }
    })
  }

}

@Component({
  selector: 'end-date-calendar',
  templateUrl: './end-date-calendar.component.html',
})

export class EndDateCalendar {
  maxDateEnd: any;
  minDateEnd: any;
      endDateEnglishSelected = ""
      endDateFrenchSelected = ""
  englishEndDateFormated = ""
  progressBarUpdateEndDate = false
  constructor(
    public dialogRef: MatDialogRef<EndDateCalendar>,
    @Inject(MAT_DIALOG_DATA) public data: any, private notesservice: NotesService, public snackBar: MatSnackBar) { }
     openSnackBarDateEnd(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
   dateEndChange(event) {

      
      var d = new Date(event);
      let endDateFrench = [('0' + (d.getDate())).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('/');
      let endDateEnglish = [d.getFullYear(),('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2),].join('');
       this.maxDateEnd = new Date(new Date().setDate(d.getDate() + 7))
      this.minDateEnd = new Date(new Date().setDate(d.getDate() + 1))
      this.endDateEnglishSelected = endDateEnglish
      this.endDateFrenchSelected = endDateFrench
     this.englishEndDateFormated = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2)].join('-')
     console.log(this.endDateEnglishSelected)
     console.log(this.endDateFrenchSelected)
     console.log(this.englishEndDateFormated)
    
    
  }
  updateEndDate() {
    this.progressBarUpdateEndDate = true
    this.notesservice.updateEndDate(this.data.id, this.data.campaign_id, this.endDateEnglishSelected, this.endDateFrenchSelected).then(res=>{
      if(res==="ok"){
        this.progressBarUpdateEndDate = false
        this.dialogRef.close()
        this.openSnackBarDateEnd("Date de fin de la campagne modifiée avec succès", "ok")
      }else{
        this.progressBarUpdateEndDate = false
        this.dialogRef.close()
         this.openSnackBarDateEnd("Une erreur s'est produite", "fermer")
      }
    })
  }

}

@Component({
  selector: 'delete-placement-confirm',
  template: '<p class="font-weight-bold" mat-dialog-title>{{data.title}}</p><mat-dialog-content>{{data.content}}</mat-dialog-content><mat-dialog-actions><button mat-button [mat-dialog-close]="false" [color]="data.cancelColor">{{data.cancel_text}}</button><button mat-button [mat-dialog-close]="true" [color]="data.submitColor">{{data.submit_text}}</button></mat-dialog-actions>',
})
export class DeletePlacementConfirm {

  constructor(
    public dialogRef: MatDialogRef<DeletePlacementConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
 

}

