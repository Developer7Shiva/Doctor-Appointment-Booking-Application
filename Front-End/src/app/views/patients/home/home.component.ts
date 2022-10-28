import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  patients: any;
  bookingModal: any;

  name: any;
  specialist: any;
  phone: any;
  qualification: any;
  expertise: any;
  location: any;
  date: any;
  time: any;
  docID: any;


  constructor(
    private Pservice: PatientService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchAll();
  }

  //Get All Doctors list
  fetchAll() {
    this.Pservice.view_doctorslist().subscribe({
      next: (data) => {
        console.log(data);
        this.patients = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Booking Modal
  openBookingModal(bookingModal: any, docId: any) {
    this.modalService.open(bookingModal, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.Pservice.get_doctorDetails(docId).subscribe({
      next: (data:any) => {
        this.name=data.name;
        this.specialist= data.expertise;
        this.location = data.address;
        this.qualification = data.qualification;
        this.docID= data._id;
        console.log(docId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Booking Appointment Method to store appointment
  onBookDoc(formVal: any) {
    this.Pservice.new_appointment(formVal).subscribe({
      next: (data:any)=>{
        console.log(data);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
