import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/model/user-details';
import { UserModel } from 'src/app/model/user-model';
import { UserService } from 'src/app/shared/user.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userDetails!: UserDetails[];
  dataSource = new MatTableDataSource<UserDetails>();
  displayedColumns: string[] = ['id', 'name', 'address', 'email', 'username', 'role'];
  constructor(private router: Router, private service: UserService) { }

  observer = {
    next: (res: any) => {
        console.log(res);
        this.dataSource.data = res;
        this.userDetails = res;
    },
    error: (err: any) => {
        console.log(err);
    }
  };

  ngOnInit() {
    this.service.getUserProfiles().subscribe(this.observer);
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filterData(value: string) {
    this.dataSource.filter = value;
  }

  show(name: string) {
    console.log(name);
    window.alert(`Clicked on ${name}`);
  }
}
