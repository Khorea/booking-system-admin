import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsComponent implements OnInit {

  stations = this._formBuilder.group({
    location: ["", Validators.required],
    arriveTime: ["", Validators.required],
    departureTime: ["", Validators.required],
    distanceTraveled: [0, Validators.required],
    orderNumber: [0]
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
