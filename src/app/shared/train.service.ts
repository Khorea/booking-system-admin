import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrainModel } from '../model/train-model';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44366/api'

  register(trainModel: TrainModel) {
    return this.http.post(this.BaseURI + '/Train', trainModel);
  }

  getAllTrains() {
    return this.http.get(this.BaseURI + '/Train/AllTrains');
  }

  getTrainDetails(trainId: number) {
    return this.http.get(this.BaseURI + `/Train`, {params: {'trainId': trainId}});
  }

  deleteTrain(trainId: number) {
    return this.http.delete(this.BaseURI + '/Train', {params: {'trainId': trainId}});
  }
}
