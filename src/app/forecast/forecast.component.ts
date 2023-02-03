import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Forecast } from '../services/types/forecast';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(private ws: WeatherService){}

  forecastForm!: FormGroup;
  cityForcast: Forecast[] = [];

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl()
    })
  };


  onSumbit(){
    console.log(this.forecastForm);
    this.cityForcast = [];

   this.ws.fiveDayForecast(this.forecastForm.value.forecastCity).subscribe(
      (data: any) => {

         for(let i=0; i < data.list.length; i+=8) {
              const forec = new Forecast(
                          data.list[i].dt_txt,
                          data.list[i].weather[0].icon,
                          data.list[i].main.temp_max,
                          data.list[i].main.temp_min);
              this.cityForcast.push(forec)
                    }
          }
    )
  }

}
