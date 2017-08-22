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
   // public flag2 = false;//状态码
    public flag1 = true;
    //public flag4 = false;
    //public flag5 = false;
    public flag3 = false;//这是单条件查询的
    public zbdatas: ofBasicParameter[];//这是多条件查询的数据
    public jkfwdata:string;
   
 /**
   * 分页参数
   */
  public totalItems: number =  this.totalItems; //所有数据
  //public maxSize:number = 10;
  public currentPage: number = 1;//当前页
  //public smallnumPages: number = 0;
  public itemsPerPage:number = 10;//当前选择10条一页
  //public eventData:any;
  public choosedata:ofBasicParameter;
  constructor(private basicParameterservice: BasicParameterService) { 
  
   }

/**
 *多条件查询
 */
  advanceSearch(cc: ofBasicParameter) {
    this.choosedata = cc;
    this.basicParameterservice.gadsearch(cc).subscribe(res=>{
      this.zbdatas =res['items'];
     if(this.zbdatas && this.basicdatas ){
       this.basicdatas = this.zbdatas;
       this.totalItems =res['total']  
      console.log(this.basicdatas)
    }
      console.log(this.totalItems)});
        this.flag1 =!this.flag1;
  }

  /**
   *新增
  */
  addSave(addDatas:ofBasicParameter):void{
    if(!addDatas){return}
    if(addDatas.Parent==undefined){
     addDatas.Parent="";
   }
      this.basicParameterservice.AddDatas(addDatas)
    .then(ofBasicParameter=>{this.basicdatas.push(ofBasicParameter);
    location.reload();
  })
    location.reload();
  }

/**
 *获取全部的东西
 */
  getALLdata() {
    let offset = (this.currentPage-1)*this.itemsPerPage;//分页中的开头
		let end = (this.currentPage)*this.itemsPerPage;//分页中的结尾
    this.basicParameterservice.getSdate().subscribe(res => {     
       this.basicdatas = res;
       this.basicdatas = res['items'].slice(offset,end>this.totalItems?this.totalItems:end);
                this.totalItems = res['total'];
    }, error => { console.log(error) },
      () => { }
    )
  }

/** 
 * 分页
 */
	public loadData(){  
		let offset = (this.currentPage-1)*this.itemsPerPage;
		let end = (this.currentPage)*this.itemsPerPage;
   if(this.flag1){
            console.log(this.flag1)
    return this.basicParameterservice.getSdate().subscribe(
        res=>{
        this.basicdatas=res['items'].slice(offset,end>this.totalItems?this.totalItems:end);
        },
        error => {console.log(error)},
        () => {}
      );  
   }else if(this.flag3 && this.flag1){
      console.log(this.flag1)
    return this.basicParameterservice.searchIn(this.jkfwdata).subscribe(
            res=>{
            this.basicdatas=this.basicdatas.slice(offset,end>this.totalItems?this.totalItems:end);
            },
            error => {console.log(error)},
            () => {}
          );
   }else{
     console.log(this.flag1)
    return this.basicParameterservice.gadsearch(this.choosedata).subscribe(
            res=>{
            this.basicdatas=this.basicdatas.slice(offset,end>this.totalItems?this.totalItems:end);
            },
            error => {console.log(error)},
            () => {}
          );
   }	
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


   public pageChanged(event: any): void {
      this.currentPage = event.page;
      console.log(this.currentPage)
      console.log('Page changed to: ' + event.page);
      console.log('Number items per page: ' + event.itemsPerPage);   
  }


}
