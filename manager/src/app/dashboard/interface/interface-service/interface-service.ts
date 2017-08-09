import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ofInterface } from '../interface-mock-data/mock-data';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class InterfaceService {
  public InterfaceZh:string;
  public interfaceUrl = "assets/mock-data/interface.json";
  public selIdData:ofInterface;

  constructor(private http: Http){ }
  /***
   * 查询后获取数据，怎么默认查询是某个字段
   */
/* public searchIn(InterfaceZh: string):Observable<ofInterface[]>{
 return this.http.get(`this.interfaceUrl/?chineName=${term}`).map(
     res=>{
          let result = res.json();
          console.log(result)
          return result;
      
     });
}*/
  /***
   * 获取全部的数据
   */
  public getSdate():Observable<ofInterface[]>{
     return this.http.get('http://localhost:3000/interface').map(
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
  return  this.getSdate().toPromise().then(
     res=>   
      res.find(selIdData=>
     (+selIdData.int_service_num)===id)

     //返回这个选中的东西
     ).catch(this.handleError);
}
private headers = new Headers({'Content-Type':'application/json'});
deleteInt(id:number):Promise<ofInterface>{
   return this.http.delete(this.interfaceUrl,{headers: this.headers})
   .toPromise()
   .then(()=>null)
   .catch(this.handleError)
}
/**
 * 条件搜索
 */
gadsearch(){
  return this.http
  .get(this.interfaceUrl)
  .map((res:Response)=>{
                  let selecteddatas = res.json();
                  return selecteddatas['items'];
                })
                .catch(this.handleError);
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

