import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service: ServicesService) { }

  getdata: any = [];
  id: any;
  ngOnInit(): void {
   

    //------------------ Getting data ----------------------------------
    this.service.getUnRegLand(this.id).subscribe((res) => {
      this.getdata = res.data;
    })

  }

  selItem(data:any){
    this.service.setItem(data);
  }
}
 