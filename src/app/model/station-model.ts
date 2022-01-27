import { Time } from "@angular/common";

export class StationModel {
    stationId?: any;
    constructor(
        public location: string,
        public arriveTime: Time,
        public departureTime: Time,
        public distance: number,
        public line: number,
        public orderNumber: number,
    ) {  }
}
