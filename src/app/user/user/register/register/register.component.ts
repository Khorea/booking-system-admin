import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/model/user-model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userModel = new UserModel("", "", "", "", "", "admin");

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    let form = document.querySelector(".wrapped-div");
    form?.classList.add("register");
  }

  observer = {
    next: (res: any) => {
      this.router.navigateByUrl('/user/login');
    },
    error: (err: any) => {
      if (err.status == 400)
          this.toastr.error(err, 'Registration failed.');
        else
          console.log(err);
    },
  };

  onSubmit() {
    this.service.register(this.userModel).subscribe(this.observer);
  }

}
