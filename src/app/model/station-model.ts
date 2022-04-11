export class StationModel {
  public stationId?: number;
  public name: string;
  constructor(station: StationModel) {
    this.stationId = station.stationId;
    this.name = station.name;
  }
}
