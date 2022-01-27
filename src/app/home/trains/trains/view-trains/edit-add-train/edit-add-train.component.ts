import { Time } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StationModel } from 'src/app/model/station-model';
import { TrainLayout } from 'src/app/model/train-layout';
import { TrainModel } from 'src/app/model/train-model';
import { TrainService } from 'src/app/shared/train.service';

@Component({
  selector: 'app-edit-add-train',
  templateUrl: './edit-add-train.component.html',
  styleUrls: ['./edit-add-train.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAddTrainComponent implements OnInit {

  isAddMode: boolean = false;
  trainId: number = -1;

  trainTypeFormGroup = this._formBuilder.group({
    trainType: ['', Validators.required],
  });

  stations = this._formBuilder.group({
    stationIds: this._formBuilder.array([]),
    locations: this._formBuilder.array([]),
    arrivals: this._formBuilder.array([]),
    departures: this._formBuilder.array([]),
    distances: this._formBuilder.array([]), 
    lines: this._formBuilder.array([]),
    orderNumbers: this._formBuilder.array([]),
  });

  cars = this._formBuilder.group({
    firstClass: [0],
    secondClass: [0],
    firstClassSleeper: [0],
    couchette: [0]
  });

  trainModel = new TrainModel('', [], new TrainLayout(-1,-1,-1,-1));

  count: number = 1;

  constructor(private _formBuilder: FormBuilder, private service: TrainService, private router: Router, private route: ActivatedRoute) {}

  trainDetailsObserver = {
    next: (res: any) => {
      this.trainType?.setValue(res.trainType);
      res.stations.forEach((station: any) => {
        this.addKnownStation(station.stationId, station.location, station.arriveTime, station.departureTime, station.distance, station.line, station.orderNumber);
      });
      this.firstClass?.setValue(res.trainLayout.firstClass);
      this.secondClass?.setValue(res.trainLayout.secondClass);
      this.firstClassSleeper?.setValue(res.trainLayout.firstClassSleeper);
      this.couchette?.setValue(res.trainLayout.couchette);
    },
    error: (err: any) => {
      console.log(err);
    }
  }

  ngOnInit() {
    this.clearStations();
    
    this.trainId = this.route.snapshot.params['trainId'];
    this.isAddMode = !this.trainId;

    if (this.isAddMode) {
      this.addStation();
      this.addStation();
    } else {
      this.service.getTrainDetails(this.trainId).subscribe(this.trainDetailsObserver);
      
    }
  }

  get trainType() {
    return this.trainTypeFormGroup.get('trainType');
  }

  get stationIds() {
    return this.stations.get('stationIds') as FormArray;
  }

  get locations() {
    return this.stations.get('locations') as FormArray;
  }

  get arrivals() {
    return this.stations.get('arrivals') as FormArray;
  }

  get departures() {
    return this.stations.get('departures') as FormArray;
  }

  get distances() {
    return this.stations.get('distances') as FormArray;
  }

  get lines() {
    return this.stations.get('lines') as FormArray;
  }

  get orderNumbers() {
    return this.stations.get('orderNumbers') as FormArray;
  }

  get firstClass() {
    return this.cars.get('firstClass');
  }

  get secondClass() {
    return this.cars.get('secondClass');
  }

  get firstClassSleeper() {
    return this.cars.get('firstClassSleeper');
  }

  get couchette() {
    return this.cars.get('couchette');
  }

  clearStations() {
    this.stationIds.clear();
    this.locations.clear();
    this.arrivals.clear();
    this.departures.clear();
    this.distances.clear();
    this.lines.clear();
    this.orderNumbers.clear();
    this.count = 0;
  }

  addStation() {
    this.stationIds.push(new FormControl(-1));
    this.locations.push(new FormControl(""));
    this.arrivals.push(new FormControl(""));
    this.departures.push(new FormControl(""));
    this.distances.push(new FormControl(""));
    this.lines.push(new FormControl(""));
    this.orderNumbers.push(new FormControl(this.count));
    this.count++;
  }

  addKnownStation(stationId: number, location: string, arrival: Time, departure: Time, distance: number, line: number, orderNumber: number) {
    this.stationIds.push(new FormControl(stationId));
    this.locations.push(new FormControl(location));
    this.arrivals.push(new FormControl(arrival));
    this.departures.push(new FormControl(departure));
    this.distances.push(new FormControl(distance));
    this.lines.push(new FormControl(line));
    this.orderNumbers.push(new FormControl(orderNumber));
  }

  observer = {
    next: (res: any) => {
      console.log(res);
    },
    error: (err: any) => {
      console.log(err);
    },
  };

  onSubmit() {
    this.trainModel.trainType = this.trainTypeFormGroup.get('trainType')?.value;
    const n = this.locations.length;
    for (let i = 0; i < n; i++) {
      this.trainModel.stations.push(new StationModel(this.locations.at(i).value, this.arrivals.at(i).value, this.departures.at(i).value, this.lines.at(i).value, this.orderNumbers.at(i).value))
    }
    this.trainModel.trainLayout = new TrainLayout(this.firstClass?.value, this.secondClass?.value, this.firstClassSleeper?.value, this.couchette?.value);

    console.log(this.trainModel);

    this.service.register(this.trainModel).subscribe(this.observer);
  }

}
