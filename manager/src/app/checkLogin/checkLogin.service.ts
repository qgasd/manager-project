import { Injectable } from '@angular/core';
import { Http,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CheckLoginService {

  constructor(private http: Http) { }

  checkLogin(){
      var params = {

      }
     return this.http.post('http://localhost:3000/checkLogin',params,{
       withCredentials:true,
     }).map(
     res=>{
         console.log(res.json());
       return res.json();
     });
  }
}
