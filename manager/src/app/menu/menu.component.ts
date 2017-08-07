import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, ResponseContentType, RequestMethod, Headers } from '@angular/http';
import { MenuService } from './menu.service/menu.service';
import { Menu} from './menu';
import { CheckLoginService } from '../checkLogin/checkLogin.service';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [CheckLoginService]
})
export class MenuComponent implements OnInit {
    public menulist:Array<Menu>;
    public menus: Menu[];
    public name : string;
    constructor(
        public http: Http,
        private menuservice:MenuService,
        private checkLoginService : CheckLoginService,
        public router: Router) {
      
    }

    ngOnInit() {
     this.getMenu();
     this.checkLoginService.checkLogin().subscribe(res=>{
             console.log(res.cookie==null);
             console.log(res);
             console.log(res.session);
              if(res.cookie==null){
                    if(!res.sign==true){
                        this.name = "未登录";
                    }else{
                        this.name = res.session.user.username;
                        console.log("1:"+this.name);
                    }
                    if(res.session!=undefined)
                    if(res.session.sign==true){
                        this.name = res.session.user.username;
                        console.log("2:"+res.session.user.username);
                    }else{
                        this.name = "未登录";
                    }
             }else{
                 this.name = res.cookie.account.username;
                 console.log("3:"+this.name);
             }          
         })
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

