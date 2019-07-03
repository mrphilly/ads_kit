import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { loadCldr } from "@syncfusion/ej2-base";

import { AuthService } from './app_core/core/auth.service';
import * as $ from 'jquery'
declare var require: any;
loadCldr(
  require("cldr-data/main/de/numbers.json"),
  require("cldr-data/main/de/ca-gregorian.json"),
  require("cldr-data/supplemental/numberingSystems.json"),
  require("cldr-data/main/de/timeZoneNames.json"),
  require('cldr-data/supplemental/weekdata.json') // To load the culture based first day of week
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( sanitizer: DomSanitizer, private auth: AuthService) {
    
  }
  async ngOnInit() {
     
  }
   async loadScript(src){
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
    script.src = src;
    $("body").css("background-image", "url('')")
  }

}
