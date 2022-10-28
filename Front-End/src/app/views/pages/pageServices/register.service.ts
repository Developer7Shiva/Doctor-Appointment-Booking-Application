import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  ApiUrl = "/api/patient/"
  constructor(private http: HttpClient) {}

  //New patient Registration
  regPatient(body: any) {
    console.log('register Patient Called');
    return this.http.post(
      this.ApiUrl + 'reg_patient',
      body
    );
  }
}
