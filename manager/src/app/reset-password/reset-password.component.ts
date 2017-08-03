import {  Component, OnInit,EventEmitter,ElementRef,HostListener,ViewChild,Renderer } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reset',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    @ViewChild('contentbox')
    reset:ElementRef
    constructor(public router: Router) { }

    ngOnInit() {
        this.reset.nativeElement.style.height=window.innerHeight+'px';
     }



}
