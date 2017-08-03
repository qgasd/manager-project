import { Injectable } from '@angular/core';
import { Http,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import * as base64 from 'js-base64';
@Injectable()
export class LoginService {
  public mess : string
  constructor(private http: Http) { }
  getLogin(username: string, password:string, ischecked: any){
      var params = new URLSearchParams();
      params.set('username',username);
      params.set('password',base64.Base64.encode(password));
      params.set('ischecked', ischecked);
     return this.http.post('http://localhost:3000/loginAuthentication',params).map(//ad验证
     res=>{
     this.mess = res.json();
    return this.mess;
     });
  }
}
