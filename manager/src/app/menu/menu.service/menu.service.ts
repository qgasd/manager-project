 import { Injectable } from '@angular/core';
 import { Headers, Http,RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
 import 'rxjs/add/operator/toPromise';
import { Menu } from '../menu';

 @Injectable()
 export class MenuService{
     //找不到资源。。。。
     public urlnav = 'assets/mock-data/navigation.json'; 
    constructor(private http:Http){}
  public   httpGet():Observable<Menu[]>{
         return this.http.get(this.urlnav)
             .map((res:Response)=>{
                 let result = res.json();
                 console.log(result)
                 return result;
             })
             .catch((error:any)=>Observable.throw(error || 'server error'));
     }        
 }  