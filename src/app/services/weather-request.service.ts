import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IForecast} from "../interfaces/forecast.interface";
import {Observable, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherRequestService {
  private API_KEY = '352723c839f9451889e90345232006';
  private ROOT_URL = `https://api.weatherapi.com/v1/current.json?key=${this.API_KEY}`;
  constructor(private http: HttpClient) { }

  public getCurrentCityForecast(city: string): Observable<IForecast> {
    let params = new HttpParams();
    if (city) params = params.append('q', city);
    return this.http.get<IForecast>(this.ROOT_URL, {params}).pipe(
      shareReplay(1)
    );
  }
}
