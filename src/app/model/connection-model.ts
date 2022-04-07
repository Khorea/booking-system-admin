import { Time } from '@angular/common';

export class ConnectionModel {
  public startStationId: number;
  public endStationId: number;
  public arriveTime: Time;
  public departureTime: Time;
  public distance: number;
  public line: number;
  public orderNumber: number;
  constructor(connection: ConnectionModel) {
    (this.startStationId = connection.startStationId),
      (this.endStationId = connection.endStationId),
      (this.arriveTime = connection.arriveTime),
      (this.departureTime = connection.departureTime),
      (this.distance = connection.distance),
      (this.line = connection.line),
      (this.orderNumber = connection.orderNumber);
  }
}
