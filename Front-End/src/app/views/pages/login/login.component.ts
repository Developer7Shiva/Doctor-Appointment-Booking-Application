import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private services: PagesService, private router: Router) {}

  login(){
    if(true){
      this.services.loginPatients(this.loginForm.value).subscribe({
        next: (data)=>{
          if(data!=null) {
            // console.log(data.AccessToken);
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ token: data.AccessToken, Name: data.Name,Role: data.Role })
            );
            console.log("Fetched from Local Storage:"+localStorage.getItem('currentUser'));
            this.loginForm.reset();
            this.router.navigate(['/dashboard'])
          }
        }
      })
    }
  }
}
