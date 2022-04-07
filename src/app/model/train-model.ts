import { ConnectionModel } from './connection-model';
import { TrainLayout } from './train-layout';

export class TrainModel {
  constructor(
    public trainType: string,
    public connections: Array<ConnectionModel>,
    public trainLayout: TrainLayout
  ) {}
}
