import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherData } from '../entities/weatherData';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { delay } from 'rxjs';
import { WeatherService } from 'app/service/weatherService';


@Component({
  selector: 'app-taf',
  templateUrl: './taf.component.html',
  styleUrls: ['./taf.component.scss']
})
export class TafComponent implements OnInit {
     // @ts-ignore
     loginForm;
     // @ts-ignore
    weatherData;
    loading = false;
    conditionsArray: any[] = [];
    weatherHistory : any[] = [] 
  
    constructor(private http: HttpClient, private formBuilder: FormBuilder, private weatherService : WeatherService) {
      this.loginForm = this.formBuilder.group({
        ICAO: ['', [Validators.required]],
      });
     }
  
    ngOnInit(): void {

    }
    get f() { return this.loginForm.controls; }
  
  
  //Laver et http request til API'en med ICAO tallet som vi får fra HTML inputfeltet.
    getWeatherData(){
      this.loading = true;
      this.weatherService.getWeatherData(this.loginForm.value.ICAO).pipe(delay(2))
        .subscribe({
        next: result => this.constructWeatherDataObject(result)
      });
      
    }
  //Ændrer vejr Dataen når der trykkes på en tilsvarende knap i vejr-historikken
    changeWeatherData(weatherData : any){
      this.weatherData = weatherData;
      this.conditionsArray = weatherData.forecast.conditions
      this.loginForm.setValue({ICAO: weatherData.ICAO});
    }
  
  //Sætter komponentets weatherData til at være lig med forecasten fra resultet
    constructWeatherDataObject(_object: any){
      let c = this.loginForm.value.ICAO;
      this.weatherData = {
        ICAO :            c,
        forecast :      _object.report.forecast,
      } ;
      this.conditionsArray = this.weatherData.forecast.conditions
    this.addToHistory()
    this.loading = false;
    return this.weatherData
  
 
 }

//Tilføjer den nuværende weatherData til historikkens array og fjerner den ældste hvis den når en længde på mere end 5
 addToHistory(){
  this.weatherHistory.push(this.weatherData)
  if(this.weatherHistory.length > 5){
   this.weatherHistory.pop
  }
 }
}
