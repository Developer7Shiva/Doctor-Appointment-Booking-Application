import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { AdminService } from '../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit {
  doctors: any;

  doctorModal: any;

  temp: any;

  Role: any;

  constructor(
    private Dservices: DoctorService,
    private Aservices: AdminService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.temp = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.Role = this.temp.Role;
    this.fetchAll();
  }

  //open Model
  openModal(viewmodal: any, adminID: any) {
    this.modalService.open(viewmodal, { ariaLabelledBy: 'modal-basic-title' });
    this.Aservices.get_doctorDetail(adminID).subscribe({
      next: (data) => {
        this.doctorModal = data;
      },
    });
  }

  //open register doctor component
  openDocReg() {
    this.router.navigate(['/dashboard/view_doctors/reg_doctor']);
  }

  //open doctor edit form
  openEditComp(id: any) {
    console.log(id);
    this.router.navigate(['/dashboard/view_doctors/update_doctor/' + id]);
  }

  //Fetch All DOctors All Doctors List(L-Doctors)
  fetchAll() {
    if (this.Role === 'Admin') {
      this.Aservices.view_doctorslist().subscribe({
        next: (data) => {
          if (data != null) this.doctors = data;
          console.log(this.doctors);
        },
      });
    } else if (this.Role === 'Patient') {
      this.Aservices.view_doctorslist().subscribe({
        next: (data) => {
          this.doctors = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    else{
      console.log("You're not authorized to View this page");
    }
  }

  //Delete Doctor
  delete_doctor(id: any) {
    this.Aservices.delete_doctor(id).subscribe({
      next: (data: any) => {
        this.fetchAll();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
