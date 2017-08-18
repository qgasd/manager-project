import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ofInterface } from '../interface-mock-data/mock-data';
import { Location }    from '@angular/common';
import { Ipconfigs } from "app/checkLogin/ipconfigs";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class InterfaceService {
  public ipurl = new Ipconfigs().localhostUrl;
  public interfaceUrl = "assets/mock-data/interface.json";
  public interfaceUrla = this.ipurl + "/interface";
  public interfaceUrld = this.ipurl + "/interface/delete";
  public interfaceurlS= this.ipurl + "/interface/search";
  public interfaceurlU= this.ipurl + "/interface/update";
  public interfaceurl = this.ipurl + "/interfaceRefrence/serach";
  public selIdData:ofInterface;

  constructor(private http: Http,private location:Location){ }
  /***
   * 查询后获取数据,默认查询是英文名称
   */

 public searchIn(InterfaceZh: string):Observable<ofInterface[]>{
      var params = new URLSearchParams();
       params.set('int_name_en',InterfaceZh);
       console.log(params)
 return this.http.post(this.interfaceurlS,params).map(
     res=>{  
          let result = res.json();
          console.log(res.json())
          return result;     
     });
}
  /***
   * 获取全部的数据
   */
  public getSdate():Observable<ofInterface[]>{
     return this.http.post(this.ipurl+'/interface',"").map(
     res=>{
       let result = res.json();
       console.log(result)      
       return result;
     });
  }
  /**
   * 获取选中的id的数据
   */
public getSelId(id:number):Observable<ofInterface>{
  console.log(id);
  var url = `${this.interfaceurl}/${id}`;
   console.log(url);
  return this.http.get(url).map(
    res=>{
      let result = res.json();
      console.log(result);
      return result;
    });
}
/**
 * 删除功能 
 */
private headers = new Headers({'Content-Type':'application/json'});
deleteCbox(arrayDate:Array<string>):Promise<void>{
  const url = `${this.interfaceUrld}/${arrayDate}`;
  console.log(url)
  //console.log(`${this.interfaceUrld}`)
  return this.http.delete(url,{headers: this.headers})
  .toPromise()
  .then(()=>null)
  .catch(this.handleError)
}
/**
 * 多条件搜索
 */
gadsearch(pagedata:any):Observable<ofInterface[]>{
  return this.http
  .post(this.interfaceurlS,pagedata,{headers:this.headers})
  .map((res:Response)=>{
                  let selecteddatas = res.json();//从后台服务器里面获取数据
                  console.log(pagedata)
                  return selecteddatas;
                })
                .catch(this.handleError);
}
/**
 * 编辑里面的跟新
 */
EditUpdate(Edatas:ofInterface):Promise<ofInterface>{
  const url="";
  return this.http.post(this.interfaceurlU,Edatas,{headers:this.headers})
                  .toPromise()
                  .then(()=>{Edatas
                  console.log(Edatas)}
                  )
                  .catch(this.handleError)
}
/***
 * 新增数据
 * */
 public AddDatas(Adatas:ofInterface):Promise<ofInterface>{
  return this.http.post(this.ipurl+'/interface/insert',Adatas,{headers:this.headers})
                  .toPromise()
                  .then(res=>{res.json().data as ofInterface;
                    if(res.json().success){                       
                          console.log(342)
                  }})
                  .catch(this.handleError)
            
}
/**
 * 分页传送当前页
 */
public  postPagenum(pageNum:number){
      
}

/**12
 * 异常信息处理
 */
  public handleError(error:any):Promise<any>{
        //表示任意类型error
        console.error("an error occured",error);
        return Promise.reject(error.message || error)
        //返回失败后的错误信息或者是错误
    }

}

