import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent implements OnInit {
  getdata: any = [];
  getRegData: any = [];
  islogin: any;
  UserName: any;
  Email: any;
id:any;
  imageBase64!: string;

  displayStyle: any = "none";


  cartform!: FormGroup;
  userform!: FormGroup;

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    let abc: any = localStorage.getItem('loged');

    if (abc !== null) {
      this.islogin = JSON.parse(abc);
      this.UserName = this.islogin.username;
      this.Email = this.islogin.email;
      this.id=this.islogin.id;
    }
    //------------------ Getting data ----------------------------------
 
    // this.service.getAllLand(this.id).subscribe((res) => {
    //   this.getdata=res.data.filter((ele:any)=> ele.id==this.id);
    //   this.getRegData=res.data.filter((ele:any)=> ele.registered==this.Email);
    // })
 
    this.service.getAllLand(this.id).subscribe((res) => {
      this.getdata=res.data;
    })
 
    this.service.getAllLand(this.Email).subscribe((res) => {
      this.getRegData=res.data;
    })

    this.cartform = new FormGroup({
      id: new FormControl(this.id, Validators.required),
      area: new FormControl('', Validators.required),
      soil: new FormControl('', Validators.required),
      surveyno: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required)
    })

    this.userform = new FormGroup({
      isavailable: new FormControl('', Validators.required),
      registered: new FormControl('', Validators.required),
      surveyno: new FormControl('', Validators.required),
    })

  }

  updatePopup(data: any) {
    this.displayStyle = data;
  }

  onSelectImg(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageBase64 = event.target.result
        fetch(event.target.result)
          .then(res => res.blob())
          .then(res => this.cartform.patchValue({ img: res }))
          .catch(err => console.log({ err }))

      }
    }
  }


  onSubmitLandInfo() {
    
    //------------------ Updating the land when u " Submit "----------------------------------
    this.cartform.patchValue({ email: this.Email })
    // this.cartform.patchValue({ img: 'l1.jpg'})
    console.log(this.cartform.value.img)
    if (this.cartform.valid) {
      this.service.createData(this.cartform.value, 'land').subscribe(() => {
        this.getdata.push(this.cartform.value);
        this.displayStyle = "none";
        this.cartform.reset();
      });
    }
  }

onRemoveLand(data:any){
this.getdata = this.getRegData.filter((element: any) => element.surveyno !== data );
  this.service.getDeleteLand(data).subscribe((res) => { })
}

  //------------------ Updating the land when u " Reject "----------------------------------
  LandReject(data: any) {

    this.getRegData = this.getRegData.filter((element: any) => { return element.surveyno !== data });
    this.userform.value.surveyno = data;
    this.userform.value.isavailable = true;
    this.userform.value.registered = 'none';
    this.service.updateLand(this.userform.value).subscribe((res) => { })
    this.userform.reset();



  }
}
