import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InterfaceIoService {
    public url = "http://172.21.21.223:3000/interfaceIO/serach";
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