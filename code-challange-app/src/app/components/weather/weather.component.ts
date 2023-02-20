import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherData } from '../entities/weatherData';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { delay } from 'rxjs';
import { WeatherService } from 'app/service/weatherService';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {


  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
 
   }

  ngOnInit(): void {
    
  }

  }



