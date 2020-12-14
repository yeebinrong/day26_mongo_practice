import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  // get countrys
  apiGetCountry() {
    return this.http.get('/country').toPromise()
  }

  apiGetDetail(code:string) {
    return this.http.get('/country/' + code).toPromise()
  }
}
