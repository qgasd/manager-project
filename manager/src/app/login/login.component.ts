import { Component, OnInit,EventEmitter,ElementRef,HostListener,ViewChild,Renderer } from '@angular/core';
import { Router } from '@angular/router';

//import { LoginService } from '../services/index';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
     providers: [LoginService]
})

export class LoginComponent implements OnInit {

    constructor(
        public router: Router,
        private loginService:LoginService,
    ) { }
    @ViewChild('contentbox')
    logindiv:ElementRef
    ngOnInit() {
        this.logindiv.nativeElement.style.height=window.innerHeight+'px';
     }
    onLoggedin(name: string, password: string, ischecked: any) {
         this.loginService.getLogin(name, password, ischecked).subscribe(res =>{
             var trag = res.json().isok;
             if(trag){
                 this.router.navigate(['/dashboard/home']);
             }else{
                 alert("用户名或密码错误");
             }
         });
            
    }
    keyEnter(name: string, password: string, ischecked: any){
        this.onLoggedin(name,password,ischecked)
    }
    // onLoginout(){
    //     this.loginService.logoout()
    // }
}
