import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, ResponseContentType, RequestMethod, Headers } from '@angular/http';
import { MenuService } from './menu.service/menu.service';
import { Menu} from './menu';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    public menulist:Array<Menu>;
    public menus: Menu[];
    constructor(public http: Http,private menuservice:MenuService) {
      
    }

    ngOnInit() {
     this.getMenu();
     
    }
     getMenu(){
             return this.menuservice.httpGet().subscribe(res =>
             {this.menulist =res["waitTodo"];
        console.log(this.menulist)
    },error=>{console.log(error)},
    ()=>{}
    );
     }

}

