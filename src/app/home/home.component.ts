import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../model/user-details';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails = new UserDetails(-1, "", "", "", "", "");
  userFullName = 'HF';

  constructor(private router: Router, private service: UserService) { }

  updateUserButton = () => {
    const userBtn = document.querySelector(".userButton");
    const subStrings = this.userFullName.split(' ');
    userBtn != null ? userBtn.textContent = `${subStrings[0]?.charAt(0) || ''}`+
                                            `${subStrings[1]?.charAt(0) || ''}` : console.log("User button not found");
  }

  observer = {
    next: (res: any) => {
      console.log(res);
      this.userDetails = new UserDetails(-1, res.name, res.address, res.email, res.username, res.role);
      this.userFullName = this.userDetails.name;
      this.updateUserButton();
    },
    error: (err: any) => {
      console.log(err);
    },
  };

  ngOnInit() {
    const res: any = this.service.getUserDetails(localStorage.getItem('username') || '').subscribe(this.observer);
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/user/login']);
  }
}
