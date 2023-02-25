import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  BASEURL = "http://localhost:3000/api";
  isloged=false;
  constructor(private _http: HttpClient) { }

  getAllData(table: any): Observable<any> {
    const apiurl = this.BASEURL + '/getUsers/' + table;
    return this._http.get(apiurl);
  }
  getAllLand(): Observable<any> {
    const apiurl = this.BASEURL + '/getAllLand/';
    return this._http.get(apiurl);
  }

  createData(data: any, id: any): Observable<any> {
    const apiurl = this.BASEURL + '/insertUser/' + id
    return this._http.post(apiurl, data);
  }
  updateLand(data: any): Observable<any> {
    const apiurl = this.BASEURL + '/updateLand';
    return this._http.put(apiurl, data);
  }


}
