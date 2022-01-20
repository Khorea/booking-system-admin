import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel = new LoginModel("", "", "admin");

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');

    let form = document.querySelector(".wrapped-div");
    form?.classList.remove("register");
  }

  observer = {
    next: (res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      this.router.navigateByUrl('/home');
    },
    error: (err: any) => {
      if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
    },
  };

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(this.observer);
  }
}
