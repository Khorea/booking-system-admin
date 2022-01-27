import { StationModel } from "./station-model";
import { TrainLayout } from "./train-layout";

export class TrainModel {
    constructor(
        public trainType: string,
        public stations: Array<StationModel>,
        public trainLayout: TrainLayout,
    ) {  }
}
