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

  formModel = this.fb.group({
    Name: ['', Validators.required],
    Address: ['', Validators.required],
    Email: ['', Validators.email],
    UserName: ['', Validators.required],
    Password: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(4)]]
    }, {validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    let password = fb.get('Password');
    let confirmPassword = fb.get('ConfirmPassword');
    if (password == null || confirmPassword == null)
      return;

    if (password.value != confirmPassword.value)
    confirmPassword.setErrors({ passwordMissmatch: true });
    else 
    confirmPassword.setErrors(null);
  }

  register(userModel: UserModel) {
    return this.http.post(this.BaseURI + '/User/Register', userModel);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/User/Login', formData);
  }

  getUserProfiles() {
    return this.http.get(this.BaseURI + '/Person');
  }
}
