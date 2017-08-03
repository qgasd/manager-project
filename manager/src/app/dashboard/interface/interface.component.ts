import { Component, OnInit } from '@angular/core';
import { ofInterface } from './interface-mock-data/mock-data';
import { InterfaceService } from './interface-service/interface-service';
import { FormsModule } from '@angular/forms';
import { Subject }           from 'rxjs/Subject';
import { Observable }        from 'rxjs/Observable';
@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
  public zbdatas: ofInterface;//这是多条件查询的数据
  public cdatas:Observable<ofInterface[]>;//这是但条件搜索的数据
  public xc:any;
  public flag = false;
  jkfwt: string;
  public seardata: ofInterface[];
  public selId: ofInterface[];
private searchTerms = new Subject<string>();
//实现对象的观察
  constructor(public interfaceservice: InterfaceService) { }

  searchInter(jkfw: string) {
  /*  this.interfaceservice.searchIn(jkfw).subscribe(res => {
      for(var i=0;i<res['items'].length;i++){
          this.xc = res['items'][i].chineName;
      }       
    //this.xc是数组中所有这个字段的值，然后让这个值和jkfw进行循环对比然后返回值相等的函数 
    //通过循环 
    for(var i=0;i<this.xc.length;i++){
       if(jkfw === this.xc[i]){
           console.log(jkfw)
       }
    }
  })*/
  this.searchTerms.next(jkfw)
  }
  ngOnInit():void {
    this.searchInter(this.jkfwt);
    this.getALLdata();
 /*   this.cdatas = this.searchTerms.debounceTime(2000).distinctUntilChanged().switchMap(
      jkfw=>jkfw?this.interfaceservice.searchIn(jkfw):Observable.of<ofInterface[]>([])
    ).catch(error=>{console.log(error);return Observable.of<ofInterface[]>([])})*/
  }

  search() {
    this.flag = !this.flag;
  }
  getALLdata() {
    this.interfaceservice.getSdate().subscribe(res => {
      this.seardata = res;
      console.log(this.seardata)
      //获取全部的搜索值
    }, error => { console.log(error) },
      () => { }
    )
  }
  deleteInt(itemdata: ofInterface) {
    this.interfaceservice.deleteInt(itemdata.id).then(
      seardata => this.seardata.filter(h => h !== itemdata)
    )
    console.log(this.seardata)
  }

  advanceSearch(cc: ofInterface) {
    for (var item in cc) {  //过滤到值为空和没有值的参数，保证参数的有效性
      if (cc[item] === undefined || cc[item] === " ") {
        delete cc[item]
      }
    }  //保证这个json的有效性
    console.log(cc)//返回有值的字符串默认的表示没有选择select
    //这里应该是find一个一个循环，要不是for  //filter没有起作用//|| m.nexdotime || m.validstate || m.nextresult,console.log(m)
    // 
    this.interfaceservice.gadsearch().subscribe(res => {
      //这里filter需要有一个参数来接收这个筛选后的数组
      //x.fwbm===cc.fwbm && x.rjcpxtmc === cc.rjcpxtmc && x.cpmc === cc.cpmc && x.bigSpecil === cc.bigSpecil && x.smallspec === cc.smallspec && x.state === cc.state && x.chineName === cc.chineName && x.surl === cc.surl && x.englishName === cc.englishName
      //与 所有条件满足
      // this.zbdatas =  res.filter(res=>{
          this.zbdatas = res.filter(x => 
           (
            x.fwbm===cc.fwbm || x.rjcpxtmc === cc.rjcpxtmc || x.cpmc === cc.cpmc || x.bigSpecil === cc.bigSpecil || x.smallspec === cc.smallspec || x.state === cc.state || x.chineName === cc.chineName || x.surl === cc.surl || x.englishName === cc.englishName
            ))
            console.log(this.zbdatas)
    }, error => { console.log(error) },
      () => { }
    );
  }
}
