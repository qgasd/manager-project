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
            
              if(res.cookie==null){
                    if(!res.sign==true){
                        this.router.navigate(['/login']);
                    }else{
                        this.router.navigate(['/dashboard/home']);
                    }
                    if(res.session!=undefined)
                    if(res.session.sign==true){
                        this.router.navigate(['/dashboard/home']);
                    }else{
                        this.router.navigate(['/login']);
                    }
             }else{
                 this.router.navigate(['/dashboard/home']);
             }          
         })
  }

}
