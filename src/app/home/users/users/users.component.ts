import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/model/user-details';
import { UserModel } from 'src/app/model/user-model';
import { UserService } from 'src/app/shared/user.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource = new MatTableDataSource<UserDetails>();
  displayedColumns: string[] = ['id', 'name', 'address', 'email', 'username', 'role'];
  constructor(private router: Router, private service: UserService) { }

  observer = {
    next: (res: any) => {
        console.log(res);
        this.dataSource.data = res;
    },
    error: (err: any) => {
        console.log(err);
    }
  };

  ngOnInit() {
    this.service.getUserProfiles().subscribe(this.observer);
  }

}