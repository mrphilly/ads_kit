import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';

import {
  Observable
} from 'rxjs';

import 'fabric';

import {
  AuthService
} from '../../../core/auth.service';

import Swal from 'sweetalert2'
declare const fabric: any;


import {Ads} from '../../ads.service'

@Component({
  selector: 'app-annonce-service-component',
  templateUrl: './annonce-service-component.component.html',
  styleUrls: ['./annonce-service-component.component.css']
})
export class AnnonceServiceComponentComponent implements OnInit {

  constructor(private adsService: Ads, private http: HttpClient) { }

  @Input() ad_group_id: any;

 

  private ads: any;
  number_ads: any;
  isAddAd = false
  isEditor = false

  ngOnInit() {
  
    this.ads = this.adsService.getListAnnonces(this.ad_group_id)
    this.ads.forEach(child => {
      if (child.length > 0) {
        this.number_ads = child.legnth
      } else {
        this.number_ads = 0
        this.isAddAd = true
      }
    })

    
  }



  




  async toggleEditor() {
    this.isAddAd = false;
    this.isEditor = true;


   
  }

  //Block "Add text"

}