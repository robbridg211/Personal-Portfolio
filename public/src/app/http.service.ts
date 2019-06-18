import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  sendEmail(url, data) {
    console.log("From Service: " , data)
    return this._http.post(url, data);
  }
}
