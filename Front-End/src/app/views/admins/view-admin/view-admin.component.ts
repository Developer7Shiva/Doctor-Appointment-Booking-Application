import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.scss'],
})
export class ViewAdminComponent implements OnInit {
  name: any;
  email: any;
  phone: any;
  gender: any;

  constructor(
    private router: Router, 
    private services: AdminService) {}

  ngOnInit(): void {
      this.onStart();
  }

  backToView(){
    this.router.navigate(['/dashboard']);
  }

  //To Load a Clicked User details
  onStart() {
    console.log('On Start Executed..');
    this.services.view_profile()
      .subscribe({
        next: (data: any) => {
          console.log(data);
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

}
