import { Injectable } from '@angular/core';
import { Http,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CheckLoginService {

  constructor(private http: Http) { }

  checkLogin(){
      var params = {

      }
     return this.http.post('http://172.21.21.223:3000/checkLogin',params,{
       withCredentials:true,
     }).map(
     res=>{
       
       return res.json();
     });
  }
}
