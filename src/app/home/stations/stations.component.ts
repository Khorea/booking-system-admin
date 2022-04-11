import { StationService } from 'src/app/shared/station.service';
import { StationModel } from 'src/app/model/station-model';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss'],
})
export class StationsComponent implements OnInit {
  public stations!: StationModel[];

  getStationsObserver = {
    next: (res: any) => {
      if (res) {
        this.stations = [...res];
      } else {
        this.stations = [];
      }
    },
    error: (err: any) => {
      console.log(err);
    },
  };

  addStationObserver = {
    next: (res: any) => {
      this.stations.push(res);
    },
    error: (err: any) => {
      console.log(err);
    },
  };

  deleteStationObserver = {
    next: (res: any) => {
      console.log(res);
      const index = this.stations.findIndex(
        (x) => x.stationId === res.stationId
      );
      this.stations.splice(index, 1);
    },
    error: (err: any) => {
      console.log(err);
    },
  };

  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.stationService.getStations().subscribe(this.getStationsObserver);
  }

  public addStation(nameInput: string) {
    if (nameInput === '') return;
    const newStation = new StationModel({
      name: nameInput,
    });
    this.stationService
      .addStation(newStation)
      .subscribe(this.addStationObserver);
  }

  public deleteStation(station: StationModel) {
    if (!station.stationId) return;
    this.stationService
      .deleteStation(station.stationId)
      .subscribe(this.deleteStationObserver);
  }
}
