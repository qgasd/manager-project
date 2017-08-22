import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from "./dashboard.component";
import { InterfaceComponent } from './interface/interface.component';
import { BasicParameterComponent } from './basicParameter/basicParameter.component';
import { InterfaceDetaileComponent } from './interface/interface-detaile/interface-detaile.component';
import { InterfaceInpd3Component } from './interface/interface-inpd3/interface-inpd3.component';
// import {PermissionGuard} from '../guard/permission.guard';
// import { PostsComponent } from "app/dashboard/posts/posts.component";
// import { focuss } from "app/guard/focus.guard";
import { InterfaceIoComponent } from "app/dashboard/interface/interface-io/interface-io.component";
//import { AuthGuard } from "app/auth-guard.service";

//import { AuthGuard } from '../auth-guard.service';
export const dashroutes: Routes = [
    {
        path:"dashboard",component:DashboardComponent,
        //canActivate:[AuthGuard],
          //  canActivate:[PermissionGuard],  
      
        children:[
            {path:'',redirectTo:"/interface",pathMatch:'full'},
            //这里默认的是home这组件所以下面不写二级页面他默认的是home/detail所以在页面找interface是找不到的
            {path:'home',component:HomeComponent},
            {path:'interface',component:InterfaceComponent},//路由守卫，如果满足can里面的要求就访问这个网页
            {path:'basicParameter',component:BasicParameterComponent},
            {path:'interface/detail/:id',component:InterfaceDetaileComponent},
            {path:'interface/inputD3',component:InterfaceInpd3Component},
            {path:'interface/io/:id',component:InterfaceIoComponent}   
        ]  
    }
]