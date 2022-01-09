import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/user/login/login/login.component';
import { RegisterComponent } from './user/user/register/register/register.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [ {path:'',redirectTo:'/user/login',pathMatch:'full'},
{
  path: 'user', component: UserComponent,
  children: [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
  ]
},
{path:'home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
