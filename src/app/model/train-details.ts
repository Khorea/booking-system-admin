import { Time } from "@angular/common";

export class TrainDetails {

    /**
     *
     */
    constructor(public trainId: number,
        public trainType: string,
        public departureTime: Time,
        public arrivalTime: Time,
        public departureStation: string,
        public arrivalStation: string,
        public totalDuration: string,
        public stationCount: string) { 
    }

    
}
