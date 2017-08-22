import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Ipconfigs } from "app/checkLogin/ipconfigs";
import { interfaceIO } from "app/dashboard/interface/interface-mock-data/io";

@Injectable()
export class InterfaceIoService {
    public url = new Ipconfigs().localhostUrl+"/interfaceIO/serach";
    public headers = new Headers({'Content-Type':'application/json'});
    constructor(private http:Http){}

    getSelect(id:number){
        console.log(id);
      return this.http.get(`${this.url}/${id}`).map(
            res => {
                let result = res.json();
                console.log(result);
                return result;
            }

        )

    }

        /***
   * 新增数据
   * */
  public AddDatas(Adatas:interfaceIO):Promise<interfaceIO>{
    return this.http.post(new Ipconfigs().localhostUrl+'/interfaceIO/add',Adatas,{headers:this.headers})
    .toPromise()
    .then(res=>{res.json().data as interfaceIO;
      if(res.json().success){                       
            console.log(111)
    }}).catch(this.handleError)
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