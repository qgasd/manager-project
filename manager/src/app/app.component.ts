import { Component , OnInit} from '@angular/core';
import { Menu } from './menu/menu';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CheckLoginService } from './checkLogin/checkLogin.service';
//import { CookieService } from 'angular2-cookie/services/cookies.service';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [CheckLoginService]
  
})
export class AppComponent implements OnInit{

  constructor(
    private checkLoginService : CheckLoginService,
    public router: Router,
    //private _cookieService:CookieService
  ) { }

  ngOnInit() {
    this.checkLoginService.checkLogin().subscribe(res=>{
      
      if(res.cookie==null||res.cookie===undefined){
        if(res.sign===undefined){
          if(res.session!=undefined)
            if(res.session.sign==true){
        
            }else{
                this.router.navigate(['/login']);
            }
        }else if(!res.sign==true){
            this.router.navigate(['/login']);
        }else{
            
        }
        
      }else{
        
      }
      // if(res.cookie==null||res.cookie===undefined){
      //   if(res.sign===undefined){
      //     if(res.session!=undefined)
      //       if(res.session.sign==true){
        
      //       }else{
      //           this.router.navigate(['/login']);
      //       }
      //   }else if(!res.sign==true){
      //       this.router.navigate(['/login']);
      //   }else{
            
      //   }
        
      // }else{
      //   if(this._cookieService.get('account')!=null&&this._cookieService.get('account')!=undefined){
          
      //   }else{
      //     if(this._cookieService.get('sessionId')!=null&&this._cookieService.get('sessionId')!=undefined){
            
      //     }else{
      //     this.router.navigate(['/login']);
      //     }
      //   }
      // }
  
    })
  }
}
