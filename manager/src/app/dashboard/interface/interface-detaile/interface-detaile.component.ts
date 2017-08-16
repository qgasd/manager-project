import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router} from '@angular/router';
import { InterfaceService } from '../interface-service/interface-service';
import { ofInterface } from '../interface-mock-data/mock-data';
import * as d3 from 'd3';
@Component({
  selector: 'app-interface-detaile',
  templateUrl: './interface-detaile.component.html',
  styleUrls: ['./interface-detaile.component.css']
})
export class InterfaceDetaileComponent implements OnInit {
  public selIdDate:ofInterface;
  constructor(  private route:ActivatedRoute,public interfaceservice:InterfaceService) { }
 //这里是activatedRoute
  ngOnInit():void {
  this.route.params.switchMap((params:Params)=>this.interfaceservice.getSelId(+params['id'])).subscribe(selIdDate=>this.selIdDate=selIdDate)
  console.log(this.selIdDate)
}
 
}
