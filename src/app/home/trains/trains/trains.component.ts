import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.scss']
})
export class TrainsComponent implements OnInit {

  trainTypeFormGroup = this._formBuilder.group({
    trainType: ['', Validators.required],
  });

  stations = this._formBuilder.group({
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
    firstClassSlepper: [0],
    couchette: [0]
  });

  count: number = 1;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addStation();
    this.addStation();

    setTimeout(() => {
      console.log(JSON.stringify(this.stations.getRawValue()));
    }, 6000);
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

  addStation() {
    this.locations.push(new FormControl(""));
    this.arrivals.push(new FormControl(""));
    this.departures.push(new FormControl(""));
    this.distances.push(new FormControl(""));
    this.lines.push(new FormControl(""));
    this.orderNumbers.push(new FormControl(this.count));
    this.count++;
  }
}
