import { Component, OnInit, ViewChild, Renderer2,  ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { MatSidenav, MatDrawer } from '@angular/material/sidenav';
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { SelectionModel } from '@angular/cdk/collections';
import {
  ActivatedRoute, Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MccScrollspyService } from 'material-community-components';
import { MccScrollspyItemDirective } from 'material-community-components'
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { SERVER } from '../../../../environments/environment'
import { ModulesList } from '../menu';
import { NotesService } from '../notes.service';
import {Note} from "../note.models"

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
   preserveWhitespaces: false,

})
export class UserProfileComponent implements OnInit, OnDestroy{
  @ViewChild('matDrawer') matDrawer: MatDrawer;
   @ViewChild('sidenav') sidenav: MatSidenav;
  photoURL = ""
  numberOfNotifications = 0
  notificationAccountValue = ""
  accountValue = 0
  username = ""
  email = ""
  uid = ""
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
  is_new_name_valid = false
  message_valid_name = ""
  message_invalid_name = ""
  progressBarAddCampaign = false
  number_when_ad = 0
  zones = []
  dropdownListZones = [{
      item_id: 9070424,
      item_text: 'Dakar'
    },
    {
      item_id: 9070424,
      item_text: 'Sénégal'
    }
    ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['select', 'name', 'status', 'date de début', 'Budget', "Paramétrer"];
  dataSource = new MatTableDataSource<Note>([])
  selection = new SelectionModel<Note>(true, []);
    items: MccScrollspyItemDirective[];

  private _subscription: Subscription;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(public auth: AuthService, private router: Router, private ren: Renderer2, private notesService: NotesService,   private mccScrolspyService: MccScrollspyService, private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder, private http: HttpClient) {
    this.auth.user.forEach(data => {
      this.photoURL = data.photoURL
      this.accountValue = data.account_value
      this.username = data.displayName
      this.email = data.email
      this.uid = data.uid
    })
    this.modulesList = ModulesList;
  
   }
 menuenter() {
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger, button) {
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80)
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

  buttonEnter(trigger) {
    setTimeout(() => {
      this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu()
   }, 100)
  }

  buttonLeave(trigger, button) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } if (!this.isMatMenuOpen) {
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

       this._subscription = this.mccScrolspyService.group('My Scrollspy').subscribe(items => {
      this.items = items;
      this.changeDetectorRef.detectChanges();
    });
   
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

  go() {
    window.location.replace(SERVER.url_redirect)

   /*  this.router.navigate(['/']) */
  }
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
           zone: ['', Validators.required],
         
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
    this.progressBarAddCampaign = true
    return new Promise(resolve => {
    this.notesService.campaignVerification(this.uid, this.campaign.value['campaign']).then(res => {
      this.number_when_ad = res
      resolve(res)
    })
    
  })
  }

  sendPaymentInfos() {
     this.http.post('https://api.gutouch.com/dist/api/touchpaydoc/v1', {
         'numero_commande': "123476578686",
          'agence_code': 'INTDK0197', 
       'secure_code': 'FkjUYS3aab88rspwBMfDQUXCb9tZq86t1J8fOFAAlzSoMQUBg1',
       'url_notif_success': 'localhost:4200',
       'url_notif_failed': 'localhost:4200',
       'domain_name': 'localhost',
       'montant': 10000,
       'clientPhone': '774652830',
       'clientFirstName':'Ibrahima',
       'clientLastName': 'Touré',
       'email': 'ibrahima.toure.dev@gmail.com'
       
          })

          .subscribe(
            res => {
              console.log(res)

             

            },
            err => {
              console.log(err)
            }
          );
  }
   onZoneSelect(event) {
   /* this.zones.push(item) */
    
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.zones.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.zones.length; i++) {
          if (this.zones[i]['item_id'] == event.source.value.item_id) {
            this.zones.splice(i, 1)
            console.log(this.zones)

          }
        }
      }
      console.log(this.zones)
      console.log(event.source.value, event.source.selected);
    }
    ////console.log(this.zones)
  }
  verifyCampaign() {
    var self = this
    this.progressBarAddCampaign = false
    this.beforeVerifyCampaign().then(res => {
      if (res === 1) {
        alert( this.campaign.value['campaign'] + 'exist')
        this.progressBarAddCampaign = false
        self.is_new_name_valid = false
           self.message_valid_name = ""
        self.message_invalid_name = "Nom de campagne déjà utilisé."
  
      } else {
          this.is_new_name_valid = true
        this.message_valid_name = "Nom de la campagne valide."
        this.message_invalid_name = ""
        this.progressBarAddCampaign = false
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
}


