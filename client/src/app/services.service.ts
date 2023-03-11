import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  BASEURL = "http://localhost:3000/api";
  isloged=false;
  selectItem:any;
  constructor(private _http: HttpClient) { }
  setItem(data:any) {
    this.selectItem =data;
  }
  getItem(){
    return this.selectItem;
  }
  getAllLand(id:any): Observable<any> { 
    const apiurl = this.BASEURL + '/getAllLand/' + id;
    return this._http.get(apiurl);
  }

  getDeleteLand(id:any): Observable<any> { 
    const apiurl = this.BASEURL + '/getDeleteLand/' + id;
    return this._http.delete(apiurl);
  }
  
  getUnRegLand(id:any): Observable<any> { 
    const apiurl = this.BASEURL + '/getUnRegLand/'+ id;
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

  LoginDel(emailid:any, password:any): Observable<any> {
    const apiurl = this.BASEURL + '/isloged/'+ emailid + '/'+password ;
    return this._http.get(apiurl);
 }

 LoginUpdate(data :any): Observable <any> {
  const apiurl = this.BASEURL +'/updateLogin';
  return this._http.put(apiurl, data)
 }
}
 