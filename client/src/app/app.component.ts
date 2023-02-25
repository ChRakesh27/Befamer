import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BeFarmer';

  btnLeft:any="0px"
  tenent(){
    this.btnLeft="0px"
  }
  landlord(){
    this.btnLeft="110px"
  }
  login(){
    this.btnLeft="220px"
  }
 
}
