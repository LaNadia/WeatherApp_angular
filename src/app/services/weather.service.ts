import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {

 // myWeather: CurrentWeather 
  // = new CurrentWeather(
  //             'New York',
  //             '80',
  //             'https://www.pngplay.com/wp-content/uploads/12/Clip-Art-Sun-Background-PNG.png',
  //             'Sunny',
  //             '96',
  //             '72' );
  // API = '0f3fb9fa31ad3d41f1bb2bd0841c3f2f';
  // location : any;

  API = '0f3fb9fa31ad3d41f1bb2bd0841c3f2f';
  url = 'https://api.openweathermap.org/data/2.5/weather';

 
  constructor(private http: HttpClient) {}

  // pass to the view
  // weatherNow() {
  //   return this.current;
  // }


  // localWeather(lat:number, lon:number){
  //   return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API}&units=metric`).pipe(map((response: any) => response));
  
  //  // return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API}&units=metric`).subscribe(num => console.log(num))
  
  // }


  //lat: number, lon: number

  // data: any;
  //params: HttpParams = new HttpParams;

  localWeather(){

        let params: HttpParams = new HttpParams;
        let location: any;
 

        let promise = new Promise ((resolve, rej)=> {
                navigator.geolocation.getCurrentPosition((pos) => {
                    location = pos.coords;
                    const lat = location.latitude;
                    const lon = location.longitude;

                params = new HttpParams()
                    .set('lat', lat.toString())
                    .set('lon', lon.toString())
                    .set('appid', this.API)
                    .set('units', 'metric');

                
                console.log(params);

                firstValueFrom(this.http.get(this.url, {params: params})) // It return an Observable, we are working with Promises in this example so let’s convert it to a Promise
                  .then(
                    result => {
                      console.log(result);
                      resolve(result); // resolve promise with result when done
                    },
                    (error) => {
                      console.log(error);
                      rej('Geolocation is not supported by this browser.')
                    }
                  );
                })
              }     
          );

        return promise; 
 };


 getWeatherbyCity(city: string){

              let params: HttpParams = new HttpParams;

              params = new HttpParams()
                .set('q', city)
                .set('appid', this.API);

              return this.http.get(this.url, {params})
};


fiveDayForecast(city: string){

  let params: HttpParams = new HttpParams;
  let url = 'https://api.openweathermap.org/data/2.5/forecast'

              params = new HttpParams()
                .set('q', city)
                .set('appid', this.API)
                .set('units', 'metric');

              return this.http.get(url, {params})
      


  // https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
}


};
