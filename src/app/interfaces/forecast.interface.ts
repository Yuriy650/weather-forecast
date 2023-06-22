import {ICurrentWeather} from "./current-weather.interface";
import {ICityLocation} from "./city-location.interface";

export interface IForecast {
  location: ICityLocation,
  current: ICurrentWeather,
}
