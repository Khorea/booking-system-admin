import { StationModel } from 'src/app/model/station-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  readonly BaseURI = 'https://localhost:44366/api';

  constructor(private http: HttpClient) {}

  getStations(): Observable<any> {
    return this.http.get(this.BaseURI + '/Station/get-all');
  }

  addStation(station: StationModel): Observable<any> {
    return this.http.post(this.BaseURI + '/Station/', station);
  }

  deleteStation(stationId: number): Observable<any> {
    return this.http.delete(this.BaseURI + '/Station/', {
      params: { stationId: stationId },
    });
  }
}
