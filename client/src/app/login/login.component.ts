import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  edit: any = true;
  Email: any = '';
  Password: any = '';
  UserName: any;
  phoneNo: any;
  userform: any;
  userLogin: any;
  file: any;

  ngOnInit(): void {
    this.userform = new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', Validators.required),
      phone: new FormControl(Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      profileImg: new FormControl('../../assets/images/login.jpg')
    })

    this.userLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })

    let isLoggedIn: any = localStorage.getItem('loged');
    if (!!isLoggedIn) {
      let islogin = JSON.parse(isLoggedIn);
      this.login(islogin.email, islogin.password);
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
    // console.log("🚀 ~ file", this.file.name)
  }

  loginbtn(btnLeft: any, loginLeft: any, registerLeft: any) {
    this.btnLeft = btnLeft;
    this.loginLeft = loginLeft;
    this.registerLeft = registerLeft;
  }

  //------------------  when u " login btn "----------------------------------

  login(email: any, password: any) {
    this.service.LoginDel(email, password).subscribe((res) => {
      if (res.data[0] !== undefined) {
        let data = { id: res.data[0].id, username: res.data[0].username, email: res.data[0].email, phone: res.data[0].phone, password: res.data[0].password };
        localStorage.setItem("loged", JSON.stringify(data));
        this.loginLeft = "450px";
        this.registerLeft = "450px";
        this.loginDisplay = 'none';
        this.logoutDisplay = 'block';
        this.UserName = res.data[0].username;
        this.Email = res.data[0].email;
        this.phoneNo = res.data[0].phone;
      }
    })
  }

  //------------------ when u " register btn "----------------------------------

  register() {
    if (this.userform.value.email.endsWith("@gmail.com")) {
      this.service.createData(this.userform.value, 'login').subscribe((res) => {
        this.login(this.userform.value.email, this.userform.value.password);
      });
    }
  }

  updateLogin() {
    this.service.LoginUpdate(this.userform.value).subscribe((res) => {
      this.login(res.data[0].email, res.data[0].password);
    })
  }

  editMode(data: any) {
    let isLoggedIn: any = localStorage.getItem('loged');
    let islogin = JSON.parse(isLoggedIn);

    this.userform = new FormGroup({
      id: new FormControl(islogin.id),
      username: new FormControl(islogin.username, Validators.required),
      phone: new FormControl(islogin.phone, Validators.required),
      email: new FormControl(islogin.email, Validators.required),
      password: new FormControl(islogin.password, Validators.required),
      profileImg: new FormControl('../../assets/images/login.jpg')
    })

    if (data) {
      this.registerLeft = "450px";
      this.loginDisplay = 'none';
      this.logoutDisplay = 'block';
    } else {
      this.edit = false;
      this.registerLeft = '50px';
      this.loginDisplay = 'block';
      this.logoutDisplay = 'none';
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
    this.userLogin.reset();

  }


}
