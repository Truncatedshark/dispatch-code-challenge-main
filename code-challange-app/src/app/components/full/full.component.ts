import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherData } from '../entities/weatherData';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { WeatherService } from 'app/service/weatherService';
import { delay } from 'rxjs';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
     // @ts-ignore
     loginForm;
     // @ts-ignore
    weatherDataMetar;
     // @ts-ignore
    weatherDataTaf;
    loading = false;
    weatherHistory : any[] = [] 
    conditionsArray: any[] = [];

  
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
        next: result => this.constructFull(result)
      });
    }
  

  //Sætter både weatherDataMetar og conditionsArray for at display dem
    changeWeatherData(weatherData : any){
      this.weatherDataMetar = weatherData;
      this.conditionsArray = weatherData.forecast.conditions
      this.loginForm.setValue({ICAO: weatherData.ICAO});
    }
  //Konstruerer både et weatherDataMetar objekt, som indeholder Metar Dataen, og et weatherDataTaf objekt som indeholder Taf forecast
    constructFull(_object: any){
      console.log("_object is:" + this.weatherDataMetar)
      let c = this.loginForm.value.ICAO;
      this.weatherDataMetar = {
  
        ICAO :            c,
        timestamp :       _object.report.conditions.dateIssued,
        wind :            _object.report.conditions.wind,
        visibility :      _object.report.conditions.visibility,
        temperature :     _object.report.conditions.tempC,
        dewpoint :        _object.report.conditions.dewpointC,
        humidity :        _object.report.conditions.relativeHumidity,
        densityAltitude : _object.report.conditions.densityAltitudeFt
      } as WeatherData;

      this.weatherDataTaf = {
        ICAO :            c,
        forecast :      _object.report.forecast,
      } ;
      this.conditionsArray = this.weatherDataTaf.forecast.conditions
    this.addToHistory()
    this.loading = false;
    }

  //Tilføjer weatherDataMetar til historikken, da changeWeatherData bruger ICAO som parameter er det unødvendigt også at tilføje Taf
    addToHistory(){
       this.weatherHistory.push(this.weatherDataMetar)
       if(this.weatherHistory.length > 5){
        this.weatherHistory.pop
       }
      }
}
