import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss'],
})
export class EditAdminComponent implements OnInit {
  title = 'Edit Admin Details';
  updateinfo: any;

  name: any;
  email: any;
  phone: any;
  gender: any;

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
    this.services.get_adminDetail(this.id).subscribe({
      next: (data: any) => {
        console.log("data: ",data);
        
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.gender = data.gender;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onAdminUpdate(val: NgForm) {
    console.log(val.form.value);
    this.updateinfo = val.form.value;
    this.services.edit_admin(this.id, this.updateinfo).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.router.navigate(['/dashboard/view_admins']);
  }
}
