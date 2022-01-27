import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/model/user-model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInfoForm = this._formBuilder.group({
    address: ['', Validators.required],
    email: ['', Validators.email],
    name: ['', Validators.required],
    role: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [''],
    checkPassword: ['']
  });

  get address() {
    return this.userInfoForm.get('address');
  }

  get email() {
    return this.userInfoForm.get('email');
  }

  get name() {
    return this.userInfoForm.get('name');
  }

  get role() {
    return this.userInfoForm.get('role');
  }

  get username() {
    return this.userInfoForm.get('username');
  }

  get password() {
    return this.userInfoForm.get('password');
  }

  get checkPassword() {
    return this.userInfoForm.get('checkPassword');
  }

  oldUsername: string = '';

  constructor(private service: UserService, private router: Router, private _formBuilder: FormBuilder, private toastr: ToastrService) { }

  logObserver = {
    next: (res: any) => {
      console.log(res);
    },
    error: (err: any) => {
      console.log(err);
    }
  }

  userDetailsObserver = {
    next: (res: any) => {
      this.address?.setValue(res.address);
      this.email?.setValue(res.email);
      this.name?.setValue(res.name);
      this.role?.setValue(res.role);
      this.username?.setValue(res.username);
    },
    error: (err: any) => {
      this.toastr.error(err.message, "Could not retrieve user info");
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('username') === null) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/user/login');
    } else {
      this.oldUsername = localStorage.getItem('username') || '';
      this.service.getUserDetails(this.oldUsername).subscribe(this.userDetailsObserver);
    }
  }

  onSubmit() {
    const userModel = new UserModel(this.name?.value, this.address?.value, this.email?.value, this.username?.value, this.password?.value, this.role?.value)
    this.service.updateUser(userModel, this.oldUsername).subscribe(this.logObserver);
  }
}
