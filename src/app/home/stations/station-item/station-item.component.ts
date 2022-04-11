import { StationModel } from 'src/app/model/station-model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-station-item',
  templateUrl: './station-item.component.html',
  styleUrls: ['./station-item.component.scss'],
})
export class StationItemComponent implements OnInit {
  @Input() station!: StationModel;
  @Output() deleteItemEvent = new EventEmitter<StationModel>();

  constructor() {}

  ngOnInit(): void {}

  public onDelete() {
    this.deleteItemEvent.emit(this.station);
  }
}
