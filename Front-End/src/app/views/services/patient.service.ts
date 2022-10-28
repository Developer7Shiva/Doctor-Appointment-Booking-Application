import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private GlobalUrl = 'http://localhost:3000/api';
  private ApiUrl = this.GlobalUrl + '/patient';

  constructor(private http: HttpClient) {}

  //view patient profile
  view_profile() {
    return this.http.get(this.ApiUrl + '/profile');
  }

  //view doctors
  view_doctorslist(){
    return this.http.get(this.ApiUrl+"/view_doctors");
  }

  //view doctor
  get_doctorDetails(id:any){
    return this.http.get(this.ApiUrl+"/view_doctor/"+id);
  }

  // //Edit Patient
  edit_patient(id: any, body: any) {
    return this.http.put(this.ApiUrl + '/update_patient/' + id, body);
  }

  // //delete Patient
  delete_patient(id: any) {
    return this.http.delete(this.GlobalUrl + '/delete_patient/' + id);
  }

  //Appointments Operations

  //Booking Appointment
  new_appointment(body:any) {
    return this.http.post(this.ApiUrl+"/book_appoint",body)
  }

  //view all appointments
  view_appointments() {
    return this.http.get(this.ApiUrl+'/view_appointments');
  }

  //view single appointment using id
  view_appointment(id: any) {
    return this.http.get(this.ApiUrl+"/view_appointment/"+id);
  }

  //update appointment using params id
  update_appointment(id: any, body: any) {
    return this.http.put(this.ApiUrl+"/update_appointment/"+id,body);
  }

  //delete appointment using params id
  delete_appointment(id: any) {
    return this.http.delete(this.ApiUrl+"/delete_appointment/"+id);
  }


}
