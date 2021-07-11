import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {

  @Input()
  ip: string;
  @Input()
  zone: string;
  time = '';
  cityCode = '';
  cityName = '';


  tempDescription = '';
  humidity = '';
  wind = '';
  localDate = '';
  main_icon = '';
  mainTemperature: number;
  mainTempHot: number;
  mainTempLow: number;

  unitIsCelcius = true;
  globalForecast = [];
  forecast = {
    list: []
  };

  // Maps the API's icons to the ones from https://erikflowers.github.io/weather-icons/
  weatherIconsMap = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-showers",
    "09n": "wi-showers",
    "10d": "wi-day-hail",
    "10n": "wi-night-hail",
    "11d": "wi-thunderstorm",
    "11n": "wi-thunderstorm",
    "13d": "wi-snow",
    "13n": "wi-snow",
    "50d": "wi-fog",
    "50n": "wi-fog"
  };
  constructor(private _eventService: EventService, private router: Router,) {

  }

  ngOnInit(): void {
    this.getClientPosition();
    this.startClock();
  }

  startClock() {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString(undefined, { timeZone: this.zone });
    }, 1000);
  }


  getClientPosition() {
    this._eventService.getClientPosition(this.ip).subscribe(
      data => {
        this.cityName = data.city;
        this.cityCode = data.country;
        this.getWeatherData(data.latitude, data.longitude);
        console.log(data)
      },
      (error) => console.log(error)
    );
  }


  getWeatherData(latitude, longitude) {
    this._eventService.getWeatherData(latitude, longitude).subscribe(
      data => {
        this.globalForecast = data;
        this.updateForecast(data);
      },
      (error) => console.log(error)
    );
  }

  updateForecast(ft) {

    this.forecast = ft;
    // Present day
    const today = this.forecast.list[0];
    this.tempDescription = today.weather[0].description;
    this.humidity = today.humidity;
    this.wind = today.speed;
    this.localDate = this.getFormattedDate(today.dt);
    this.main_icon = this.weatherIconsMap[today.weather[0].icon];
    this.mainTemperature = Math.round(today.temp.day);
    this.mainTempHot = Math.round(today.temp.max);
    this.mainTempLow = Math.round(today.temp.min);


    // Following days data
    this.forecast.list = this.forecast.list.slice(1);
    this.forecast.list.forEach(element => {
      console.log(element)
      element.dt = this.getFormattedDate(element.dt).substring(0, 3);
      element.weather = this.weatherIconsMap[element.weather[0].icon];
    });
  }

  getFormattedDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date * 1000).toLocaleDateString("en-US", options);
  }
}
