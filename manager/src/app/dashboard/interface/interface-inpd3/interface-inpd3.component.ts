import { Component, OnInit,EventEmitter,ElementRef,HostListener,ViewChild,Renderer } from '@angular/core';
import {dIomock } from "../interface-mock-data/inputD3";
import { ActivatedRoute, Params,Router} from '@angular/router';
import { InterfaceService } from '../interface-service/interface-service';
import { ofInterface } from '../interface-mock-data/mock-data';
import * as d3 from "d3";

@Component({
  selector: 'app-interface-inpd3',
  templateUrl: './interface-inpd3.component.html',
  styleUrls: ['./interface-inpd3.component.css']
})
export class InterfaceInpd3Component implements OnInit {
  public selIdDate:ofInterface;
  public  inpid:number;
   public interfaceUrlss = "http://172.21.21.223:3000/interfaceRefrence/serach";
  constructor( private route:ActivatedRoute,public interfaceservice:InterfaceService) {
  //  this.route.params.forEach((params:Params) => {
  //     this.inpid = +params['id'];
  //     console.log(this.inpid);
  //   })

   }
@ViewChild('dcontainer')
private d3Container:ElementRef
  ngOnInit() {
   this.route.params.forEach((params:Params)=>{this.inpid = +params['id']})
       console.log(this.inpid)
  this.route.params.switchMap(
       (params:Params)=>this.interfaceservice.getSelId(+params['id']))
     .subscribe(selIdDate=>{this.selIdDate=selIdDate;console.log(this.selIdDate.int_service_num)})
   //这里还有什么方法可以直接的不用加号转换类型
  // xx();
}


}
