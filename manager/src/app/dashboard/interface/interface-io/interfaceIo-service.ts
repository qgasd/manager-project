import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Ipconfigs } from "app/checkLogin/ipconfigs";
@Injectable()
export class InterfaceIoService {
    public url = new Ipconfigs().localhostUrl+"/interfaceIO/serach";
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

}