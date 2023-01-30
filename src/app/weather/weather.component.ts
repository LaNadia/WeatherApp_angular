import { Component, OnInit } from '@angular/core';

import { CurrentWeather } from '../services/types/current-weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit{
    myWeather: CurrentWeather | undefined;
    location: GeolocationCoordinates | undefined;

    constructor(private ws: WeatherService){} // importing service

    ngOnInit(){
     // this.myWeather = this.ws.weatherNow(); // now we can use myWeather in html to pass the data (interpolation)
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;

        this.ws.localWeather(lat, lon).subscribe((data) => {
          console.log(data)
           this.myWeather = new CurrentWeather(
            data.name,
            data.main.temp,
            data.weather[0].icon,
            data.weather[0].description,
            data.main.temp_max,
            data.main.temp_min
           );

          
        })
      })
      
    }
}
