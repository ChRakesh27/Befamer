import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  getdata: any = [];
  Email: any;
  islogedin: boolean = false;
  constructor(private service: ServicesService) {
  }

  ngOnInit(): void {
    
 //------------------ Getting data ----------------------------------
    this.service.getAllLand().subscribe((res) => {
      for (let i of res.data) {
        if (i.isavailable == true && i.email!==this.Email) {
          this.getdata.push(i);
        }
      }
    })
    let abc: any = localStorage.getItem('loged');
    if (abc !== null) {
      this.islogedin = true
      let islogin = JSON.parse(abc);
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
    this.getdata = this.getdata.filter((element:any ) =>{return element.surveyno!==data})
    this.userform.value.surveyno = data;
    this.userform.value.isavailable = false;
    this.userform.value.registered = this.Email;  
    this.service.updateLand(this.userform.value).subscribe((res) => { })
    this.userform.reset();
  }
}
