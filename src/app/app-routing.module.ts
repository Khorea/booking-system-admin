import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BookingsComponent } from './home/bookings/bookings/bookings.component';
import { HomeComponent } from './home/home.component';
import { TrainsComponent } from './home/trains/trains/trains.component';
import { EditAddTrainComponent } from './home/trains/trains/view-trains/edit-add-train/edit-add-train.component';
import { UserInfoComponent } from './home/user-info/user-info.component';
import { UsersComponent } from './home/users/users/users.component';
import { LoginComponent } from './user/user/login/login/login.component';
import { RegisterComponent } from './user/user/register/register/register.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [ { path:'',redirectTo:'/user/login',pathMatch:'full'},
{
  path: 'user', component: UserComponent,
  children: [
    { path: 'register', component: RegisterComponent },
     { path: 'login', component: LoginComponent }
  ]
},
{path:'home',component:HomeComponent, canActivate: [AuthGuard],
children: [
  { path: 'users', component: UsersComponent },
  { path: 'trains', component: TrainsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'trains/edit-add-train/:trainId', component: EditAddTrainComponent },
  { path: 'trains/edit-add-train', component: EditAddTrainComponent }
]},
{path:'userInfo', component:UserInfoComponent, canActivate: [AuthGuard] }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
