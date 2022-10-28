import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private GlobalUrl = 'http://localhost:3000/api';
  private ApiUrl = this.GlobalUrl + '/admin';

  constructor(private http: HttpClient) {}

  view_doctorslist() {
    return this.http.get(this.ApiUrl + '/view_doctors');
  }

}
