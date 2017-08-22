import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ofInterface } from '../interface-mock-data/mock-data';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ipconfigs } from "app/checkLogin/ipconfigs";
declare var $:any;
@Injectable()
export class InterfaceService {
  public ipurl = new Ipconfigs().localhostUrl;
  public interfaceUrl ="assets/mock-data/interface.json";
  public interfaceUrla = this.ipurl+"/interface";
  public interfaceUrlss = this.ipurl+"/interfaceRefrence/serach";
  public interfaceUrld = this.ipurl+"/interface/delete";
  public interfaceurlS= this.ipurl+"/interface/search";
  public interfaceurlU= this.ipurl+"/interface/update";
  public interfaceurlac= this.ipurl+"/interface/search";
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
    
     return this.http.post(this.interfaceUrla,"").map(
     res=>{
       let result = res.json();
       console.log(result)      
       return result;
     });
  }
  /**
   * 获取选中的id的数据
   */
public getSelId(id:number):Promise<ofInterface>{
  console.log(id)
  const url = `${this.interfaceUrlss}/${id}`
 return this.http.get(url).toPromise().then(res=>{let result = res.json();return result;})

  .catch(this.handleError);
}
/**
 * 删除功能 单个删除
 */
private headers = new Headers({'Content-Type':'application/json'});
deleteInt(id:number):Promise<void>{
   const url = `${this.interfaceUrld}/${id}`;
   console.log(`${this.interfaceUrld}`)
   return this.http.delete(url,{headers: this.headers})
   .toPromise()
   .then(()=>null)
   .catch(this.handleError)
}
/*
  批量删除
*/
deleteCbox(arrayDate:Array<string>):Observable<ofInterface[]>{
   const url = `${this.interfaceUrld}/${arrayDate}`;
      console.log(this.getSdate());
  return this.http.delete(url,{headers: this.headers})
   .map(()=>{
       this.getSdate();//看这个方法执行没有
   })
   .catch(this.handleError)

}
// deleteCbox(arrayDate:Array<string>):Observable<void>{
//    const url = `${this.interfaceUrld}/${arrayDate}`;
//    return this.http.delete(url,{headers: this.headers})
//    .map(()=>null)
//    .catch(this.handleError);
// }
/**
 *获取选中的需要编辑的数据的方法 
 * */
public getCheckdata(Arradata:Array<string>):any{
  const url=`${this.interfaceUrld}/${Arradata}` 
     return this.http.delete("url",{headers: this.headers}).toPromise().then(()=>null).catch(this.handleError)
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
 * 编辑里面的保存更新
 */
EditUpdate(Edatas:ofInterface):Observable<ofInterface>{
 // const url=`${this.interfaceurlU}/${Edatas}`;
 console.log(Edatas)
  return this.http.post(this.interfaceurlU,Edatas,{headers:this.headers})
                  .map(()=>{
                    this.getSdate()
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
                  .then(res=>{
                    res.json().data as ofInterface;
                    if(res.json().success){                       
                          console.log(342)
                  }})
                  .catch(this.handleError)
            
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
