import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  private GlobalUrl = 'http://localhost:3000/api';
  private ApiUrl = this.GlobalUrl + 'patient';

  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  requestOptions = { headers: this.headers };

  constructor(private http: HttpClient) {}

  //New patient Registration
  regPatient(body: any) {
    // console.log('register Patient Called');
    return this.http.post(
      this.GlobalUrl + '/patient/reg_patient',
      body,
      this.requestOptions
    );
  }

  //Login Patient
  loginPatients(body: any): Observable<any> {
    // console.log('Login Patient Method Invoked');
    return this.http.post(
      this.GlobalUrl+'/login',
      body
    );
  }

  //login Admin
  loginAdmins(body:any): Observable <any> {
    //console.log("Admin Login Method Invoked")
    return this.http.post(
      this.GlobalUrl+'/admin/login',
      body
    );
  }

  //login Doctor
  loginDoctor(body:any): Observable <any> {
    return this.http.post(
      this.GlobalUrl+'/doctor/login',
      body)
  }

  //Single Login for All
}
