import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

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

  register() {
    var body = {
      Name: this.formModel.value.Name,
      Address: this.formModel.value.Address,
      Email: this.formModel.value.Email,
      UserName: this.formModel.value.Passwords.UserName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + '/User/Register', body);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/User/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/Person');
  }
}
