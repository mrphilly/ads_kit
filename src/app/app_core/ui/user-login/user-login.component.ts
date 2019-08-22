import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { database } from 'firebase';

import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2'
import * as $ from 'jquery'
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage'

declare const particlesJS: any
type UserFields = 'email' | 'password' | 'username';
type FormErrors = { [u in UserFields]: string };
@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  fileToUpload: File = null;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: any
  downloadURL: any
  usernameOk = false
  photoUrl: any;
   isCreating = false
  Invalid = false
  errors_credentials: any;
  uid: string;
  accountValue = 0
  userForm: FormGroup;
  newUser = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'email': '',
    'username': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Adresse email requise.',
      'email': 'Saisissez une adresse email valide',
    },
    'username': {
      'required': "Nom d'utilisateur obligatoire ",
      'email': "",
    },
    

    'password': {
      'required': 'Mot de passe requis.',
      'pattern': 'Le mot de passe doit comporter au moin au moins 1 caractère majuscule, une lettre minuscule, un chiffre et un caractère spécial comme @,#...',
      'minlength': 'Le mot de passe doit comporter au moins 4 caractères.',
      'maxlength': 'La longueur du mot de passe ne peut pas dépasser 40 caractères',
    },
  };

  email: any
  userList = []
  constructor(private fb: FormBuilder,public auth: AuthService,
    private router: Router, private afs: AngularFirestore, private afStorage: AngularFireStorage) { 
    this.afs.collection('users').valueChanges().forEach(data => {
       this.userList = data
     })
   
              }

  /// Social Login
  ngOnInit() {
    
    this.buildForm()
    this.auth.user.forEach(value => {
      var jQuery = $
      console.log(value)
      if (value!=null) {
        this.email = value.displayName
        this.accountValue = value.account_value 
        this.photoUrl = value.photoURL
        this.uid = value.uid

        
      }

     
  
      
     
      
    })

    /*     setTimeout(() => {
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
      "value": "#4cb5b1"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#4cb5b1"
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
      "value": 0.1,
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
      "opacity": 0.1,
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
        }, 2000) */


/* ---- stats.js config ---- */
    
  }
  
   goProfile() {
    this.router.navigate(['UserProfile'])
  }
  
  async upload(event) {
    this.isCreating = true
   var storage = firebase.app().storage("gs://comparez.appspot.com/");
    var storageRef = storage.ref();
   var sef = this
    var imageRefStorage ="/profile/" +this.email
    var imagesRef = storageRef.child(imageRefStorage);
  const randomId = Math.random().toString(36).substring(2);
  this.ref = this.afStorage.ref("/profile/"+this.email);
  this.task =this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.task.then(() => {
      storage.ref().child(imageRefStorage).getDownloadURL().then(url => {
          var xhr = new XMLHttpRequest();
   xhr.responseType = 'blob';
   xhr.onload = function(event) {
     var blob = xhr.response;
   };
   xhr.open('GET', url);
        xhr.send();
        console.log(url)

        this.auth.updateUser(this.uid, { photoURL: url }).then(res => {

          if (res != "error") {
            this.isCreating = false
                  Swal.fire({
        title: 'Profile',
        text: 'Photo de profile modifiée avec succès !',
        type: 'success',
                    showCancelButton: false,
                    buttonsStyling: true,
                    confirmButtonClass: 'white border-grey adafri-police-14 r-20 text-black-50',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          
        } else {
          
        }

      })
          } else {
            this.isCreating = false
                  Swal.fire({
        title: 'Profile',
        text: 'Error Network !',
        type: 'error',
                    showCancelButton: false,
                    buttonsStyling: true,
                    confirmButtonClass: 'white border-red text-danger adafri-police-14 r-20',
        confirmButtonText: 'réessayer'
      }).then((result) => {
        if (result.value) {
          
        } else {
          
        }

      })
          }
        })
       
         
          
          
        })
     })
     }
    
  
  


   toggleForm() {
    this.newUser = !this.newUser;
  }

  async signInWithGoogle() {
    await this.auth.googleLogin().then(res => {
      if (res == "ok") {
         Swal.fire({
        title: 'Authentification',
        text: 'Vous êtes maintenant connecté',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#26a69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          
        } else {
          
        }

      })
      }
    })
    
  }

   
  triggerUpload() {
    document.getElementById('file').click()
  }



  async signInWithFacebook() {
    await this.auth.facebookLogin().then(res => {
      if (res == "ok") {
        if (res == "ok") {
          Swal.fire({
            title: 'Authentification',
            text: 'Vous êtes maintenant connecté',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#26a69a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              
            } else {
              
            }

          })
        }
      }
    });

  }

  signup() {
    this.isCreating = true;
    if (this.userList.length == 0) {
      if (this.userForm.value['username'] == "") {
        this.usernameOk = false
      } else {
        this.usernameOk = true
        
      }
    } else {

      if (this.userForm.value['username'] == "") {
        this.usernameOk = false
      } else {
         this.userList.forEach(data => {
        if (data['displayName'] == this.userForm.value['username']) {
          this.usernameOk = false
        } else {
          this.usernameOk = true
        }
      })
        
      }
     
      
    }
    if (this.usernameOk === true) {
        
      this.auth.emailSignUp(this.userForm.value['username'], this.userForm.value['email'], this.userForm.value['password']).then(res => {
        if (res == "ok") {
           Swal.fire({
              title: 'Authentification',
              text: 'Inscription terminée avec succès',
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
                
              } else {
                
              }
  
            })
        }
      });
    } else {
       Swal.fire({
              title: 'Authentification',
              text: "Nom d'utilisateur indisponible ou vide",
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#26a69a',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Réessayer'
            }).then((result) => {
              if (result.value) {
                
              } else {
                
              }
  
            })
      }
    
  
  }

  login() {
    this.isCreating = true
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']).then(res => {
      
      if (res.toString()!= "") {
        Swal.fire({
            title: 'Authentification',
            text: 'Vous êtes maintenant connecté',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#26a69a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              
            } else {
              
            }

          })
          
      } 
   
      
    });
  }
  listenError() {
   
    if (this.Invalid = true) {
      this.Invalid = false
    }
  }

  resetPassword() {
    this.auth.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true);
  }

  afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    
    return this.router.navigate(['/']);
  }

  buildForm() {
    this.userForm = this.fb.group({
      'username': ['', [
        Validators.required,
        Validators.nullValidator,
      ]],
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }


  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password' || field === 'password')) {
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
  async signInWithGithub() {
   return await this.auth.githubLogin();
    
  }


  async signInWithTwitter() {
    return await this.auth.twitterLogin();
  
  }

  /// Anonymous Sign In

 /*  async signInAnonymously() {
   return await this.auth.anonymousLogin();
     
  } */

  /// Shared


  go() {
  this.router.navigate(['/'])
}
  logout() {
    this.auth.signOut()
  }

  

}
