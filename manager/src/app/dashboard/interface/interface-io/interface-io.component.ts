import { Component, OnInit,EventEmitter,ElementRef,HostListener,ViewChild,Renderer } from '@angular/core';
import {Location} from "@angular/common";
import { ActivatedRoute, Params,Router} from '@angular/router';
import { InterfaceIoService } from "../interface-io/interfaceIo-service";
import { interfaceIO } from "../interface-mock-data/io";
import { FormsModule } from '@angular/forms';
import { Subject }     from 'rxjs/Subject';
import { Observable }  from 'rxjs/Observable';
@Component({
  selector: 'app-interface-io',
  templateUrl: './interface-io.component.html',
  styleUrls: ['./interface-io.component.css']
})
export class InterfaceIoComponent implements OnInit {
  public id : number;
  public ioinputdata:interfaceIO[];
  public iooutdata:interfaceIO[];
  public addatas:interfaceIO[];
  constructor(public interfaceioservice:InterfaceIoService,public route:ActivatedRoute,public location :Location ) { } 
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
        console.log (res['input']);
       this.ioinputdata= res['input'];
        console.log(this.ioinputdata)
       this.iooutdata= res['output'];
       console.log(this.iooutdata);
      }

    )
  }
  goBack(){
    this.location.back()
  }

  //新增
  addSave(addDatas:interfaceIO):void{
    console.log("数据："+JSON.stringify(addDatas));
    if(!addDatas){return}
    this.interfaceioservice.AddDatas(addDatas)
  .then(interfaceIO=>{this.addatas.push(interfaceIO);
    location.reload();
    console.log(addDatas);
    console.log(this.addatas);
  })
  location.reload();
 }
}
