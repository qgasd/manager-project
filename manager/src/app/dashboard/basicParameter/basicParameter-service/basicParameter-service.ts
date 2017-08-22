import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ofBasicParameter } from '../basicParameter-mock-data/mock-data';
import { Ipconfigs } from "app/checkLogin/ipconfigs";
import { Location }               from '@angular/common';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class BasicParameterService {
  public ipurl = new Ipconfigs().localhostUrl;
  public basicParameterUrla = this.ipurl + "/basicParameter";
  public basicParameterUrld = this.ipurl + "/basicParameter/del";
  public basicParameterurlS = this.ipurl + "/basicParameter/search";
  public selIdData:ofBasicParameter;

  constructor(private http: Http,private location:Location){ }

  /**
 * 多条件搜索
 */
gadsearch(pagedata:any):Observable<ofBasicParameter[]>{
  return this.http
  .post(this.basicParameterurlS,pagedata,{headers:this.headers})
  .map((res:Response)=>{
                  let selecteddatas = res.json();//从后台服务器里面获取数据
                  console.log(pagedata)
                  return selecteddatas;
                })
                .catch(this.handleError);
}
  
  /***
   * 查询后获取数据
   */

 public searchIn(ParentN: string):Observable<ofBasicParameter[]>{
      var params = new URLSearchParams();
       params.set('Parent',ParentN);
       console.log(params)
 return this.http.post(this.basicParameterurlS,params).map(
     res=>{  
          let result = res.json();
          console.log(res.json())
          return result;     
     });
}

  /***
   * 新增数据
   * */
  public AddDatas(Adatas:ofBasicParameter):Promise<ofBasicParameter>{
   return this.http.post('http://localhost:3000/basicParameter/add',Adatas,{headers:this.headers})
                  .toPromise()
                  .then(res=>{res.json().data as ofBasicParameter;
                    if(res.json().success){                       
                          console.log(342)
                  }})
                  .catch(this.handleError)
  }

  /***
   * 获取全部的数据
   */
  public getSdate():Observable<ofBasicParameter[]>{
     return this.http.post('http://localhost:3000/basicParameter',"").map(
     res=>{
       let result = res.json();
       console.log(result)      
       return result;
     });
  }

/**
 * 删除功能 
 */
private headers = new Headers({'Content-Type':'application/json'});
deleteInt(id:number):Promise<void>{
   const url = `${this.basicParameterUrld}/${id}`;
   return this.http.delete(url,{headers: this.headers})
   .toPromise()
   .then(()=>null)
   .catch(this.handleError)
}



/**
 * 异常信息处理
 */
  public handleError(error:any):Promise<any>{
        //表示任意类型error
        console.error("an error occured",error);
        return Promise.reject(error.message || error)
        //返回失败后的错误信息或者是错误
    }

}

