import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  Email: any;
  id: any;
  islogedin: boolean = false;
  
  constructor(private service: ServicesService) { }
  selectItem:any;
  userform = new FormGroup({
    isavailable: new FormControl(),
    registered: new FormControl(),
    surveyno: new FormControl(),

  })
  ngOnInit(): void {
    let logDel = localStorage.getItem('loged');
    console.log("🚀 ~ logDel:", logDel)
    if (logDel !== null) {
      
      this.islogedin = true;
      let islogin = JSON.parse(logDel);
      this.Email = islogin.email;
      this.id = islogin.id;
    }

    this.selectItem = this.service.getItem();
    console.log("🚀 ~ this.selectItem:", this.selectItem)
    
  }

  updatedata(data: any) {
    // this.getdata = this.getdata.filter((element: any) => { return element.surveyno !== data })
    this.userform.value.surveyno = data;
    this.userform.value.isavailable = false;
    this.userform.value.registered = this.Email;
    this.service.updateLand(this.userform.value).subscribe((res) => { })
    this.userform.reset();
  }

}
