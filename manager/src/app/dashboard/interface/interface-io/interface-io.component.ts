import { Component, OnInit,EventEmitter,ElementRef,HostListener,ViewChild,Renderer } from '@angular/core';
import {Location} from "@angular/common";
import { ActivatedRoute, Params,Router} from '@angular/router';
import { InterfaceIoService } from "../interface-io/interfaceIo-service";
import { interfaceIO } from "../interface-mock-data/io";
@Component({
  selector: 'app-interface-io',
  templateUrl: './interface-io.component.html',
  styleUrls: ['./interface-io.component.css']
})
export class InterfaceIoComponent implements OnInit {
  interfaceservice: any;
  public id: number;
  public selIdDate2:interfaceIO;

  public ioinputdata:interfaceIO[];
  public iooutdata:interfaceIO[];
  constructor(public interfaceioservice:InterfaceIoService,public route:ActivatedRoute,public location :Location ) {

   }
  ngOnInit() {
    this.route.params.forEach((params:Params) => {
      this.id = +params['id'];
      console.log(this.id);
    })
  this.getSelection();
  }
   
  getSelection(){
    this.interfaceioservice.getSelect(this.id).subscribe(
      res => {
       console.log(res)
       this.ioinputdata= res['input'];
        console.log(this.ioinputdata)
        this.selIdDate2=res['input'][0];
        console.log(this.selIdDate2.int_name_en)
        
       this.iooutdata= res['output'];
       console.log(this.iooutdata);
      }

    )
  }
  goBack(){
    this.location.back()
  }

}
