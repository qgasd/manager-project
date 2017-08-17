import { Injectable } from '@angular/core';
import { Http,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { Ipconfigs } from "app/checkLogin/ipconfigs";

@Injectable()
export class CheckLoginService {
  constructor(private http: Http) { }

  checkLogin(){
      var params = {
        
      }
     return this.http.post(new Ipconfigs().localhostUrl+'/checkLogin',params,{
       withCredentials:true,
     }).map(
     res=>{
       
       return res.json();
     });
  }
}
