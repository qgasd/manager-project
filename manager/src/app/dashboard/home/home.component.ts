import { Component, OnInit } from '@angular/core';
import { CheckLoginService } from '../../checkLogin/checkLogin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CheckLoginService]
})
export class HomeComponent implements OnInit {

  constructor(
    private checkLoginService : CheckLoginService,
    public router: Router,
  ) { }

  ngOnInit() {
     this.checkLoginService.checkLogin().subscribe(res=>{
             console.log(res.cookie==null);
             console.log(res);
             console.log(res.session);
              if(res.cookie==null){
                    if(!res.sign==true){
                        this.router.navigate(['/login']);
                    }else{
                        this.router.navigate(['/dashboard/*']);
                    }
                    if(res.session!=undefined)
                    if(res.session.sign==true){
                        console.log(res.session.sign);
                        this.router.navigate(['/dashboard/*']);
                    }else{
                        this.router.navigate(['/login']);
                    }
             }else{
                 this.router.navigate(['/dashboard/*']);
             }          
         })
  }

}
