import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  readonly BaseURI = 'https://localhost:44366/api';
  getStations(): Observable<any> {
    return this.http.get(this.BaseURI + '/Station/get-all');
  }

  constructor(private http: HttpClient) {}
}
