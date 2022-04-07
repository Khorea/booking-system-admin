import { ConnectionModel } from './../../../../../model/connection-model';
import { Time } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StationModel } from 'src/app/model/station-model';
import { TrainLayout } from 'src/app/model/train-layout';
import { TrainModel } from 'src/app/model/train-model';
import { TrainService } from 'src/app/shared/train.service';
import { StationService } from 'src/app/shared/station.service';

@Component({
  selector: 'app-edit-add-train',
  templateUrl: './edit-add-train.component.html',
  styleUrls: ['./edit-add-train.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAddTrainComponent implements OnInit {
  public stations!: StationModel[];

  isAddMode: boolean = false;
  trainId: number = -1;

  trainTypeFormGroup = this._formBuilder.group({
    trainType: ['IR', Validators.required],
  });

  itinerary = this._formBuilder.group({
    stationIds: this._formBuilder.array([]),
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
    couchette: [0],
  });

  trainModel = new TrainModel('', [], new TrainLayout(-1, -1, -1, -1));

  count: number = 1;

  constructor(
    private _formBuilder: FormBuilder,
    private trainService: TrainService,
    private stationService: StationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  trainDetailsObserver = {
    next: (res: any) => {
      this.trainType?.setValue(res.trainType);
      res.stations.forEach((station: any) => {
        this.addExistingStation(
          station.stationId,
          station.arriveTime,
          station.departureTime,
          station.distance,
          station.line,
          station.orderNumber
        );
      });
      this.firstClass?.setValue(res.trainLayout.firstClass);
      this.secondClass?.setValue(res.trainLayout.secondClass);
      this.firstClassSleeper?.setValue(res.trainLayout.firstClassSleeper);
      this.couchette?.setValue(res.trainLayout.couchette);
    },
    error: (err: any) => {
      console.log(err);
    },
  };

  getStationsObserver = {
    next: (res: any) => {
      this.stations = res.result;
      console.log(this.stations);
    },
    error: (err: any) => {
      console.log(err);
    },
  };

  ngOnInit() {
    this.clearItinerary();
    this.trainId = this.route.snapshot.params['trainId'];
    this.isAddMode = !this.trainId;

    if (this.isAddMode) {
      this.addToItinerary();
      this.addToItinerary();
    } else {
      this.trainService
        .getTrainDetails(this.trainId)
        .subscribe(this.trainDetailsObserver);
    }
    this.stationService.getStations().subscribe(this.getStationsObserver);
  }

  get trainType() {
    return this.trainTypeFormGroup.get('trainType');
  }

  get stationIds() {
    return this.itinerary.get('stationIds') as FormArray;
  }

  get arrivals() {
    return this.itinerary.get('arrivals') as FormArray;
  }

  get departures() {
    return this.itinerary.get('departures') as FormArray;
  }

  get distances() {
    return this.itinerary.get('distances') as FormArray;
  }

  get lines() {
    return this.itinerary.get('lines') as FormArray;
  }

  get orderNumbers() {
    return this.itinerary.get('orderNumbers') as FormArray;
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

  clearItinerary() {
    this.stationIds.clear();
    this.arrivals.clear();
    this.departures.clear();
    this.distances.clear();
    this.lines.clear();
    this.orderNumbers.clear();
    this.count = 0;
  }

  addToItinerary() {
    this.stationIds.push(new FormControl(-1));
    this.arrivals.push(new FormControl('', Validators.required));
    this.departures.push(new FormControl('', Validators.required));
    this.distances.push(new FormControl(0));
    this.lines.push(new FormControl(0));
    this.orderNumbers.push(new FormControl(this.count));
    this.count++;
  }

  addExistingStation(
    stationId: number,
    arrival: Time,
    departure: Time,
    distance: number,
    line: number,
    orderNumber: number
  ) {
    this.stationIds.push(new FormControl(stationId));
    this.arrivals.push(new FormControl(arrival));
    this.departures.push(new FormControl(departure));
    this.distances.push(new FormControl(distance));
    this.lines.push(new FormControl(line));
    this.orderNumbers.push(new FormControl(orderNumber));
  }

  logObserver = {
    next: (res: any) => {
      console.log(res);
    },
    error: (err: any) => {
      console.log(err);
    },
  };

  updateTrainObserver = {
    next: (res: any) => {
      this.toastr.success('Train updated successfully', 'Update complete!');
    },
    error: (err: any) => {
      this.toastr.error('Train was not updated', 'Update failed!');
      console.log(err);
    },
  };

  addTrainObserver = {
    next: (res: any) => {
      this.toastr.success('Train inserted successfully', 'Insertion complete!');
      this.router.navigateByUrl('/home/trains');
    },
    error: (err: any) => {
      this.toastr.error(
        'Could not insert new train, check data',
        'Insertion failed!'
      );
      console.log(err);
    },
  };

  onSubmit() {
    this.trainModel.trainType = this.trainTypeFormGroup.get('trainType')?.value;
    const n = this.stationIds.length;
    for (let i = 0; i < n - 1; i++) {
      let newConnection = new ConnectionModel({
        startStationId: this.stationIds.at(i).value,
        endStationId: this.stationIds.at(i + 1).value,
        arriveTime: this.arrivals.at(i).value,
        departureTime: this.departures.at(i).value,
        distance: this.distances.at(i).value,
        line: this.lines.at(i).value,
        orderNumber: this.orderNumbers.at(i).value,
      });
      this.trainModel.connections.push(newConnection);
    }
    this.trainModel.trainLayout = new TrainLayout(
      this.firstClass?.value,
      this.secondClass?.value,
      this.firstClassSleeper?.value,
      this.couchette?.value
    );

    console.log(this.trainModel);

    if (this.isAddMode) {
      this.trainService
        .register(this.trainModel)
        .subscribe(this.addTrainObserver);
    } else {
      this.trainService
        .updateTrain(this.trainId, this.trainModel)
        .subscribe(this.updateTrainObserver);
    }
  }
}
