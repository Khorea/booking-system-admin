import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TrainDetails } from 'src/app/model/train-details';
import { TrainService } from 'src/app/shared/train.service';

@Component({
  selector: 'app-view-trains',
  templateUrl: './view-trains.component.html',
  styleUrls: ['./view-trains.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTrainsComponent implements OnInit {

  dataSource = new MatTableDataSource<TrainDetails>();
  displayedColumns: string[] = ['trainId', 'trainType', 'departureTime', 'arrivalTime', 'departureStation', 'arrivalStation', 'totalDuration', 'stationCount', 'view', 'delete'];
  constructor(private router: Router, private service: TrainService) { }

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
    this.service.getAllTrains().subscribe(this.observer);
  }

  deleteObserver = {
    next: (res: any) => {
      console.log(res);
    },
    error: (err: any) => {
      console.log(err);
    }
  }

  deleteTrain(trainId: number) {
    this.service.deleteTrain(trainId).subscribe(this.deleteObserver);
  }
}
