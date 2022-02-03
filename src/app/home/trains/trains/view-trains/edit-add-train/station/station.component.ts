import { Component, OnInit, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationComponent implements OnInit {

  @Input() index: number = 0;
  
  @Input() stationForm: FormGroup = this._formBuilder.group({
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
