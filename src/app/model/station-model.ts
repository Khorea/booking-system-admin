import { Time } from "@angular/common";

export class StationModel {
    constructor(
        public location: string,
        public arriveTime: Time,
        public departureTime: Time,
        public line: number,
        public orderNumber: number,
    ) {  }
}
