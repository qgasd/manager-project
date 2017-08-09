import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router} from '@angular/router';
import { InterfaceService } from '../interface-service/interface-service';
import { ofInterface } from '../interface-mock-data/mock-data';
@Component({
  selector: 'app-interface-refrence',
  templateUrl: './interface-refrence.component.html',
  styleUrls: ['./interface-refrence.component.css']
})
export class InterfaceRefrenceComponent implements OnInit {
  public selIdDate:ofInterface;
  constructor(  private route:ActivatedRoute,public interfaceservice:InterfaceService) { }
 //这里是activatedRoute
  ngOnInit():void {
  this.route.params.switchMap((params:Params)=>this.interfaceservice.getSelId(+params['id'])).subscribe(selIdDate=>this.selIdDate=selIdDate)
  }

}
