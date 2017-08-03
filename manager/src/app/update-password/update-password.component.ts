import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  constructor(public router: Router) { }

    ngOnInit() { }

    onLoggedin() {
       console.info();
        localStorage.setItem('isLoggedin', 'true');
        
        this.router.navigate(['/dashboard']);
    }
}
