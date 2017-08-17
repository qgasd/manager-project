import { Component, OnInit } from '@angular/core';
import { Ipconfigs } from "app/checkLogin/ipconfigs";
@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor() { }
    ngOnInit(): void {
    }
}
