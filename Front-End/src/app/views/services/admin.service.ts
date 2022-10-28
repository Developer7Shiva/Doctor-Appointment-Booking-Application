import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private GlobalUrl = 'http://localhost:3000/api';
  private ApiUrl = this.GlobalUrl + '/admin';

  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  requestOptions = { headers: this.headers };

  constructor(private http: HttpClient) {}

  //Admins Operations

  create_admin(body: any) {
    return this.http.post(this.ApiUrl + '/reg_admin', body);
  }

  view_adminslist() {
    return this.http.get(this.ApiUrl + '/view_admins');
  }

  view_profile() {
    return this.http.get(this.ApiUrl + '/view_profile');
  }

  get_adminDetail(id: any) {
    return this.http.get(this.ApiUrl + '/view_admin/' + id);
  }

  edit_admin(id: any, body: any) {
    console.log('Edit Admin Called...');
    return this.http.put(this.ApiUrl + '/update_admin/' + id, body);
  }

  delete_admin(id: any) {
    return this.http.delete(this.ApiUrl + '/delete_admin/' + id);
  }

  //Doctors Operations

  create_doctor(body: any) {
    return this.http.post(this.ApiUrl + '/reg_doctor', body);
  }

  view_doctorslist() {
    return this.http.get(this.ApiUrl + '/view_doctors');
  }

  get_doctorDetail(id: any) {
    return this.http.get(this.ApiUrl + '/view_doctor/' + id);
  }

  edit_doctor(id: any, body: any) {
    return this.http.put(this.ApiUrl + '/update_doctor/' + id, body);
  }

  delete_doctor(id: any) {
    return this.http.delete(this.ApiUrl + '/delete_doctor/' + id);
  }

  //Patients Operations
  // view_patientlist(){
  //   return this.http.get(this.ApiUrl+'/view_patients');
  // }

  view_patientslist() {
    return this.http.get(this.ApiUrl + '/view_patients');
  }

  get_patientDetail(id: any) {
    return this.http.get(this.ApiUrl + '/view_patient/' + id);
  }

  edit_patient(id: any, body: any) {
    return this.http.put(this.ApiUrl + '/update_patient/' + id, body);
  }

  delete_patient(id: any) {
    console.log("delete service called");
    return this.http.delete(this.ApiUrl + '/delete_patient/' + id);
  }
}
