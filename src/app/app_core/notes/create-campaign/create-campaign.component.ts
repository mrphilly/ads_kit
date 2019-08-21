import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import * as $ from 'jquery';

import { NotesService } from '../notes.service';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2'

import { Router } from '@angular/router'
import { SERVER } from '../../../../environments/environment'
import * as particules from "../../../../assets/js/particles"

declare const particlesJS: any; 

const REDIRECT_URL = SERVER.url_redirect
@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
  
export class CreateCampaignComponent implements OnInit {
  
  uid: string;
  notes: any;
  email: string;
  name: string;
  status: string;
  id_campagne: string;
  title: string;
 
  isCreating = false;
  isExist: boolean = false
  
  constructor(private router: Router, private notesService: NotesService, private auth: AuthService,) { 
     this.title = "Créer une campagne"
       this.auth.user.forEach((value) => {
         this.uid = value.uid
         this.email = value.email
    })
  }



  ngOnInit() {
    document.getElementById('body').classList.add('adafri-background')
    setTimeout(() => {
             particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 380,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#ffffff"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "../../../../assets/img/images/campaign.png",
        "width": 1000,
        "height": 1000
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": true
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}); 
        }, 2000)
    
      this.auth.user.forEach((value) => {
         this.uid = value.uid
         this.email = value.email
      })

  }

  addCampaign() {
    this.isCreating = true
    var name = $("#campagne").val()
    this.notesService.addCampaign(this.email, this.uid, name).then(result => {
      if (result != "error") {
        this.isCreating = false
       window.location.replace(REDIRECT_URL)
      } else {
        this.isCreating = false
      }
    })
    
  }

  go1() {
  window.location.replace(REDIRECT_URL)
   window.location.reload()
 }
  
  go() {
    document.getElementById('body').classList.remove('adafri-background')
    window.location.replace(REDIRECT_URL)
   
   /*  this.router.navigate(['/']) */
  }

}
