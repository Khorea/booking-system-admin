import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {}

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  
}
