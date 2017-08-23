import { Component, OnInit, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ofInterface } from './interface-mock-data/mock-data';
import { InterfaceService } from './interface-service/interface-service';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

//import { selectDatasService } from "app/common-service/select-service";

import { NgForm } from '@angular/forms';
//import { selectDatasService } from "app/common-service/select-service";

// import {MultiSelectModule} from 'primeng/primeng';
//import { ConfirmationService } from 'primeng/primeng';
declare var $: any;
@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css'],
  providers: []
})
export class InterfaceComponent implements OnInit {
  public interdatas: ofInterface[];//通用的数组
  public deletedatas: ofInterface[];
  public cc: ofInterface[];
  public filterDatas: ofInterface[];
  public zbdatas: ofInterface[];//这是多条件查询的数据
  // public cdatas:Observable<ofInterface[]>;//这是单条件搜索的数据
  public cdatass: ofInterface[];//这是单条件搜索的数据
  public flag2 = false;//状态码
  public flag1 = true;
  //public flag6=false;
  public flag4 = false;//pc和移动端字段是否显示的状态，初始值都显示，在页面的宽度小于750的时候显示三个字段
  public flag5 = false;//复选框选中状态
  public seardata: ofInterface[];//获取全部的数据
  public selId: ofInterface[];//选中相对应的id
  private searchTerms = new Subject<string>();//获取subject对象
  public jkfwdata: string;
  isChecked = false;
  public aradata: any;
  public checkBox: boolean;
  public checkBoxClick: boolean;
  public flag3 = false;//这是单条件查询的
  public choseItem = [];//设置一个空数组，将选中的数据放到里面传给后台判断是否删除
  public flag0 = true;
  public booleanArray = [];
  public indexw: number;//编辑input显示和不显示
  public deletdata: ofInterface[];

  public flag6 = true;
  public flag7 = true;
  public flag8 = true;
  public flag9 = true;
  public flag10 = false;
  /**
   * 分页参数
   */
  public totalItems: number = this.totalItems; //所有数据
  public maxSize: number = 10;
  public currentPage: number = 1;//当前页
  public smallnumPages: number = 0;
  public itemsPerPage: number = 10;//当前选择10条一页
  public eventData: any;
  public choosedata: ofInterface;
  //实现对象的观察1
  innerWidth: number;
  //select
  public selectstate: ofInterface;
  //弹窗标题
  public alertTitle: string;
  //弹窗状态码
  public alertSearch = false;
  public alertEdit = false;
  public alertAdd = false;
  //表示选中的编辑的数据
  public itemtr:ofInterface;
  //,private cdr: ChangeDetectorRef  ,private window: Window
  constructor(public interfaceservice: InterfaceService, public location: Location, public router:Router) {
    //  let getWindow = () => {
    //       return window.innerWidth;
    //    };

    //   window.onresize = () => {
    //       this.innerWidth = getWindow();
    //       this.cdr.detectChanges(); //running change detection manually
    //   };
  }
  //获取页面的元素
  @ViewChild('checkvalue')

  checkVal: ElementRef
    @ViewChild('itemtr')
    itemtrvalue:ElementRef
  /**
   * 需不需要判断当单选框的值为空的时候主页面显示哪个数据，感觉有点问题
   */
  @HostListener('window:resize', ['$event'])

  onResize(event) {
    console.log(event)
    var wwinth = event.target.innerWidth;
    console.log(wwinth)
    if (wwinth < 768) {
      this.flag4 = false;
      this.flag6 = true;
      this.flag7 = false;
      this.flag8 = true;
      this.flag9 = false;
      this.flag10 = false;
    } else {
      this.flag4 = true;
      this.flag6 = false;
      this.flag7 = true;
      this.flag8 = true;
      this.flag9 = true;
      this.flag10 = false;
    }
  }

  /**
  *屏幕宽度识别导航
  */
  screen() {
    var wwinth = window.innerWidth;
    if (wwinth < 768) {
      this.flag4 = false;
      this.flag6 = true;
      this.flag7 = false;
      this.flag8 = true;
      this.flag9 = false;
      this.flag10 = false;
    } else {
      this.flag4 = true;
      this.flag6 = false;
      this.flag7 = true;
      this.flag8 = true;
      this.flag9 = true;
      this.flag10 = false;
    }
  }
  /**
     * 取消全选
     */
  cancel() {
    var j_cbAllinput = $("#j_cbAll input");
    j_cbAllinput[0].checked = false;
  }
  /**
   * 全选
   */
  choseALLs(cb: ofInterface, c: boolean) {
    var checkboxs = $(".j_tbc input");
    for (var i = 0; i < checkboxs.length; i++) {
      var checkbox = checkboxs[i];
      checkbox.checked = c;
    }
  }

  /***
   * 展开搜索
   */
  opensearch() {
    this.flag6 = false;
    this.flag7 = true;
    this.flag8 = false;
    this.flag9 = true;
    this.flag10 = true;
  }
  /***
* 返回搜索
*/
  backsearch() {
    this.flag6 = true;
    this.flag7 = false;
    this.flag8 = true;
    this.flag9 = false;
    this.flag10 = false;
  }
  //获取select数组数据
  //  public getselctDate(){
  //     this.sservice.getSelectdata()
  //     .subscribe(
  //       res=>{
  //           this.selectstate =res["state"];
  //       },error=>{console.log(error)},
  //     ()=>{}
  //     );
  //   }
  //单条件搜索
  searchInter(jkfw: string) {
    this.cancel();
    $(".waiting").show();
    this.jkfwdata = jkfw;
    this.interfaceservice.searchIn(jkfw).subscribe(res => {
      $(".waiting").hide();
      this.cdatass = res['items'];
      this.totalItems = res['total']//this.interdatas.length;
      if (jkfw == undefined || jkfw == "") {
        this.loadData();
      }//设置这边的当输入框中的内容为空的时候全部数据出发      
      if (this.cdatass && this.seardata) {
        this.interdatas = this.cdatass;
        //   this.interdatas=this.interdatas.filter(h=>h.state!=='hidden')
      }
    })
    this.flag3 = !this.flag3;
  }
  /**
*多条件查询
*/
  advanceSearch(cc: ofInterface) {
    $(".waiting").show();
    console.log(this.alertSearch)
    this.alertSearch = true;
    this.alertEdit = false;
    this.alertAdd = false;
    this.getAlertTitle();
    this.choosedata = cc;
    this.interfaceservice.gadsearch(cc).subscribe(res => {
      this.zbdatas = res['items'];
      if (this.zbdatas && this.seardata || this.cdatass) {
        this.interdatas = this.zbdatas;
        // this.interdatas=this.interdatas.filter(h=>h.state!=='hidden')
        this.totalItems = res['total']  //this.interdatas.length;
        console.log(this.interdatas)
      }
      console.log(this.totalItems)
      $(".waiting").hide();
    });
    this.flag1 = !this.flag1;
  }
  /**
   *初始化实现的方法
   */

  ngOnInit(): void {
     this.getALLdata();
    this.loadData();
    this.getAlertTitle();
    this.screen();
    // this.getselctDate();
  }  

  changeSearch() {
     this.alertSearch=true;
    this.alertAdd=false;
    this.alertEdit=false;
    this.alertTitle='搜索';
  }
  //
  changeAdd(){
   
      this.alertSearch=false;
    this.alertAdd=true;
    this.alertEdit=false;
    this.alertTitle='新增';

  }
   onsubmit(f:NgForm){
     if(this.alertEdit){
f.value =this.itemtr 
     }
          
       }
  //  
  changeEdit(cedit:ofInterface){
    this.alertSearch=false;
    this.alertAdd=false;
    this.alertEdit=true;
    this.alertTitle='编辑';
    this.itemtr = cedit;

    console.log(this.itemtr)

    

  }
  
  getAlertTitle() {
    if (this.alertAdd) {
      this.alertTitle = "新增"
    } else if (this.alertEdit) {
      this.alertTitle = "编辑"
    } else if (this.alertSearch) {
      console.log(this.alertSearch)
      this.alertTitle = "搜索"
    }
    console.log(this.alertAdd)
    console.log(this.alertEdit)
    console.log(this.alertSearch)
  }
  /**
 *获取全部的东西
 */
  getALLdata() {
    $(".waiting").show();
    console.log(this.alertTitle)
    this.interfaceservice.getSdate().subscribe(res => {
      this.seardata = res['items']//.slice(offset, end > this.totalItems ? this.totalItems : end);
      this.interdatas = this.seardata;//隐藏状态被标记为禁用的数据
      this.totalItems = res['total'];
      $(".waiting").hide();
    }, error => {  $(".waiting").hide();alert("网络错误,请稍后重试！"); },
      () => { }
    )
  }

    /**
   * 单选删除
   */
  deleteCheck(cc: ofInterface,check: boolean) {
    var j_cbAll = $("#j_cbAll");
    var j_cbAllinput = $("#j_cbAll input");
    var checkboxs = $(".j_tbc input");
    var isCheckedAll = true;
    for (var i = 0; i < checkboxs.length; i++) {
      if (!checkboxs[i].checked) {
        isCheckedAll = false;
        break;
      }
    }
    if (isCheckedAll == true) {
      j_cbAllinput[0].checked = true;
    } else {
      j_cbAllinput[0].checked = false;
    }
    // this.choseItem = [];
      this.ArrayWay(check, cc);
      //this.choseItem = [];
      console.log(this.choseItem)
      
  }
  
  /**
   * 传给后台的数据 数组去重
   */
  ArrayWay(check: boolean, aw: ofInterface) {
    var index: number = this.choseItem.indexOf(aw.int_service_num)
    if (check) {
      if (index < 0) {
        this.choseItem.push(aw.int_service_num);
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
  getStatus(){
    this.interfaceservice
  }

  //这里是从后台获取删除后的数据，点击删除后的操作
  deleteCC(){
    console.log(this.choseItem)
    this.interfaceservice.deleteCbox(this.choseItem).subscribe(res=>{
      console.log('3333333+++++++')
      if(res){
        this.choseItem = []
        console.log('========:'+res)
        this.interfaceservice.getSdate().subscribe(res => {
          //this.seardata = res['items']//.slice(offset, end > this.totalItems ? this.totalItems : end);
          this.interdatas =  res['items'];//隐藏状态被标记为禁用的数据
          this.totalItems = res['total'];
          console.log(this.totalItems)
          this.loadData()
          //$(".waiting").hide();
        }, error => {  $(".waiting").hide();alert("网络错误,请稍后重试！"); },
          () => { }
        )
      }
      
    })    
   
  }
  /**
  *新增   //刷新问题
  */
  addSave(addDatas: ofInterface): void {
   console.log(addDatas)
    $(".waiting").show();
    this.alertAdd = true;
    console.log(this.alertAdd)
    this.alertEdit = false;
    this.alertSearch = false;
    if (!addDatas) { return }
    if(addDatas.software_num == undefined){
      addDatas.software_num = "100";
    }
    if (addDatas.URL == undefined) {
      addDatas.URL = "";//新增的时候去除两个空的undefinded的数据
    }
    if (addDatas.remark == undefined) {
      addDatas.remark = "";
    }
    this.interfaceservice.AddDatas(addDatas)
      .then(ofInterface => { this.seardata.push(ofInterface); $(".waiting").hide();
      this.interfaceservice.getSdate().subscribe(res => {
        //this.seardata = res['items']//.slice(offset, end > this.totalItems ? this.totalItems : end);
        this.interdatas =  res['items'];//隐藏状态被标记为禁用的数据
        this.totalItems = res['total'];
        console.log(this.totalItems)
        this.loadData()
        //$(".waiting").hide();
      }, error => {  $(".waiting").hide();alert("网络错误,请稍后重试！"); },
        () => { }
      );
      
      console.log(addDatas), console.log(this.interdatas) })
  }
  /**
   * 编辑里面的更新事件
   */
  EditUpdatec(SSdatas: ofInterface, index: number) {
    $(".waiting").show();
    //console.log(SSdatas)
    //this.indexw = index + 1.7976931348623157E+10308;//这里给一个无限的数字表示不管怎么递增都不能达到这个数字
    // this.interfaceservice.EditUpdate(SSdatas).subscribe(
         
    //   (h) => {
    //       $(".waiting").hide();
    //          this.deletdata = h['items']//确定这个是否存在，存在再换成this.seardata
    //    console.log(this.deletdata)

    //   }, error => {  $(".waiting").hide();alert("网络错误,请稍后重试！"); },
    //   () => { }
    // )
  }
  /**
   * 返回
   */
  goBack(): void {
    this.location.back();
  }
  /**
   * 表示编辑的时候input框出现
   */
  // editCon( aa: ofInterface,index:number,) {
  //   this.indexw =index;
  // }
  /***
   * 分页
   */
  public loadData() {
    this.cancel();
    $(".waiting").show();
    let offset = (this.currentPage - 1) * this.itemsPerPage;
    let end = (this.currentPage) * this.itemsPerPage;
    //跑了全部的数据
    if (this.flag1) {
      console.log(this.flag1)
      return this.interfaceservice.getSdate().subscribe(
        res => {
          this.interdatas = res['items'].slice(offset, end > this.totalItems ? this.totalItems : end);
          $(".waiting").hide();
          console.log(this.interdatas)
        },
        error => { console.log(error) },
        () => { }
      );
    } else if (this.flag3 && this.flag1) {
      console.log(this.flag1)
      return this.interfaceservice.searchIn(this.jkfwdata).subscribe(
        res => {
          this.interdatas = this.interdatas.slice(offset, end > this.totalItems ? this.totalItems : end);
          $(".waiting").hide();
          console.log(res)
        },
        error => { console.log(error) },
        () => { }
      );
    } else {
      console.log(this.flag1)
      return this.interfaceservice.gadsearch(this.choosedata).subscribe(
        res => {
          this.interdatas = this.interdatas.slice(offset, end > this.totalItems ? this.totalItems : end);
          $(".waiting").hide();
          console.log(res)
        },
        error => { console.log(error) },
        () => { }
      );
    }
  }
  public pageChanged(event: any): void {
    this.currentPage = event.page;
    console.log(this.currentPage)
  }
}
