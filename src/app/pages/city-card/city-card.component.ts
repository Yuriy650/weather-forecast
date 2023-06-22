import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IForecast} from "../../interfaces/forecast.interface";

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnChanges {
  @Input() cityWeather: IForecast;
  @Input() isLoading: boolean = false;
  @Input() set errorMessage(err: string) {
    this.error = err;
  }
  @Input() set isCelsius(value: boolean) {
    this.isDegree = value;
  }
  public isDegree: boolean = false;
  public newIcon = '';
  public error = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    changes['cityWeather']?.currentValue ? this.cityWeather = changes['cityWeather'].currentValue : this.cityWeather;
    changes['isLoading']?.currentValue ? this.isLoading = changes['isLoading'].currentValue : this.isLoading;
    this.setIcon(this.cityWeather?.current?.condition.icon);
  }

  public setIcon(urlIcon: string) {
    if(urlIcon) this.newIcon = `${urlIcon.slice(0, 29)}128x128/${urlIcon.slice(35)}`;
  }
}
