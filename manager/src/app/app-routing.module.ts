import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { ResetPasswordComponent} from './reset-password/reset-password.component';
// Imports commented out for brevity
// Define the routes
const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'posts', component: PostsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
    {path: 'resetpassword', component: ResetPasswordComponent},
  ];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
