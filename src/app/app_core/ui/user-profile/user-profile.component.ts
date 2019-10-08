import { Component, OnInit, ViewChild, Renderer2,  ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { MatSidenav, MatDrawer } from '@angular/material/sidenav';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ActivatedRoute, Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

import { MccScrollspyService } from 'material-community-components';

import { ModulesList } from '../menu';
import { NotesService } from '../notes.service';
import { AuthService } from '../../core/auth.service';
import { Note } from "../note.models"
import { MatPaginator, MatTableDataSource, MAT_DATE_LOCALE, DateAdapter, MatDatepickerInputEvent, MatSnackBar, MatTable, MatSelect, MatDialog } from "@angular/material"

import * as $ from 'jquery'
import * as datetimepicker from 'bootstrap-material-datetimepicker'
import { CLOCK_TYPE, ITime } from '../w-clock/w-clock.component'
import {AdGroupService} from '../ad-groupe.service'
import { SERVER } from '../../../../environments/environment'
import Swal from 'sweetalert2'


const MAX_BUDGET_VALUE = 10000001
const MIN_BUDGET_VALUE = 9999
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
@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  

})
  
export class UserProfileComponent implements OnInit, OnDestroy{
  @ViewChild('matDrawer') matDrawer: MatDrawer;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('tableSCHEDULE') tableSCHEDULE: MatTable<SCHEDULE_INTERFACE>;
  @ViewChild('selectDays') selectDays: MatSelect
  columnsSchedule = ['day', 'start', 'end', 'delete'];

  isRoller = false
  photoURL = ""
  numberOfNotifications = 0
  notificationAccountValue = ""
  accountValue = 0
  username = ""
  email = ""
  uid = ""
  showMenuLabel = false
  opened = true
   modulesList: Array<any>;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;
  listCampaign = true;
  profile = false
  createCampaign=false
  campaigns: any;
  new_name = ""
  campaign: FormGroup;
  location: FormGroup;
  emplacement: FormGroup;
  daySchedule: FormGroup;
  ciblageControl: FormGroup;
  dateFormStart: FormGroup;
  dateFormEnd: FormGroup;
  national_websites = []
  international_websites = []
  ads_websites = []
  sexes = []
  ages = []
  devices = []
  zones = []
  daysSchedule = []
  previousButton: any;
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
  SCHEDULE_DATA : SCHEDULE_INTERFACE[]=[]
  startDateFrenchSelected = ""
  endDateFrenchSelected = ""
  startDateEnglishSelected = ""
  endDateEnglishSelected = ""
  startDateFrenchModel = ""
  endDateFrenchModel = ""
  englishStartDateFormated = ""
  englishEndDateFormated = ""
  datePickerEndDisabled = true
  datePickerStartDisabled = true
  zoneSelectDisabled = true
  targetingSelectDisabled = true
  adScheduleSelectDayDisabled = true
  adScheduleSelectStartHourDisabled = true
  adScheduleSelectEndHourDisabled = true
  placementSelectDisabled = true
  adScheduleChoiceDisabled = true
  progressBarAddingCampaign = false
  addCampaignProgessBarValue = ""
  scheduleValid = false
   eventsStart: string[] = [];

   is_new_name_valid = false

  message_valid_name = ""
  message_invalid_name = ""
  progressBarAddCampaign = false
  number_when_ad = 0
  dropdownListZones = [{
      item_id: 9070424,
      item_text: 'Dakar'
    },
    {
      item_id: 9070424,
      item_text: 'Sénégal'
    }
  ];
  myDate = new Date();
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
    NATIONALS_WEBSITES = [
    [1, "infos", "dakarbuzz.net", "http://dakarbuzz.net"],
    [2, "infos", "galsen221.com", "http://galsen221.com"],
    [3, "infos", "leral.net", "http://leral.net"],
    [4, "infos", "limametti.com", "http://limametti.com"],
    [5, "infos", "sanslimitesn.com", "http://sanslimitesn.com"],
    [6, "infos", "senego.com", "http://senego.com"],
    [7, "infos", "seneweb.com", "http://seneweb.com"],
    [8, "infos", "www.buzzsenegal.com", "http://www.buzzsenegal.com"],
    [9, "infos", "www.dakar7.com", "http://www.dakar7.com"],
    [10, "infos", "www.dakarflash.com", "http://www.dakarflash.com"],
    [11, "infos", "www.lequotidien.sn", "http://www.lequotidien.sn"],
    [12, "infos", "www.pressafrik.com", "http://www.pressafrik.com"],
    [13, "infos", "www.senenews.com", "http://www.senenews.com"],
    [14, "infos", "xalimasn.com", "http://xalimasn.com"],
    [15, "infos", "metrodakar.net", "http://metrodakar.net"],
    [16, "infos", "sunubuzzsn.com", "http://sunubuzzsn.com"],
    [17, "infos", "senegal7.com", "http://senegal7.com"],
    [18, "infos", "senescoop.net", "http://senescoop.net"],
    [19, "infos", "sunugal24.net", "http://sunugal24.net"],
    [20, "infos", "dakar92.com", "http://dakar92.com"],
    [21, "infos", "rumeurs221.com", "http://rumeurs221.com"],
    [22, "infos", "bonjourdakar.com", "http://bonjourdakar.com"],
    [23, "infos", "vipeoples.net", "http://vipeoples.net"],
    [24, "infos", "seneplus.com", "http://seneplus.com"],
    [25, "infos", "wiwsport.com", "http://wiwsport.com"],
    [26, "infos", "viberadio.sn", "http://viberadio.sn"],
    [27, "infos", "yerimpost.com", "http://yerimpost.com"],
    [28, "infos", "ndarinfo.com", "http://ndarinfo.com"],
    [29, "infos", "dakarposte.com", "http://dakarposte.com"],
    [30, "infos", "exclusif.net", "http://exclusif.net"],
    [31, "infos", "senegaldirect.net", "http://senegaldirect.net"]
  ]

  INTERNATIONALS_WEBSITES = [
    [1, "sport ", "footmercato.net", "http://www.footmercato.net"],
    [2, "infos", "lexpress.fr", "http://www.lexpress.fr"],
    [3, "sport ", "mercatolive.fr", "http://www.mercatolive.fr"],
    [4, "sport ", "maxifoot.fr", "http://maxifoot.fr"],
    [5, "sport ", "livefoot.fr", "http://livefoot.fr"],
    [6, "forum", "01net.com", "http://01net.com"],
    [7, "sport ", "le10sport.com", "http://le10sport.com"],
    [8, "sport ", "maxifoot-live.com", "http://maxifoot-live.com"],
    [9, "forum", "01net.com", "http://01net.com"],
    [10, "infos", "bfmtv.com", "http://bfmtv.com"],
    [11, "sport ", "besoccer.com", "http://besoccer.com"],
    [12, "sport ", "foot01.com", "http://foot01.com"],
    [13, "sport ", "basketsession.com", "http://basketsession.com"],
    [14, "sport ", "basket-infos.com", "http://basket-infos.com"],
    [15, "infos", "skyrock.com", "http://skyrock.com"],
    [16, "infos", "leparisien.fr", "http://leparisien.fr"],
  ]

  SITES_ANNONCES = [
    [1, "annonces", "deals.jumia.sn", "http://deals.jumia.sn"],
    [2, "annonces", "expat-dakar.com", "http://expat-dakar.com"],
    [3, "annonces", "coinafrique.com", "http://coinafrique.com"]
  ]

  dropdownListAges = [{
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
  dropdownListGenres = [{
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
  dropdownListDevices = [{
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

  TIME_VALUE = [
    {
      "h": "00h 00"
    }
  ]

   checked = false;
  indeterminate = false;
  schedulecheck = '';
  showSchedule = false
  
  private exportTime = {hour: 7, minute: 15, meriden: 'PM', format: 12};

  private exportTime24 = {hour: 7, minute: 15, meriden: 'PM', format: 24};

  DAYS_CAMPAIGN = []
  now_date = new Date()
   maxDateStart = new Date(new Date().setDate(new Date().getDate() + 7))
  
  minDateStart = new Date(new Date().setDate(new Date().getDate()))
  maxDateEnd: any
  minDateEnd: any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['select', 'name', 'status', 'date de début', 'Budget', "Paramétrer"];
  dataSource = new MatTableDataSource<Note>([])
  selection = new SelectionModel<Note>(true, []);
 

  private _subscription: Subscription;
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  erase() {
    var input = $("#rechercher").val()
    if ( input == "Rechercher une campagne") {
      $("#rechercher").val("")
    }
  }
   goAdGroups(ad_group_name: string, idC: string, campaign_id,  idA: string, ad_group_id: string) {
    
    this.router.navigate(['ads', ad_group_name, idC, idA, ad_group_id, campaign_id]).then(() => {
     
     })
   
  }
  scheduleChange(event) {
    console.log(this.schedulecheck)

    if (this.schedulecheck === 'custom') {
      this.scheduleValid = false
      var self = this
      this.showSchedule = true
     
      setTimeout(() => {
         self.daySchedule = self.fb.group({
           day:  ['', Validators.required],
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        });
      },500)
    } else {
     this.scheduleValid = true
      this.showSchedule = false

    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  console.log(this.selection.selected)
  console.log(this.dataSource.data)
   const numRows = this.dataSource.data.length 
  console.log(numSelected)
     return numSelected === numRows; 
  }
  openMenuLabel() {
    if (this.showMenuLabel === false) {
      this.showMenuLabel = true
    } else {
      this.showMenuLabel = false
    }
  }

   public onRevert() {
    this.exportTime = {hour: 7, minute: 15, meriden: 'PM', format: 12};
    this.exportTime24 = {hour: 7, minute: 15, meriden: 'PM', format: 24};
    this.snackBar.open(`Revert time to ${this.exportTime.hour}:${this.exportTime.minute} ${this.exportTime.meriden}`, null, {
      duration: 500,
    });
  }

  public onSubmit(time) {
    this.snackBar.open(`Saved time ${this.exportTime.hour}:${this.exportTime.minute} ${this.exportTime.meriden}`, null, {
      duration: 500,
    })
  }
  dateStartChange(event: MatDatepickerInputEvent<Date>) {
    if (this.dateFormStart.valid) {
      
      var d = new Date(event.value);
      let startDateFrench = [('0' + (d.getDate())).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('-');
      let startDateEnglish = [d.getFullYear(),('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2),].join('');
       this.maxDateEnd = new Date(new Date().setDate(d.getDate() + 7))
      this.minDateEnd = new Date(new Date().setDate(d.getDate() + 1))
      this.startDateEnglishSelected = startDateEnglish
      this.startDateFrenchSelected = startDateFrench
      this.englishStartDateFormated = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2)].join('-')
      this.datePickerEndDisabled = false
    } else {
      this.datePickerEndDisabled = true
    }
  }

   dateEndChange(event: MatDatepickerInputEvent<Date>) {
    if (this.dateFormEnd.valid) {
      
      var d = new Date(event.value);
      let endDateFrench = [('0' + (d.getDate())).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('-');
      let endDateEnglish = [d.getFullYear(),('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2)].join('');
      this.endDateEnglishSelected = endDateEnglish
      this.endDateFrenchSelected = endDateFrench
      this.englishEndDateFormated = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2)].join('-')
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
      var dates = getDates(new Date(this.englishStartDateFormated), new Date(this.englishEndDateFormated));
     
    for (var i = 0; i < dates.length; i++) {
      for (var j = 0; j < this.DAYS.length; j++) {
        console.log(dates[i])
        var split = dates[i].toString().split(" ")
        if (split[0] === this.DAYS[j]['id']) {
          console.log(this.DAYS[j]['fulldayFrench'])
          this.DAYS_CAMPAIGN.push({
            "id": this.DAYS[j]['id'],
            "item_text_french": this.DAYS[j]['fulldayFrench'],
            "item_text_english": this.DAYS[j]['fulldayEnglish']
          })
        }
    }
      }
     /*  var self = this
      console.log(self.DAYS_CAMPAIGN)
      setTimeout(() => {
        console.log(self.DAYS_CAMPAIGN)
        
      },2500) */

       this.adScheduleChoiceDisabled = false
        this.adScheduleSelectDayDisabled = false
      this.zoneSelectDisabled = false
    
    } else {
      this.adScheduleSelectDayDisabled = true
       this.adScheduleChoiceDisabled = true
      this.zoneSelectDisabled = true
 
    }
  }
  

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(public auth: AuthService, private router: Router, private ren: Renderer2, private notesService: NotesService,   private mccScrolspyService: MccScrollspyService, private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder, private http: HttpClient, private dateAdapter:DateAdapter<Date>, public snackBar: MatSnackBar, private adGroupService: AdGroupService, private dialog: MatDialog) {
    this.auth.user.forEach(data => {
      this.photoURL = data.photoURL
      this.accountValue = data.account_value
      this.username = data.displayName
      this.email = data.email
      this.uid = data.uid
    })
    this.modulesList = ModulesList;
    	dateAdapter.setLocale('fr-fr'); // DD/MM/YYYY
  
   }

 menuenter() {
   /*  this.isMatMenuOpen = true; */
   /*  if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    } */
   this.enteredButton = true
  }

  menuLeave(trigger, button) {
    setTimeout(() => {
      if (this.isMatMenuOpen === true) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
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
        this.enteredButton = false;
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
        this.ren.addClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.addClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
        this.isMatMenuOpen = true
      } else {
        trigger.closeMenu();
        this.ren.removeClass(this.previousButton['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(this.previousButton['_elementRef'].nativeElement, 'cdk-program-focused');
        this.isMatMenuOpen = false
         trigger.openMenu()
        this.ren.addClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.addClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
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
        this.enteredButton = false;
      }
    }, 100)
  }
  logout() {
    this.auth.signOut();
  }
  ngOnInit() {
    this.auth.notificationAccount.forEach((value) => {
      if(value.notification != ""){
        this.numberOfNotifications = 1
        this.notificationAccountValue = value.notification
      }
    })
     this.auth.user.forEach(child=>{
       this.uid = child.uid
       this.email = child.email
       //console.log(child.uid)
       this.campaigns = this.notesService.getListCampaign(child.uid)
       this.campaigns.subscribe(data => {
         this.dataSource = new MatTableDataSource(data)
         this.dataSource.paginator = this.paginator;
       });
      /*  this.notes.forEach(data => {
         if (data.length > 2) {
           this.display_visuel = false
         }v
       }) */
     })

     
   
  }
   onNationalsWebsitesSelect(event) {
    /*  this.nationals_errors = ''
     this.national_websites.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.national_websites.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.national_websites.length; i++) {
          if (this.national_websites[i]['item_id'] == event.source.value.item_id) {
            this.national_websites.splice(i, 1)
            console.log(this.national_websites)

          }
        }
      }
      if (this.national_websites.length <= 0) {
        this.targetingSelectDisabled = true
      } else {
        this.targetingSelectDisabled = false
      }
      console.log(this.national_websites)
      console.log(event.source.value, event.source.selected);
     
    }
    ////console.log(this.national_websites)
  }
  
  onInternationalsWebsitesSelect(event) {
    /*    this.international_websites.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.international_websites.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.international_websites.length; i++) {
          if (this.international_websites[i]['item_id'] == event.source.value.item_id) {
            this.international_websites.splice(i, 1)
            console.log(this.international_websites)

          }
        }
      }
      console.log(this.international_websites)
      console.log(event.source.value, event.source.selected);

    }
    ////console.log(this.international_websites)
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
  ngOnDestroy() {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }
   scrollTo(id: string): void {
    this.mccScrolspyService.scrollTo('My Scrollspy', id);
  }
    goProfile() {
    this.router.navigate(['UserProfile'])
  }

 /*  go() {
    window.location.replace(SERVER.url_redirect)

  } */
  toggleCampaignList() {
    if (this.listCampaign === false) {
      this.listCampaign = true
      this.createCampaign = false
      this.profile = false
    
   }
  }
  actionClicked(action: string) {
    if (action === "toggleCampaignList") {
      this.toggleCampaignList()
    } else if (action === "createCampaign") {
      this.toggleCreateCampaign()
    } else if (action === "showUserData") {
      this.toggleUserData()
    }
  }
  toggleCreateCampaign() {
    if (this.createCampaign === false) {
      this.createCampaign = true
      this.listCampaign = false
      this.profile = false
         this.campaign = this.fb.group({
           campaign: ['', Validators.required],
         
         });
               this.location = this.fb.group({
           zone: [{value: '', Validators: Validators.required, disabled: this.zoneSelectDisabled}],
         
    });
    this.emplacement = this.fb.group({
          nationalWeb: ['', Validators.required],
      internationalWeb: ['', Validators.nullValidator],
          adWeb: ['', Validators.nullValidator]
    });
       this.ciblageControl = this.fb.group({
          ageControl: [{value: '', Validators: Validators.required, disabled: this.targetingSelectDisabled}],
          genreControl: [{value: '', Validators: Validators.required, disabled: this.targetingSelectDisabled}],
          deviceControl:  [{value: '', Validators: Validators.required, disabled: this.targetingSelectDisabled}]
        });
        this.dateFormStart = this.fb.group({
          start: [{value: '', Validators: Validators.required, disabled: this.datePickerStartDisabled}],
         
        });
       this.dateFormEnd = this.fb.group({
          end: [{value: '', Validators: Validators.required, disabled: this.datePickerEndDisabled}],
         
       });
      
   
  }
  }




  toggleUserData() {
   if(this.profile===false){
     this.profile = true
     this.createCampaign = false
     this.listCampaign = false
   } 
  }
  removeErrorsCampaign() {
    this.message_valid_name = ""
    this.message_invalid_name = ""
    this.is_new_name_valid = false
  }
  beforeVerifyCampaign():Promise<any> {
    return new Promise(resolve => {
      if (this.campaign.value['campaign'] !== '') {
        this.progressBarAddCampaign = true
        this.notesService.campaignVerification(this.uid, this.campaign.value['campaign']).then(res => {
          this.number_when_ad = res
          resolve(res)
        })
      
      }
    
  })
  }

  
   onZoneSelect(event) {
   /* this.zones.push(item) */
    
     if (event.isUserInput) {
      this.zones = []
      this.zones.push(
        event.source.value
      )
    /*   if (event.source.selected === true) {
      } else {
        for (var i = 0; i < this.zones.length; i++) {
          if (this.zones[i]['item_id'] == event.source.value.item_id) {
            this.zones.splice(i, 1)
            console.log(this.zones)

          }
        }
      } */
      if (this.zones.length <= 0) {
        this.placementSelectDisabled = true
      } else {
         this.placementSelectDisabled = false
      }
    }
    ////console.log(this.zones)
  }
   onAgeSelect(event) {
    /*  this.ages.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.ages.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.ages.length; i++) {
          if (this.ages[i]['item_id'] == event.source.value.item_id) {
            this.ages.splice(i, 1)
            console.log(this.ages)

          }
        }
      }
      console.log(this.ages)
      console.log(event.source.value, event.source.selected);
    }
    ////console.log(this.ages)
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
      this.currentDaySelectedEN = event.source.value.item_text_english
      if (this.daysSchedule.length <= 0) {
        this.adScheduleSelectStartHourDisabled = true 
      
      } else {
        this.adScheduleSelectStartHourDisabled = false 
       
      } 
       console.log(this.daysSchedule)
      
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

  deleteSCHEDULE(id, dayFR, dayEN) {
    for (var i = 0; i < this.SCHEDULE_DATA.length; i++) {
      if (this.SCHEDULE_DATA[i]['dayFR'] === dayFR) {
        this.SCHEDULE_DATA.splice(i, 1)
      }
    }
    this.DAYS_CAMPAIGN.push({
       "id": id,
            "item_text_french": dayFR,
            "item_text_english": dayEN
    })
    this.tableSCHEDULE.renderRows()

  }

   onSexeSelect(event) {
    /* this.sexes.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.sexes.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.sexes.length; i++) {
          if (this.sexes[i]['item_id'] == event.source.value.item_id) {
            this.sexes.splice(i, 1)
            console.log(this.sexes)

          }
        }
      }
      console.log(this.sexes)
      console.log(event.source.value, event.source.selected);
    }
    ////console.log(this.sexes)
  }
   onDevicesSelect(event) {
    /* this.devices.push(item) */
    ////console.log(this.devices)
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.devices.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.devices.length; i++) {
          if (this.devices[i]['item_id'] == event.source.value.item_id) {
            this.devices.splice(i, 1)
            console.log(this.devices)

          }
        }
      }
      console.log(this.devices)
      console.log(event.source.value, event.source.selected);
    }
  }
  verifyCampaign() {
    var self = this
    this.progressBarAddCampaign = false
    this.beforeVerifyCampaign().then(res => {
      if (res === 1) {
       
        this.progressBarAddCampaign = false
        self.is_new_name_valid = false
           self.message_valid_name = ""
        self.message_invalid_name = "Nom de campagne déjà utilisé."
        this.datePickerStartDisabled = true
      } else {
          this.is_new_name_valid = true
        this.message_valid_name = "Nom de la campagne valide."
        this.message_invalid_name = ""
        this.progressBarAddCampaign = false
        this.datePickerStartDisabled = false
     }
    })
    /*  if (this.number_when_ad === 1) {
      
        self.message_valid_name = ""
        self.message_invalid_name = "Nom de campagne déjà utilisé."
     if(self.is_new_name_valid === true){
       self.is_new_name_valid = false
     }
      } else{
         this.is_new_name_valid = true
        this.message_valid_name = "Nom de la campagne valide."
        this.message_invalid_name = ""
        this.progressBarAddCampaign = false
      } */
  }
    initAgeTarget(idA: string, campaign_id: any, ad_group_id: any): Promise<any>{
    return new Promise(resolve => {
       this.adGroupService.targetAge(idA, campaign_id, ad_group_id, this.ages).then(res => {
        if (res == "ok") {
          this.ages = []
         
          resolve("ok")

        } else {
          resolve("error")
        }
      })
    })
  }

   initSexeTarget(idA: string, campaign_id: any, ad_group_id: any): Promise<any>{
    return new Promise(resolve => {
       this.adGroupService.targetGenre(idA, campaign_id, ad_group_id, this.sexes).then(res => {
        if (res == "ok") {
          this.sexes = []

          resolve("ok")

        } else {
          resolve("error")
        }
      })
    })
  }

   initDeviceTarget(idA: string, campaign_id: any, ad_group_id: any): Promise<any>{
    return new Promise(resolve => {
       this.adGroupService.targetDevices(idA, campaign_id, ad_group_id, this.devices).then(res => {
        if (res == "ok") {
          this.devices = []

          resolve("ok")

        } else {
          resolve("error")
        }
      })
    })
  }

  initPlacement(idA: string, campaign_id: any, ad_group_id: any): Promise<any> {
    return new Promise(resolve => {
      var placement = []
       /* this.isCreating = true */
    placement.push(this.national_websites, this.international_websites, this.ads_websites)

      this.adGroupService.targetPlacement(idA, campaign_id, ad_group_id, placement).then(res => {
        if (res == "ok") {


          resolve("ok")
        } else {
          resolve('error')
        }
      })
    })
  }

  initTargetZones(id: string, campaign_id: any): Promise<any> {  
    return new Promise(resolve => {
      this.notesService.targetLocation(id, campaign_id, this.new_name, this.zones).then(res => {
      if (res == "ok") {
      resolve('ok')
      } else {
      resolve('error')
      }
    })
   })
  }
  initadSchedules(id: string, campaign_id: any): Promise<any> {  
    return new Promise(resolve => {
      if (this.schedulecheck === 'custom') {
        this.notesService.adsSchedule(id, campaign_id, this.new_name, this.SCHEDULE_DATA).then(res => {
      if (res == "ok") {
      resolve('ok')
      } else {
      resolve('error')
      }
    })
      } else {
        resolve('ok')
     }
   })
  }

    initAllTarget(idC: string, idA: string, campaign_id: any, ad_group_id: any): Promise<any> {
    return new Promise(resolve => {
     /*  this.progressBarInit = true
      this.message_create = "Paramétrage des emplacements en cours..." */
      this.initTargetZones(idC, campaign_id).then(res1=>{
        if (res1 == "ok") {
        this.addCampaignProgessBarValue = "40"
          this.initadSchedules(idC, campaign_id).then(res2 => {
            if (res2 == "ok") {
              this.addCampaignProgessBarValue = "52"
                     this.initPlacement(idA, campaign_id, ad_group_id).then(res3 => {
                       if (res3 == "ok") {
              this.addCampaignProgessBarValue = "64"
            /*   this.message_create = "Emplacements définis avec succès !"
              this.message_create = "Paramétrage du ciblage des âges en cours..." */
              this.initAgeTarget(idA, campaign_id, ad_group_id).then(res4 => {
    
                if (res4 == "ok") {
                  this.addCampaignProgessBarValue = "76"
                 /*  this.message_create = "Ciblage des âges défini avec succès !"
                  this.message_create = "Paramétrage du ciblage de genres en cours..." */
                  this.initSexeTarget(idA, campaign_id, ad_group_id).then(res5 => {
    
                    if (res5 == "ok") {
                      this.addCampaignProgessBarValue = "88"
                     /*  this.message_create = "Ciblage de genres défini avec succès !"
                      this.message_create = "Paramétrage du ciblage d'appareils en cours..." */
                      this.initDeviceTarget(idA, campaign_id, ad_group_id).then(res6 => {
                        if (res6 == "ok") {
                          this.addCampaignProgessBarValue = "100"
                         /*  this.message_create = "Ciblage d'appareils défini avec succès !"
                          this.message_create = "Sauvegarde des éléments en cours...." */
                           resolve("ok")
                        }else{
          this.progressBarAddingCampaign = false
        }
                      })
                  }else{
          this.progressBarAddingCampaign = false
        }
                })
              }else{
          this.progressBarAddingCampaign = false
        }
            })
          }else{
          this.progressBarAddingCampaign = false
        }
        })
            }else{
          this.progressBarAddingCampaign = false
        }
          })
          
        }else{
          this.progressBarAddingCampaign = false
        }
      })
   })
  }
  setCampaignAdGroupId(id: string, data: any): Promise<any>{
    return new Promise(resolve => {
      this.notesService.updateNote(id, data).then(res => {
        if(res == "ok"){
          
          resolve("ok")
        }
      })
    })
  }
  addCampaign() { 
    this.progressBarAddingCampaign = true

        this.notesService.newCampaign(this.email, this.new_name, this.startDateEnglishSelected, this.endDateEnglishSelected).then(result_campaign => {
          if (result_campaign != "error") {
        this.addCampaignProgessBarValue = "14"
        var campaign = result_campaign[0]
         this.adGroupService.newAdGroupCampaign(campaign['campaign_id'], this.new_name).then(result_adgroup => {
           if (result_adgroup != "error") {
             this.addCampaignProgessBarValue = "28"
             var adgroup = result_adgroup[0]
             this.setCampaignAdGroupId(campaign['id'], { ad_group_id: adgroup['ad_group_id'], ad_group_id_firebase: adgroup['id'] }).then(set => {
               if (set === "ok") {
                 
                 this.initAllTarget(campaign['id'], adgroup['id'], campaign['campaign_id'], adgroup['ad_group_id']).then(res => {
                  if(res=="ok"){
                    alert('campagne ajouté avec succès ')
                    window.location.reload()
                  } else {
                    this.progressBarAddingCampaign = false
                  }
                })
               }
             })
             /*  this.router.navigate(['/ads', name, campaign['campaign_id'], adgroup[0]['id'], adgroup[0]['ad_group_id'], campaign['campaign_id']]) */
            }else {
        this.progressBarAddCampaign = false
                 
              
      }
          })


  
      } else {
        this.progressBarAddCampaign = false
                 
              
      }
    })
      
    if (this.campaign.valid) {
    /*   this.message_to_show = "Initialisation..."
    this.progressBarAddCampaign = true
     this.message_to_show = "Traitement en cours..." 
    var name = this.new_name.replace(/\s/g, "")
    this.notesService.addCampaign(this.email, this.uid, name).then(result => {
      if (result != "error") {
        var campaign = result[0]
           this.message_to_show = "Campagne ajoutée !"
            this.openSnackBar("Félicitations "+this.currentUser+" la campagne " +name+" a été ajouté avec succès !", "")
        this.message_to_show = "Création du groupe de visuel en cours..."
         this.adGroupService.addAdGroup(campaign['campaign_id'], this.uid, name).then(adgroup => {
          if (adgroup!= "error") {
               this.message_to_show = "Opération terminée !"
                  this.openSnackBar("Votre premier groupe de visuel " +name+" a été ajouté avec succès !", "")
              this.name = '';
            
              this.progressBarAddCampaign = false
                 
                 this.message_to_show = ""
         
                
              this.router.navigate(['/ads', name, campaign['campaign_id'], adgroup[0]['id'], adgroup[0]['ad_group_id'], campaign['campaign_id']])
            }
          })


  
      } else {
        this.progressBarAddCampaign = false
                 
                 this.message_to_show = ""
      }
    })*/
    }
   
    
  }

    updateCampaign(id, id_campagne, name, status, budget) {
      
    var html = ""
    if (status === "PAUSED" && budget > 0) {
      html = ' <div class="card shadow no-b r-0"><div class="card-header text-center white b-0"><h6>Modifier la campagne</h6></div>' +
        ' <div class="card-body"><form class="needs-validation" novalidate><div class="form-row">' +
        '<div class="col-md-6"> <label for="validationCustom01">Nom</label> <input type="text" class="form-control"  placeholder="Nom de la campagne" id="campagne_name" value=' + name + ' required><div class="valid-feedback">Looks good!</div></div>' +
        '<div class="col-md-6"> <label for="validationCustom01">Status</label>  <select class="custom-select select2" required><option value=""></option><option value="ENABLED">Activer</option> </select></div>' +
        '</form></div></div></div>'
    } else if (status === "PAUSED" && budget === 0) {
           html = ' <div class="card shadow no-b r-0"><div class="card-header text-center white b-0"><h6>Modifier la campagne</h6></div>' +
        ' <div class="card-body"><form class="needs-validation" novalidate><div class="form-row">' +
        '<div class="col-md-6"> <label for="validationCustom01">Nom</label> <input type="text" class="form-control"  placeholder="Nom de la campagne" id="campagne_name" value=' + name + ' required><div class="valid-feedback">Looks good!</div></div>' +
        '<div class="col-md-6"> <label for="validationCustom01">Status</label>  <select class="custom-select select2" required><option value=""></option></select></div>' +
        '</form></div></div></div>'
    }else {
     
      html = ' <div class="card shadow no-b r-0"><div class="card-header text-center white b-0"><h6>Modifier la campagne</h6></div>' +
        ' <div class="card-body"><form class="needs-validation" novalidate><div class="form-row">' +
        '<div class="col-md-6"> <label for="validationCustom01">Nom</label> <input type="text" class="form-control"  placeholder="Nom de la campagne" id="campagne_name" value=' + name + ' required><div class="valid-feedback">Looks good!</div></div>' +
        '<div class="col-md-6"> <label for="validationCustom01">Status</label>  <select class="custom-select select2" required><option value=""></option> <option value="PAUSED" >Désactiver</option></select></div>' +
        '</form></div></div></div>'
    }

    //console.log(id_campagne)
    //console.log(name)
    Swal.fire({
      title: '',
      type: 'info',
      html: html ,
    
      confirmButtonText: '<i class="icon-check"></i> Valider',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="icon-remove"></i> Annuler',
      showCloseButton: false,
      buttonsStyling: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",

      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

      if (result.dismiss) {
        this.isRoller = false
      } else {
        var data = []
        this.isRoller = true
        
        //Si nom inshangé et status inchangé
        if (name == $("#campagne_name").val() && $('.custom-select').val()=="") {
          Swal.fire({
            title: 'Modification!',
            text: 'Aucune modification détectée',
            type: 'warning',
            showCancelButton: false,
           confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
            confirmButtonText: 'Ok',
            focusConfirm: false,
          })
          this.isRoller = false
          //Si nom inchangé et status changé
        } else if (name == $("#campagne_name").val() && status != $('.custom-select').val() && $('.custom-select').val() != "") {
          data.push({
            "id": id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": name,
            "email": this.email,
            "status": $('.custom-select').val(),
            "state": "1"
          })
          $.ajax({
            type: "POST",
            url: SERVER.url+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            //console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(id, {
                status: response[0].status
              })
              this.isRoller = false

              Swal.fire({
                title: 'Modification!',
                text: 'Status de la campagne modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              }).then((result) => {
                this.isRoller = false
                                if (result.value) {
                  this.isRoller = false

                } else {
                  this.isRoller = false
                }
              })



            } else {
              this.isRoller = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              })
            }
          })
          //Si nom changé et status inchangé
        } else if (name != $("#campagne_name").val() && $('.custom-select').val()=="") {
          data.push({
            "id": id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": name,
            "email": this.email,
            "status": status,
            "state": "2"
          })
          $.ajax({
            type: "POST",
            url: SERVER.url+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            //console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(id, {
                name: response[0].name
              })
              this.isRoller = false
              Swal.fire({
                title: 'Modification!',
                text: 'Nom de la campagne modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              }).then((result) => {
                                if (result.value) {
                  this.isRoller = false

                } else {
                  this.isRoller = false
                }
              })
            } else {
              this.isRoller = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              })

            }
          })
          //Si nom et status modifés
        } else if (name != $("#campagne_name").val() && status != $('.custom-select').val() && $('.custom-select').val() != "" && $("#campagne_name").val() != "") {
          data.push({
            "id": id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": name,
            "email": this.email,
            "status": $('.custom-select').val(),
            "state": "3"
          })
          $.ajax({
            type: "POST",
            url: SERVER.url+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            //console.log(response)
            if (response[0].status != "error") {

              this.notesService.updateNote(id, {
                name: response[0].name,
                status: response[0].status
              })

              Swal.fire({
                title: 'Modification!',
                text: 'Le nom et le status de votre campagne ont été modifié avec succès.',
                type: 'success',
                focusConfirm: false,
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.value) {
                  this.isRoller = false

                } else {
                  this.isRoller = false
                }
              })

            } else {
              this.isRoller = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                focusConfirm: false,
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok'
              })
            }
          })
          //Si nom changé et status vide
        } else if (name != $("#campagne_name").val() && $('.custom-select').val() == "") {
          data.push({
            "id": id_campagne,
            "name": $('#campagne_name').val(),
            "last_name": name,
            "email": this.email,
            "status": status,
            "state": "4"
          })
          $.ajax({
            type: "POST",
            url: SERVER.url+"/updateCampaign",
            datatype: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
          }).then((response) => {
            //console.log(response)
            if (response[0].status != "error") {
              this.notesService.updateNote(id, {
                name: response[0].name
              })
              this.isRoller = false
              Swal.fire({
                title: 'Modification!',
                text: 'Nom de la campagne a été modifié avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              }).then((result) => {
                if (result.value) {
                  window.location.reload()

                }
              })
            } else {
              this.isRoller = false
              Swal.fire({
                title: 'Erreur!',
                text: "Erreur serveur, Réssayer",
                type: 'error',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                focusConfirm: false,
              })

            }
          })

        } else if ($("#campagne_name").val() == "" && $('.custom-select').val() == "") {
          Swal.fire({
            title: 'Modification!',
            text: 'Aucune Modification détectée',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })


        } else {
          this.isRoller = false
          Swal.fire({
            title: 'Errur!',
            text: 'Données invalides',
            type: 'error',
            focusConfirm: false,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })
        }
      }
    })
  }
  
  deleteCampaign(id, id_campagne) {
    
  /*   this.getListAdGroupId(id_campagne).then(adgroup => {
      console.log(adgroup)
      this.getListAdId(adgroup).then(res => {
        var list = res
      })
    }) */
      Swal.fire({
      title: 'Vous voulez vraiment supprimer cette campagne?',
      text: "Cette action sera irréversible!",
       type: 'warning',
       focusConfirm: false,
      buttonsStyling: true,
       showCancelButton: true,
       cancelButtonText: '<i class="icon-remove"></i> Annuler',
       confirmButtonText: 'Oui, supprimer!',
       confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
       cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
    }).then((result) => {
      if (result.value) {
        this.isRoller = true
        var data = {
          "id": id_campagne
        }
        $.ajax({
          type: "POST",
          url: SERVER.url+"/deleteCampaign",
          datatype: "json",
          contentType: 'application/json',
          success: function (response) {
            //console.log(response)
            if (response.status == "ok") {
              //console.log(response.handler)

            }
          },
          error: function (err) {
            //console.log(err)
          },

          data: JSON.stringify(data),
        }).then((res) => {

      //console.log(this.ad_groups_list_id)
    
      
          this.notesService.deleteNote(id).then(res => {
            if (res == "ok") {
       
              Swal.fire({
                title: 'Supprimer!',
                text: 'Votre campagne a été supprimée avec succès.',
                type: 'success',
                showCancelButton: false,
                confirmButtonClass: "btn btn-sm white text-black-50 r-20 border-grey",
      cancelButtonClass: "btn btn-sm white text-danger r-20 border-red",
                confirmButtonText: 'Ok',
                 focusConfirm: false,
              }).then((result) => {
                if (result.value) {
                this.isRoller = false
           
                } else {
                  this.isRoller = false
                }
              })
            } else {
              this.isRoller
     }
   })
      


        }).catch(err => {
          Swal.fire(
            'Erreur!',
            'Une erreur est survenue lors de la suppression de votre campagne',
            'error'
          )
        })

      
      }
    })  

  }
   goCampaignSettings(id: string,id_campagne: string, name: string, status: string, budget: any, budgetId: any, dailyBudget: any, numberOfDays: any) {
    id_campagne = id_campagne;
    this.router.navigate(["/edit", name, id, id_campagne])
    
  }
 

}


