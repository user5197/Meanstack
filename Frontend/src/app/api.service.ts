import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
baseUrl:string="http://localhost:3000"
  constructor(private http:HttpClient) { }

  allapp() {
    return new Promise((resolve,reject) => {
      this.http.get(this.baseUrl+"/allappointment").subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  book(data) {
    return new Promise((resolve,reject) => {
      this.http.post(this.baseUrl+"/appointment",data).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }

  patientapp(d) {
    return new Promise((resolve,reject) => {
      this.http.post(this.baseUrl+"/patient",d).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      })
    })
  }
}
