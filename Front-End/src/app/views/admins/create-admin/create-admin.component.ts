import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
})
export class CreateAdminComponent implements OnInit {
  adminForm = new FormGroup({
    fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private services: AdminService, private router:Router) {}

  ngOnInit(): void {}

  adminReg(){
    console.log(this.adminForm.value);
    if (this.adminForm.value) {
      this.services.create_admin(this.adminForm.value).subscribe({
        next: (data) => {
          if (data != null) {
            this.adminForm.reset();
            this.router.navigate(['/dashboard/view_admins']);
          }
        },
        error: (error) => {
          message: 'Account cannot created';
        },
      });
    }
  }
}
