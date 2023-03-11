import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LandlordComponent } from './landlord/landlord.component';
import { LoginComponent } from './login/login.component';
import { TenentComponent } from './tenent/tenent.component';
import { ViewItemComponent } from './view-item/view-item.component';

const routes: Routes = [
  {path:"", component: TenentComponent},
  {path:"login", component: LoginComponent},
  {path:"tenent", component: TenentComponent},
  {path:"landlord", component: LandlordComponent},
  {path:"cart", component: CartComponent},
  {path:"view", component:ViewItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
