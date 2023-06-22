import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ECities} from "../../enums/cities.enum";
import {Observable, Subscription} from "rxjs";
import {IForecast} from "../../interfaces/forecast.interface";
import {WeatherRequestService} from "../../services/weather-request.service";

@Component({
  selector: 'app-weather-content',
  templateUrl: './weather-content.component.html',
  styleUrls: ['./weather-content.component.scss']
})
export class WeatherContentComponent implements OnInit, OnDestroy {
  public cities: string[] = Object.values(ECities);
  public city = this.cities[0];
  public cityForecast$: Observable<IForecast> = this.weatherService.getCurrentCityForecast(this.city);
  public cityForecast: IForecast;
  public citySub: Subscription[] = [];
  public isCelsius = true;
  public isLoading = false;
  public errorMessage = '';

  constructor(private weatherService: WeatherRequestService) {}

  public ngOnInit() {
    this.getCityForecast();
  }

  public ngOnDestroy() {
    this.citySub.forEach(sub => sub.unsubscribe());
  }

  public getCityForecast() {
    this.isLoading = true;
    this.cityForecast$ = this.weatherService.getCurrentCityForecast(this.city);
    this.citySub.push(this.cityForecast$.subscribe((forecast: IForecast) => {
      this.cityForecast = forecast;
      this.isLoading = false;
    },
      ((err) => this.errorMessage = err.status + ' ' + err.error.error.message)));
  }

  public onChangeCity() {
    this.isLoading = true;
    this.cityForecast$ = this.weatherService.getCurrentCityForecast(this.city);
    this.citySub.push(this.cityForecast$.subscribe(
      (forecast: IForecast) => {
      this.cityForecast = forecast;
      this.isLoading = false;
    },
      (err) => this.errorMessage = err.status + ' ' + err.error.error.message
    )
    );
  }
}
