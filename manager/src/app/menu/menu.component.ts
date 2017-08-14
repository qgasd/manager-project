import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, ResponseContentType, RequestMethod, Headers } from '@angular/http';
import { MenuService } from './menu.service/menu.service';
import { Menu} from './menu';
import { CheckLoginService } from '../checkLogin/checkLogin.service';
import {LoginService} from '../login/login.service';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [CheckLoginService,LoginService]
})
export class MenuComponent implements OnInit {
    public menulist:Array<Menu>;
    public menus: Menu[];
    public name : string;
    constructor(
        public http: Http,
        private menuservice:MenuService,
        private checkLoginService : CheckLoginService,
        private loginService : LoginService,
        public router: Router) {
      
    }

    ngOnInit() {
     this.getMenu();
     this.checkLoginService.checkLogin().subscribe(res=>{
            
              if(res.cookie==null){
                    if(!res.sign==true){
                        this.name = "未登录";
                    }else{
                        this.name = res.session.user.username;

                    }
                    if(res.session!=undefined)
                    if(res.session.sign==true){
                        this.name = res.session.user.username;
                       
                    }else{
                        this.name = "未登录";
                    }
             }else{
                 this.name = res.cookie.account.username;
                
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
    logoout(){
            return this.loginService.logoout().subscribe(res => {
                if(res === '清除成功'){
                     this.checkLoginService.checkLogin().subscribe(res=>{
                         
                     })
                    this.router.navigate(['/login']);
                }
            })
    }

}

