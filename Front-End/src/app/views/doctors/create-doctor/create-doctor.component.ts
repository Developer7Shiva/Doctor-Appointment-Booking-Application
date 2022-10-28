import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.scss'],
})
export class CreateDoctorComponent implements OnInit {
  doctorForm = new FormGroup({
    fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    expertise: new FormControl('',[Validators.required]),
    experience: new FormControl('', [Validators.required]),
    qualification: new FormControl('', [Validators.required]),
    address: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.email]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    password: new FormControl('', [Validators.required]),
    licenseNo: new FormControl('', [Validators.required]),
    licenseExp: new FormControl('',[Validators.required])
  });

  constructor(private services: AdminService, private router: Router) {}

  ngOnInit(): void {}

  doctorReg() {
    console.log(this.doctorForm.value);
    if (this.doctorForm.value) {
      this.services.create_doctor(this.doctorForm.value).subscribe({
        next: (data) => {
          if (data != null) {
            this.doctorForm.reset();
            this.router.navigate(['/dashboard/view_doctors']);
          }
        },
        error: (error) => {
          message: 'Account cannot created';
        },
      });
    }
  }
}
