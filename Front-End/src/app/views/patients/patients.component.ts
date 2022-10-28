import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service'
import { AdminService } from '../services/admin.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patients: any;
  patientModal: any;
  constructor(
    private Pservices: PatientService,
    private Aservices: AdminService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchAll();
  }

  //open Model
  openModal(viewmodal: any, patientID: any) {
    this.modalService.open(viewmodal, { ariaLabelledBy: 'modal-basic-title' });
    this.Aservices.get_patientDetail(patientID).subscribe({
      next: (data) => {
        this.patientModal = data;
      },
    });
  }
  //open edit form
  openEditComp(id: any) {
    console.log(id);
    this.router.navigate(['/dashboard/view_patients/update_patient/', id]);
  }

  //Patient Methods
  

  //Admin Functions

  //Get All Doctors List As Admin
  fetchAll() {
    this.Aservices.view_patientslist().subscribe({
      next: (data) => {
        if (data != null) this.patients = data;
        console.log(this.patients);
      },
    });
  }

  //Delete Patient Details
  deletePatient(id: any) {
    console.log('delete metod called');
    this.Aservices.delete_patient(id).subscribe({
      next: (data: any) => {
        console.log(data.name + 'Deleted Successfully');
        this.fetchAll();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
