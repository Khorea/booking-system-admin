import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user/user.component';
import { LoginComponent } from './user/user/login/login/login.component';
import { RegisterComponent } from './user/user/register/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material/material.module';
import { UserService } from './shared/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UsersComponent } from './home/users/users/users.component';
import { TrainsComponent } from './home/trains/trains/trains.component';
import { BookingsComponent } from './home/bookings/bookings/bookings.component';
import { ViewTrainsComponent } from './home/trains/trains/view-trains/view-trains.component';
import { EditAddTrainComponent } from './home/trains/trains/view-trains/edit-add-train/edit-add-train.component';
import { UserInfoComponent } from './home/user-info/user-info.component';
import { StationComponent } from './home/trains/trains/view-trains/edit-add-train/station/station.component';
import { StationsComponent } from './home/stations/stations.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    ViewTrainsComponent,
    EditAddTrainComponent,
    UserInfoComponent,
    StationComponent,
    StationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
    }),
    FormsModule,
    MaterialModule,
    NgbModule,
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
