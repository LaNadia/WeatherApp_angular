import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CurrentWeather } from './types/current-weather';

@Injectable()
export class WeatherService {

  current: CurrentWeather = new CurrentWeather(
              'New York',
              '80',
              'https://www.pngplay.com/wp-content/uploads/12/Clip-Art-Sun-Background-PNG.png',
              'Sunny',
              '96',
              '72' );

    API = '0f3fb9fa31ad3d41f1bb2bd0841c3f2f';

  constructor(private http: HttpClient) { }

  // pass to the view
  weatherNow() {
    return this.current;
  }


  localWeather(lat:number, lon:number){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API}&units=metric`).pipe(map((response: any) => response));
  
   // return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API}&units=metric`).subscribe(num => console.log(num))
  
  }
}
