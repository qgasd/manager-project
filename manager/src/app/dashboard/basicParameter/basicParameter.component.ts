import { Component, OnInit } from '@angular/core';
import { ofBasicParameter } from './basicParameter-mock-data/mock-data';
import { BasicParameterService } from './basicParameter-service/basicParameter-service';
@Component({
  selector: 'app-basicParameter',
  templateUrl: './basicParameter.component.html',
  styleUrls: ['./basicParameter.component.css']
})
export class BasicParameterComponent implements OnInit {
    public basicdatas:ofBasicParameter[];
   constructor(private basicParameterservice: BasicParameterService) { 
  
   }

  /**
   *新增
  */
  addSave(addDatas:ofBasicParameter):void{
    if(!addDatas){return}
      this.basicParameterservice.AddDatas(addDatas)
    .then(ofBasicParameter=>{this.basicdatas.push(ofBasicParameter);location.reload();console.log(addDatas),console.log(this.basicdatas)})
    location.reload();
  }

/**
 *获取全部的东西
 */
  getALLdata() {
    this.basicParameterservice.getSdate().subscribe(res => {     
       this.basicdatas = res;  
    }, error => { console.log(error) },
      () => { }
    )
  }

   /**
 *删除
 */
 deleteInt(basic: ofBasicParameter):void { 
    this.basicParameterservice.deleteInt(basic.ID).then(()=>
     this.basicdatas = this.basicdatas.filter(h => h !== basic)
    )
    location.reload();
}

   /**
    *初始化实现的方法
    */
  ngOnInit():void {
    this.getALLdata();
  }


}
