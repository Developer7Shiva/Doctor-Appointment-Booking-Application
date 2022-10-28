import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {PagesService} from '../services/pages.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userForm = new FormGroup({
    fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    birthDate: new FormControl('', []),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private services: PagesService, private router: Router) {}

  patientRegistration() {
    console.log(this.userForm.value);
    if (this.userForm.value) {
      this.services.regPatient(this.userForm.value).subscribe({
        next: (data) => {
          if(data!=null) {
            this.userForm.reset();
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          message: 'Account cannot created';
        },
      });
    }
  }
}
