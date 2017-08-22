import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { dashroutes } from './dashboard.routing';
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from '../menu/menu.component';
import { InterfaceComponent } from './interface/interface.component';
import { InterfaceService } from './interface/interface-service/interface-service';
import { BasicParameterComponent } from './basicParameter/basicParameter.component';
import { BasicParameterService } from './basicParameter/basicParameter-service/basicParameter-service';
import { InterfaceDetaileComponent } from './interface/interface-detaile/interface-detaile.component';
import { FormsModule } from '@angular/forms';
//import { PaginationModule } from 'ngx-bootstrap/pagination';
import { InterfaceInpd3Component } from './interface/interface-inpd3/interface-inpd3.component';
//import { PermissionGuard } from "app/guard/permission.guard";
//  import { focuss } from "app/guard/focus.guard";  
//  import { PostsComponent } from "app/dashboard/posts/posts.component";
  import { MenuService } from "app/menu/menu.service/menu.service";
//  import { selectDatasService } from "app/common-service/select-service";
  import { InterfaceIoService } from "app/dashboard/interface/interface-io/interfaceIo-service";
  import { InterfaceIoComponent } from "app/dashboard/interface/interface-io/interface-io.component";
//import { InterfaceDirective } from './interface/interface.directive';

  @NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(dashroutes),
  ],
  declarations: [DashboardComponent,HomeComponent,MenuComponent, InterfaceComponent, BasicParameterComponent,InterfaceDetaileComponent, InterfaceInpd3Component,InterfaceIoComponent],
  providers:[InterfaceService,MenuService,InterfaceIoService,BasicParameterService]
})
export class DashboardModule { }
