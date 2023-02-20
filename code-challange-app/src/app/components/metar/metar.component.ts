import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherData } from '../entities/weatherData';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { WeatherService } from 'app/service/weatherService';
import { delay } from 'rxjs';



@Component({
  selector: 'app-metar',
  templateUrl: './metar.component.html',
  styleUrls: ['./metar.component.scss']
})
export class MetarComponent implements OnInit {
     // @ts-ignore
     loginForm;
     // @ts-ignore
    weatherData;
    loading = false;
    weatherHistory : WeatherData[] = [] 
  
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
      this.loginForm.setValue({ICAO: weatherData.ICAO});
    }

  //Sætter komponentets weatherData til at være lig med Metar dataen fra resultet
    constructWeatherDataObject(_object: any){
      let c = this.loginForm.value.ICAO;
      this.weatherData = {
  
        ICAO :            c,
        timestamp :       _object.report.conditions.dateIssued,
        wind :            _object.report.conditions.wind,
        visibility :      _object.report.conditions.visibility,
        temperature :     _object.report.conditions.tempC,
        dewpoint :        _object.report.conditions.dewpointC,
        humidity :        _object.report.conditions.relativeHumidity,
        densityAltitude : _object.report.conditions.densityAltitudeFt
      } as WeatherData;
        this.addToHistory()
        this.loading = false;
      }
  
  //Tilføjer den nuværende weatherData til historikkens array og fjerner den ældste hvis den når en længde på mere end 5
      addToHistory(){
       this.weatherHistory.push(this.weatherData)
       if(this.weatherHistory.length > 5){
        this.weatherHistory.pop
       }
      }
}
