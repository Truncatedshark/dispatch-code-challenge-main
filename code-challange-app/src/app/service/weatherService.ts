import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    constructor(private http: HttpClient) {

       }

       //Service klassen håndterer http get requestet med denne method
  getWeatherData(ICAO : any){
    const headers = new HttpHeaders().set('x-foreflight-odense', 'true');
    return this.http.get("/weather/report/" + ICAO, { headers: headers }) 
    
  }

}