import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44366/api'

  register(userModel: UserModel) {
    return this.http.post(this.BaseURI + '/User/Register', userModel);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/User/Login', formData);
  }

  getUserProfiles() {
    return this.http.get(this.BaseURI + '/Person');
  }

  getUserDetails(username: string) {
    return this.http.get(this.BaseURI + '/Person/PersonDetails', {params: {'username': username}});
  }
}
