import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ofInterface } from './interface-mock-data/mock-data';
import { InterfaceService } from './interface-service/interface-service';
import { FormsModule } from '@angular/forms';
import { Subject }     from 'rxjs/Subject';
import { Observable }  from 'rxjs/Observable';
import { Location }    from '@angular/common';
@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
  public interdatas:ofInterface[];//通用的数组
  public dedata:ofInterface;//shanc
  public cc:ofInterface[];
  public filterDatas:ofInterface[];
  public zbdatas: ofInterface[];//这是多条件查询的数据
 // public cdatas:Observable<ofInterface[]>;//这是单条件搜索的数据
  public cdatass:ofInterface[];//这是单条件搜索的数据
  public flag2 = false;//状态码
  public flag1 = true;
  public flag4 =false;
  public flag5 = false;
  public seardata: ofInterface[];//获取全部的数据
  public selId: ofInterface[];//选中相对应的id
private searchTerms = new Subject<string>();//获取subject对象
public jkfwdata:string;
public flag3=false;//这是单条件查询的
public choseItem=[];
public chdates:ofInterface[];
/**
 * 分页参数
 */

  public totalItems: number =  this.totalItems; //所有数据
  public maxSize:number = 10;
  public currentPage: number = 1;//当前页
  public smallnumPages: number = 0;
  public itemsPerPage:number = 10;//当前选择10条一页
  public eventData:any;
  public choosedata:ofInterface;
//实现对象的观察1
  constructor(public interfaceservice: InterfaceService,public location:Location) { 

  }
//获取页面的元素
@ViewChild('checkvalue')
checkVal:ElementRef
/**
 * 需不需要判断当单选框的值为空的时候主页面显示哪个数据，感觉有点问题
 */
@HostListener('window:resize', ['$event'])

onResize(event) {
  console.log(event)
  var wwinth=event.target.innerWidth;
    console.log(wwinth)
      if(wwinth<750){
          this.flag4 = false;
      }else{
        this.flag4 = true;
      }
}

  searchInter(jkfw: string) {
    this.jkfwdata = jkfw;
    this.interfaceservice.searchIn(jkfw).subscribe(res=>{
      this.cdatass=res['items'];
      this.totalItems = res['total']//this.interdatas.length;
     if(jkfw==undefined || jkfw ==""){
       //  this.loadData();
       }//设置这边的当输入框中的内容为空的时候全部数据出发      
       if(this.cdatass && this.seardata){
       this.interdatas = this.cdatass;
    //   this.interdatas=this.interdatas.filter(h=>h.state!=='hidden')
       }
    }) 
   this.flag3 =!this.flag3;
  }
   /**
 *多条件查询
 */
  advanceSearch(cc: ofInterface) {
    this.choosedata = cc;
    this.interfaceservice.gadsearch(cc).subscribe(res=>{
      this.zbdatas =res['items'];
     if(this.zbdatas && this.seardata || this.cdatass){
       this.interdatas = this.zbdatas;
      // this.interdatas=this.interdatas.filter(h=>h.state!=='hidden')
       this.totalItems =res['total']  //this.interdatas.length;
      console.log(this.interdatas)
    }
    
      console.log(this.totalItems)});
        this.flag1 =!this.flag1;
  }
  /**
   *初始化实现的方法
   */
  ngOnInit():void {
 
    this.getALLdata();     
    //this.loadData();
     //  console.log(this.interdatas)
    //console.log(this.checkVal.nativeElement.style.text) 
   
  }
   /**
   * 过滤禁用状态的数据
   */

  /**
 *获取全部的东西
 */
  getALLdata() {    
     let offset = (this.currentPage-1)*this.itemsPerPage;//分页中的开头
		let end = (this.currentPage)*this.itemsPerPage;//分页中的结尾
    //   if(this.flag1){
          this.interfaceservice.getSdate().subscribe(res => {
                this.seardata = res['items'].slice(offset,end>this.totalItems?this.totalItems:end);
                this.interdatas = this.seardata;//隐藏状态被标记为禁用的数据
               // this.interdatas= this.interdatas.filter(h=>h.state !=='hidden') ;
                this.totalItems = res['total'];
                console.log(34324)
              }, error => { console.log(error) },
                () => { }
              )
    //   }
  }

 /**
 *删除
 */
//  deleteInt(itemdata: ofInterface):void { 
//     this.interfaceservice.deleteInt(itemdata.int_service_num).then(()=>
//      this.seardata = this.seardata.filter(h => h !== itemdata)
//     )
//     location.reload();
// }

choseBox(item){
   this.choseItem = item;
   console.log(this.choseItem)
}

 /**
 *新增
 */
addSave(addDatas:ofInterface):void{
   // console.log(this.Interfaces.push(addDatas))
  
  if(!addDatas){return}
   if(addDatas.URL==undefined){
     addDatas.URL="";
   }
    if(addDatas.remark==undefined){
     addDatas.remark="";
   }
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
   this.flag2=false;
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
  this.flag2 = true;
  console.log(this.flag2)
}
  /*
  批量删除2
  这个方法是获取说有的选中的数据并且将他们作为一个数组
  */
  deleteCheck(check: boolean, cc: ofInterface) {
    // this.isChecked = cc.isChecked;
    // //先判断选中的数组里面是否包括当前值,includes目前不支持
    var index: number = this.choseItem.indexOf(cc.int_service_num)//首次出现的位置
    ////当前选择的就追加否则就移除
     this.ArrayWay(check,cc);
     console.log(check)
    console.log(this.choseItem)
    //如果选中的参数长度等于当前每一页显示的数量那么就设置全选的状态为真 
  }

  /**
   * 数组去重
   */
  ArrayWay(check: boolean, aw: ofInterface) {
     var index: number = this.choseItem.indexOf(aw.int_service_num)
    if (check) {
      if (index < 0) {
        this.choseItem.push(aw.int_service_num)
        console.log(this.choseItem)
      }
    } else {
      if (index > -1) {//如果要检索的字符串值没有出现，则该方法返回 -1
        this.choseItem = this.choseItem.filter((el, index) => {
          return el != aw.int_service_num
        })
      }
    }
  }

deleteCC(cc: ofInterface[]) {
  console.log(cc)//cc是所有的数据
  console.log(this.choseItem)
  cc.forEach((el,index)=>{this.dedata = el})
    this.interfaceservice.deleteCbox(this.choseItem).then(() => {
  
      this.seardata=this.seardata.filter((h)=>{h.int_service_num !==this.dedata.int_service_num})
      console.log(this.seardata)
  })
  //this.getALLdata();
 // console.log(this.seardata)
  this.seardata = this.seardata
  //location.reload();
 
}
/***
 * 
 * 
 * 
 * 分页
 */
	public loadData(){  
		let offset = (this.currentPage-1)*this.itemsPerPage;
		let end = (this.currentPage)*this.itemsPerPage;
    console.log(this.currentPage)
   //跑了全部的数据
   console.log(this.seardata)
   if(this.flag1){
            console.log(this.flag1)
    return this.interfaceservice.getSdate().subscribe(
        res=>{
        this.interdatas=res['items'].slice(offset,end>this.totalItems?this.totalItems:end);
          console.log(this.interdatas)
        },
        error => {console.log(error)},
        () => {}
      );  
   }else if(this.flag3 && this.flag1){
      console.log(this.flag1)
    return this.interfaceservice.searchIn(this.jkfwdata).subscribe(
            res=>{
            this.interdatas=this.interdatas.slice(offset,end>this.totalItems?this.totalItems:end);
              console.log(res)
            },
            error => {console.log(error)},
            () => {}
          );
   }else{
     console.log(this.flag1)
    return this.interfaceservice.gadsearch(this.choosedata).subscribe(
            res=>{
            this.interdatas=this.interdatas.slice(offset,end>this.totalItems?this.totalItems:end);
              console.log(res)
            },
            error => {console.log(error)},
            () => {}
          );
   }	
	}
  public pageChanged(event: any): void {
    this.currentPage = event.page;
    console.log(this.currentPage)
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);   
  }
}
