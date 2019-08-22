import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

import * as $ from 'jquery'
type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  isCreating = false
  Invalid = false
  errors_credentials: any;
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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  async signInWithFacebook() {
    await this.auth.facebookLogin();
    await this.afterSignIn();
  }

  /* signup() {
    this.isCreating = true;
    
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']);
    this.afterSignIn()
    this.isCreating = false
  } */

  login() {
    this.isCreating = true
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']).then(res => {
      console.log(res)
      console.log(typeof(res))
      if (res.length == 0) {
        this.isCreating = false
        this.Invalid = true
        this.errors_credentials = 'Indentifiants incorrects'
          
      } else {
        this.afterSignIn()
           this.isCreating = false
    
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

  private afterSignIn() {
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
}
