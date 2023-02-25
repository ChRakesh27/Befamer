import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LandlordComponent } from './landlord/landlord.component';
import { LoginComponent } from './login/login.component';
import { TenentComponent } from './tenent/tenent.component';

const routes: Routes = [
  {path:"", component: TenentComponent},
  {path:"login", component: LoginComponent},
  {path:"tenent", component: TenentComponent},
  {path:"landlord", component: LandlordComponent},
  {path:"cart", component: CartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
