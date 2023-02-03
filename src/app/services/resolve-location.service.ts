import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { async, forkJoin, Observable, of, Subscription } from 'rxjs';
import { catchError, first, map, mergeMap, take, tap } from 'rxjs/operators';
import { CurrentWeather } from './types/current-weather';
import { WeatherService } from './weather.service';
import { from } from "rxjs";

@Injectable()
export class ResolveLocationService implements Resolve<any>{ // данный Resolver позволяет нам вернуть результат запроса на сервер перед рендером компонента
  
  constructor(private ws: WeatherService, private http: HttpClient){

  }

  API = '0f3fb9fa31ad3d41f1bb2bd0841c3f2f';
  location : any;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //Your "resolve" function must result either Data, Observale<Data> or Promise<Data>.
   
   return from(this.ws.localWeather()) // возвращаем вместо promise observable, чтобы подписаться на него в компоненте

    // return this.ws.localWeather().then(res => res) // возвращаем Data из promise

  }

}