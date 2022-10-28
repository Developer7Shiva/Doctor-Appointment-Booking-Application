import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
})
export class EditPatientComponent implements OnInit {
  updateinfo: any;

  name: any;
  email: any;
  phone: any;
  gender: any;
  height: any;
  weight: any;
  address:any;

  id: any;

  constructor(
    private router: Router,
    private services: AdminService,
    private acRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.acRoute.snapshot.params['id'];
    this.onStart();
  }
  onStart() {
    this.services.get_patientDetail(this.id).subscribe({
      next: (data: any) => {
        console.log('data: ', data);

        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.gender = data.gender;
        this.height = data.height;
        this.weight = data.weight;
        this.address = data.address
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onPatientUpdate(val: NgForm) {
    console.log(val.form.value);
    this.updateinfo = val.form.value;
    this.services.edit_patient(this.id, this.updateinfo).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.router.navigate(['/dashboard/view_patients']);
  }
}
