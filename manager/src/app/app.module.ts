import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
// Imports commented out for brevity

import { MenuService } from './menu/menu.service/menu.service';
import { RouterModule } from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { DashboardModule} from './dashboard/dashboard.module';
import { ResetPasswordComponent} from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DashboardModule
    

  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
