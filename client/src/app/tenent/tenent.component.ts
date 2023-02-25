import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-tenent',
  templateUrl: './tenent.component.html',
  styleUrls: ['./tenent.component.css']
})
export class TenentComponent implements OnInit {
  getdata: any = [];
  islogedin: any = false;
  Email: any;
  abc: any = localStorage.getItem('loged');
  constructor(private service: ServicesService) {

  }

  ngOnInit(): void {

    //------------------getting data ----------------------------------

    this.service.getAllLand().subscribe((res) => {
      let i = 0;
      while (this.getdata.length < 4) {
        if (this.Email !== undefined && res.data[i].email !== this.Email) {
          this.getdata.push(res.data[i]);
        }
        i++;
      }

    })
    if (this.abc !== null) {
      this.islogedin = true;
      let islogin = JSON.parse(this.abc);
      this.Email = islogin.email;
    }
  }
  userform = new FormGroup({
    isavailable: new FormControl(),
    registered: new FormControl(),
    surveyno: new FormControl(),

  })
  //------------------ Updating the land when u " apply "----------------------------------

  updatedata(data: any) {
    this.getdata = this.getdata.filter((element: any) => { return element.surveyno !== data });
    this.userform.value.surveyno = data;
    this.userform.value.isavailable = false;
    this.userform.value.registered = this.Email;
    this.service.updateLand(this.userform.value).subscribe((res) => { })
    this.userform.reset();
  }
}
