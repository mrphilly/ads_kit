import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';

import Swal from 'sweetalert2'
type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };
@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {

   isCreating = false
  Invalid = false
  errors_credentials: any;
  accountValue = 0
  userForm: FormGroup;
  newUser = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Adresse email requise.',
      'email': 'Saisissez une adresse email valide',
    },
    

    'password': {
      'required': 'Mot de passe requis.',
      'pattern': 'Le mot de passe doit comporter au moin au moins 1 caractère majuscule, une lettre minuscule, un chiffre et un caractère spécial comme @,#...',
      'minlength': 'Le mot de passe doit comporter au moins 4 caractères.',
      'maxlength': 'La longueur du mot de passe ne peut pas dépasser 40 caractères',
    },
  };

    email: any
  constructor(private fb: FormBuilder,public auth: AuthService,
    private router: Router) { 
   
              }

  /// Social Login
  ngOnInit() {
    
    this.buildForm()
    this.auth.user.forEach(value => {
      if (value) {
        this.email = value.email
        this.accountValue = value.account_value   
         }
      
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
    
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']).then(res => {
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
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
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

  async signInAnonymously() {
   return await this.auth.anonymousLogin();
     
  }

  /// Shared


  go() {
  this.router.navigate(['/'])
}
  logout() {
    this.auth.signOut()
  }

  

}
