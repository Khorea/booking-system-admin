import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user/user.component';
import { LoginComponent } from './user/user/login/login/login.component';
import { RegisterComponent } from './user/user/register/register/register.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material/material.module';
import { UserService } from './shared/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UsersComponent } from './home/users/users/users.component';
import { TrainsComponent } from './home/trains/trains/trains.component';
import { BookingsComponent } from './home/bookings/bookings/bookings.component';
import { StationsComponent } from './home/trains/trains/stations/stations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    TrainsComponent,
    BookingsComponent,
    StationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    MaterialModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
