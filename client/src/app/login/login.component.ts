
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ServicesService) { }


  logoutDisplay: any = 'none';
  loginDisplay: any = 'block';
  btnLeft: any = "0px";
  loginLeft: any = "50px";
  registerLeft: any = "450px";
  Email: any = '';
  Password: any = '';
  getdata: any = {};
  isValid: any = false;
  UserName: any;
  phoneNo: any;
  userform: any;
  islogin: any;
  file: any;

  ngOnInit(): void {
    this.userform = new FormGroup({
      username: new FormControl(''),
      phone: new FormControl(),
      email: new FormControl(''),
      password: new FormControl(''),
      profileImg: new FormControl('../../assets/images/login.jpg')
    })


    //------------------ Getting data ----------------------------------

    this.service.getAllData('login').subscribe((res) => {
      this.getdata = res.data;
    })

    let abc: any = localStorage.getItem('loged');

    if (abc !== null) {
      this.loginLeft = "450px";
      this.registerLeft = "450px";
      this.loginDisplay = 'none';
      this.logoutDisplay = 'block';
      this.islogin = JSON.parse(abc);
      this.UserName = this.islogin.username;
      this.phoneNo = this.islogin.phone;
      this.Email = this.islogin.email;
    }

  }

  onSelectImg(e: any) {
    // if (e.target.files) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(e.target.files[0]);
    //   reader.onload = (event: any) => {
    //      this.userform.value.profileImg = event.target.result;
    //     console.log("🚀 ~  this.userform.value.profileImg", event.target.result)
    //   }
    // }
    this.file = e.target.files ? e.target.files[0] : '';
    console.log("🚀 ~ file", this.file.name)

  }
  emailId(eventData: any) {
    this.Email = eventData.target.value;
  }
  password(eventData: any) {
    this.Password = eventData.target.value;
  }

  loginbtn(btnLeft: any, loginLeft: any, registerLeft: any) {
    this.btnLeft = btnLeft;
    this.loginLeft = loginLeft;
    this.registerLeft = registerLeft;
  }

  //------------------  when u " login btn "----------------------------------

  login() {

    for (let i of this.getdata) {
      if ((i.email == this.Email || i.username == this.Email) && i.password == this.Password) {
        let data = { username: i.username, email: i.email, phone: i.phone, password: i.password };

        localStorage.setItem("loged", JSON.stringify(data));
        this.loginLeft = "450px";
        this.registerLeft = "450px";
        this.loginDisplay = 'none';
        this.logoutDisplay = 'block';
        this.UserName = i.username;
        this.phoneNo = i.phone;
        this.Email = i.email;

      }
    }
  }
  //------------------ when u " register btn "----------------------------------

  register() {

    if (this.userform.value.userName != '' && this.userform.value.phone != 0 && this.userform.value.email.endsWith("@gmail.com") && this.userform.value.password != '') {
      let data = { username: this.UserName, email: this.Email, phone: this.phoneNo, password: this.password };
      localStorage.setItem("loged", JSON.stringify(data));
      this.service.createData(this.userform.value, 'login').subscribe((res) => {
        this.loginLeft = "450px";
        this.registerLeft = "450px";
        this.loginDisplay = 'none';
        this.logoutDisplay = 'block';
        this.UserName = this.userform.value.username;
        this.phoneNo = this.userform.value.phone;
        this.Email = this.userform.value.email;
      });
    }
  }
  //------------------  when u " logout btn "----------------------------------


  logout() {
    localStorage.removeItem("loged");
    this.btnLeft = "0px";
    this.loginLeft = "50px";
    this.loginDisplay = 'block';
    this.logoutDisplay = 'none';
    this.UserName = '';
    this.phoneNo = '';
    this.Email = '';
    this.userform.reset();

  }





}
function output() {
  throw new Error('Function not implemented.');
}

