import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from "./dashboard.component";
import { InterfaceComponent } from './interface/interface.component';
import { BasicParameterComponent } from './basicParameter/basicParameter.component';
import { InterfaceDetaileComponent } from './interface/interface-detaile/interface-detaile.component';
import { InterfaceRefrenceComponent } from './interface/interface-refrence/interface-refrence.component';
import { InterfaceInpd3Component } from './interface/interface-inpd3/interface-inpd3.component';
export const dashroutes:Routes= [

    {
        path:"dashboard",component:DashboardComponent,
        children:[
            {path:'',redirectTo:"/home",pathMatch:'full'},
            //这里默认的是home这组件所以下面不写二级页面他默认的是home/detail所以在页面找interface是找不到的
            {path:'home',component:HomeComponent},
            {path:'interface',component:InterfaceComponent},
            {path:'basicParameter',component:BasicParameterComponent},
            {path:'interface/detail/:id',component:InterfaceDetaileComponent},
            {path:'interface/refrence/:id',component:InterfaceRefrenceComponent},
            {path:'interface/inputD3/:id',component:InterfaceInpd3Component} 
        ]  
    }
]