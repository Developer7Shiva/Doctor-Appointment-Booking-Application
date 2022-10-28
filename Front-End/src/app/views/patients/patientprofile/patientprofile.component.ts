import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.scss'],
})
export class PatientprofileComponent implements OnInit {
  name: any;
  email: any;
  phone: any;
  gender: any;
  birthDate: any;
  height: any;
  weight: any;
  address: any;

  constructor(private router: Router, private Pservices: PatientService) {}

  ngOnInit(): void {
    this.onStart();
  }

  backToView() {
    this.router.navigate(['/dashboard/patient']);
  }

  //To Load a Clicked User details
  onStart() {
    console.log('On Start Executed..');
    this.Pservices.view_profile().subscribe({
      next: (data: any) => {
        console.log("Patients profile :"+data);
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.gender = data.gender;
        this.birthDate = data.birthDate;
        this.height = data.height;
        this.weight = data.weight;
        this.address = data.address;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
