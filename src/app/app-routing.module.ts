import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForecastComponent } from './forecast/forecast.component';
import { ResolveLocationService } from './services/resolve-location.service';
import { CurrentWeather } from './services/types/current-weather';
import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {path: '', component: WeatherComponent, resolve: {weather: ResolveLocationService}}, // вызываем Resolver
  {path: 'forecast', component: ForecastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
