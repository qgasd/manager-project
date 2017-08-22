import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ofInterface } from "../dashboard/interface/interface-mock-data/mock-data";
@Injectable()
export class selectDatasService {
    public selecdatasUrl="assets/mock-data/select.json";
    constructor(private http:Http){
       
    }
    getSelectdata():Observable<ofInterface[]>{
        return this.http.get(this.selecdatasUrl)
               .map((res:Response)=>{
                  let result = res.json();     
                  return result;          
               }).catch((error:any)=>Observable.throw(error || "Service error"))
    }
}
