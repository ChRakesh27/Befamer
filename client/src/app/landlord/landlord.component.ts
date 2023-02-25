import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent implements OnInit {
  getdata: any = [];
  getRegData: any = [];
  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    let abc: any = localStorage.getItem('loged');

    if (abc !== null) {
      this.islogin = JSON.parse(abc);
      this.UserName = this.islogin.username;
      this.Email = this.islogin.email;
    }
    //------------------ Getting data ----------------------------------

    this.service.getAllLand().subscribe((res) => {
      for (let i of res.data) {
        if (i.email == this.Email) {
          this.getdata.push(i);
        }
        if (i.registered == this.Email) {
          this.getRegData.push(i);
        }
      }
    })


  }
  islogin: any;
  UserName: any;
  Email: any;

  displayStyle: any = "none";

  //------------------ Updating the land when u " close model-box "----------------------------------

  updatePopup(data: any) {
    this.displayStyle = data;
  }

  cartform = new FormGroup({

    email: new FormControl(),
    area: new FormControl(),
    soil: new FormControl("Open this select Soil"),
    surveyno: new FormControl(),
    amount: new FormControl(),
    district: new FormControl(),
    img: new FormControl()
  })

  onSelectImg(e:any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.cartform.value.img = event.target.result;
      }
    }
  }
  
  
  GiveLand() {
    
    //------------------ Updating the land when u " Submit "----------------------------------
    this.cartform.value.email = this.Email;
    console.log("🚀 ~ this.cartform.value.img", this.cartform.value.img)

    if (this.cartform.value.email != '' && this.cartform.value.area != '' && this.cartform.value.soil != '' && this.cartform.value.surveyno != '' && this.cartform.value.amount != '' && this.cartform.value.district != '' && this.cartform.value.img != '') {

      this.displayStyle = "none";
      this.service.createData(this.cartform.value, 'land').subscribe((res) => {
      });
    }
    this.cartform.reset();
  }
  userform = new FormGroup({
    isavailable: new FormControl(),
    registered: new FormControl(),
    surveyno: new FormControl(),


  })



  //------------------ Updating the land when u " Reject "----------------------------------
  updatedata(data: any) {

    this.getRegData = this.getRegData.filter((element: any) => { return element.surveyno !== data });
    this.userform.value.surveyno = data;
    this.userform.value.isavailable = true;
    this.userform.value.registered = 'none';
    this.service.updateLand(this.userform.value).subscribe((res) => { })
    this.userform.reset();



  }
}
