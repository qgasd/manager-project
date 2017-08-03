import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './update-password.component';
import {  UpdatePasswordRoutingModule } from './update-password-routing.module';
@NgModule({
  declarations: [
   UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    UpdatePasswordRoutingModule
  ]
})
export class UpdatePasswordModule { }
