import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { dashroutes } from './dashboard.routing';
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from '../menu/menu.component';
import { InterfaceComponent } from './interface/interface.component';
import { InterfaceService } from './interface/interface-service/interface-service';
import { InterfaceDetaileComponent } from './interface/interface-detaile/interface-detaile.component';
import { FormsModule } from '@angular/forms';
import { InterfaceRefrenceComponent } from './interface/interface-refrence/interface-refrence.component';
import { InterfaceInpd3Component } from './interface/interface-inpd3/interface-inpd3.component';
import { PaginationModule } from 'ng2-bootstrap/pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(dashroutes),
    PaginationModule.forRoot()
  ],
  declarations: [DashboardComponent,InterfaceInpd3Component,HomeComponent,MenuComponent, InterfaceComponent, InterfaceDetaileComponent,InterfaceRefrenceComponent ],
  providers:[InterfaceService]
})
export class DashboardModule { }
