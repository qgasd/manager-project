import { Component, OnInit } from '@angular/core';
import { ofInterface } from './interface-mock-data/mock-data';
import { InterfaceService } from './interface-service/interface-service';
import { FormsModule } from '@angular/forms';
import { Subject }           from 'rxjs/Subject';
import { Observable }        from 'rxjs/Observable';
import { Location }               from '@angular/common';
@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
  public interdatas:ofInterface[];
  public zbdatas: ofInterface[];//这是多条件查询的数据
 // public cdatas:Observable<ofInterface[]>;//这是单条件搜索的数据
  public cdatass:ofInterface[];//这是单条件搜索的数据
  public flag2 = false;//状态码
  public seardata: ofInterface[];//获取全部的数据
  public selId: ofInterface[];//选中相对应的id
private searchTerms = new Subject<string>();//获取subject对象

/**
 * 分页参数
 */
  public totalItems: number =  this.totalItems; //所有数据
  public maxSize:number = 10;
  public currentPage: number = 1;//当前页
  public smallnumPages: number = 0;
  public itemsPerPage:number = 1;//当前选择10条一页
  public eventData:any;
//实现对象的观察1
  constructor(public interfaceservice: InterfaceService,public location:Location) { 
  
  }
/**
 *搜索一个
 */
/**
 * 需不需要判断当单选框的值为空的时候主页面显示哪个数据，感觉有点问题
 */
  searchInter(jkfw: string) {
    //this.searchTerms.next(jkfw);
   /* this.cdatas = this.searchTerms.debounceTime(2000).distinctUntilChanged().switchMap(

      jkfw=>jkfw?this.interfaceservice.searchIn(jkfw):Observable.of<ofInterface[]>([])

    ).catch(error=>{console.log(error);return Observable.of<ofInterface[]>([])})*/
    this.interfaceservice.searchIn(jkfw).subscribe(res=>{
      this.cdatass=res['items'];
      this.totalItems = res['total'];
      console.log(this.cdatass)
     if(jkfw==undefined || jkfw ==""){
        // this.loadData();
       }//设置这边的当输入框中的内容为空的时候全部数据出发
       
       if(this.cdatass && this.seardata){
       this.interdatas = this.cdatass;
        this.totalItems = this.interdatas.length;
        console.log(this.interdatas.length)
        console.log(this.totalItems)
       }
    }) 
 // console.log(this.interdatas)
  //console.log(this.cdatass)
  }
   /**
 *多条件查询
 */
  advanceSearch(cc: any) {
    this.interfaceservice.gadsearch(cc).subscribe(res=>{
      this.zbdatas =res['items'];
     if(this.zbdatas && this.seardata || this.cdatass){
       this.interdatas = this.zbdatas;
       this.totalItems = res['total'];
      console.log(this.interdatas)
    }
      console.log(this.totalItems)});
  }
  /**
   *初始化实现的方法
   */
  ngOnInit():void {
    this.getALLdata();
    //this.loadData();
  }


  /**
 *获取全部的东西
 */
  getALLdata() {
    this.interfaceservice.getSdate(this.eventData).subscribe(res => {
      this.seardata = res['items'];
      console.log(this.eventData)
      console.log(this.seardata)
       this.interdatas = this.seardata ;
       console.log(this.interdatas)
       this.totalItems = res['total'];
      //获取全部的搜索值
    }, error => { console.log(error) },
      () => { }
    )
  }
 /**
 *删除
 */
 deleteInt(itemdata: ofInterface):void { 
    this.interfaceservice.deleteInt(itemdata.int_service_num).then(()=>
     this.seardata = this.seardata.filter(h => h !== itemdata)
    )
   // if (this.selectedHero === hero) { this.selectedHero = null; }
    console.log(itemdata.int_service_num)
    console.log(this.seardata);
    location.reload();
}

 /**
 *新增
 */
addSave(addDatas:ofInterface):void{
   // console.log(this.Interfaces.push(addDatas))
  if(!addDatas){return}
    this.interfaceservice.AddDatas(addDatas)
   .then(ofInterface=>{this.seardata.push(ofInterface);location.reload();console.log(addDatas),console.log(this.interdatas)})
}
/**
 * 编辑里面的更新事件
 */
EditUpdatec(SSdatas:ofInterface){
   this.interfaceservice.EditUpdate(SSdatas).then( 
       ()=>{this.goBack(),location.reload()}         
   )
   this.flag2=!this.flag2;
}
/**
 * 返回
 */
goBack():void{
  this.location.back();
}
/**
 * 表示编辑的时候input框出现
 */
editCon(){
  this.flag2 = !this.flag2;
}
/***
 * 分页
 */
	public loadData(){
		let offset = (this.currentPage-1)*this.itemsPerPage;
		let end = (this.currentPage)*this.itemsPerPage;
   //跑了全部的数据
		return this.interfaceservice.getSdate(event).subscribe(
			res=>{
       this.interdatas=res['items'].slice(offset,end>this.totalItems?this.totalItems:end);
        console.log(res)
				//TODO.正式环境中，需要去掉slice
		//		this.interdatas = res.slice(offset,end>this.totalItems?this.totalItems:end);
			},
			error => {console.log(error)},
			() => {}
		);
	}
  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    if(event == undefined){
          event.page=1;
          event.itemsPerPage=10;
    }
    this.eventData= event;
    //不能通过这个截取 
    this.interfaceservice.getSdate(event).subscribe(res=>this.interdatas=res['items']);   
    this.interfaceservice.gadsearch(this.eventData).subscribe(res=>this.interdatas=res['items']);  
        
  }
}
