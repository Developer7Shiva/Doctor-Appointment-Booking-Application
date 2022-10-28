import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
})
export class EditDoctorComponent implements OnInit {
  id: any;
  updateinfo: any;

  name: any;
  email: any;
  phone: any;
  gender: any;
  expertise: any;
  experience: any;
  address: any;
  qualification: any;

  docdetails: any;

  constructor(
    private router: Router,
    private Aservices: AdminService,
    private acRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.acRoute.snapshot.params['id'];
    this.onStart();
  }
  onStart() {
    this.Aservices.get_doctorDetail(this.id).subscribe({
      next: (data: any) => {
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.gender = data.gender;
        this.experience = data.experience;
        this.expertise = data.expertise;
        this.qualification = data.qualification;
        this.address = data.address;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onDocUpdate(val: NgForm) {
    console.log(val.form.value);
    this.updateinfo = val.form.value;
    this.Aservices.edit_doctor(this.id, this.updateinfo).subscribe({
      next: (data: any) => {
        console.log(data +"data fetech afer updated the doctor");
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.router.navigate(['/dashboard/view_doctors']);
  }
}
