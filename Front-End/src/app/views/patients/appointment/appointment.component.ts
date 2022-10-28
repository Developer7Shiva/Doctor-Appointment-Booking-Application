import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  constructor(private Pservice: PatientService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.get_appointments();
  }

  //get all appointments
  get_appointments() {
    this.Pservice.view_appointments().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  //view single apponitment using id
  get_appointment(id: any) {
    this.Pservice.view_appointment(id).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  //update appointment using params id
  edit_appointment(id: any, body: any) {
    this.Pservice.update_appointment(id, body).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  //remove appointment using params id
  remove_appointment(id: any) {
    this.Pservice.delete_appointment(id).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
