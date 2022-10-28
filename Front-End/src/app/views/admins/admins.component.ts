import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  closeResult: string = '';
  public visible = false;
  admins: any;

  adminModal: any;

  constructor(
    private services: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchAll();
  }
  //open edit form
  openEditComp(id: any) {
    console.log(id);
    this.router.navigate(['/dashboard/view_admins/update_admin/', id]);
  }
  //open View Component
  openViewComp(id: any) {
    console.log(id);
    this.router.navigate(['/dashboard/view_admins/view_admin/', id]);
  }
  //open RegAdmin Component
  openRegComp() {
    this.router.navigate(['/dashboard/view_admins/reg_admin']);
  }

  //open Model
  openModal(viewmodal: any, adminID: any) {
    this.modalService.open(viewmodal, { ariaLabelledBy: 'modal-basic-title' });
    this.services.get_adminDetail(adminID).subscribe({
      next: (data)=>{
        this.adminModal=data;
      }
    })
  }

  //Get All Admins
  fetchAll() {
    this.services.view_adminslist().subscribe({
      next: (data) => {
        if (data !== null) this.admins = data;
        console.log(this.admins);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Delete Admin Details
  deleteAdmin(id: any) {
    this.services.delete_admin(id).subscribe({
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
