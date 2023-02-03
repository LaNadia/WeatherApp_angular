import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, take, mergeMap } from 'rxjs/operators';
import { ResolveLocationService } from '../services/resolve-location.service';

import { CurrentWeather } from '../services/types/current-weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit{
    
    myWeather: CurrentWeather | undefined;


    constructor(private ws: WeatherService, private route: ActivatedRoute){} // importing service
  

    ngOnInit(){

     let data: any;

     this.route.data.subscribe((d: any) => { // подписка на observable
      data = d['weather'];

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
     //---------Это если бы возвратили Data ------//
    // data = this.route.snapshot.data['weather'];
    // this.myWeather = new CurrentWeather(
    //             data.name,
    //             data.main.temp,
    //             data.weather[0].icon,
    //             data.weather[0].description,
    //             data.main.temp_max,
    //             data.main.temp_min
    //           );

    };


    onSubmit(form: NgForm) {
      let data: any;

        this.ws.getWeatherbyCity(form.value.city).subscribe((d) => {
          data = d;

          this.myWeather = new CurrentWeather(
            data.name,
            data.main.temp,
            data.weather[0].icon,
            data.weather[0].description,
            data.main.temp_max,
            data.main.temp_min
          );
          console.log(this.myWeather)
        })
    };

  
   
    
    
}
