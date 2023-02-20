import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WelcomeComponent } from './components/angular-welcome/welcome.component';
import { MetarComponent } from './components/metar/metar.component';
import { TafComponent } from './components/taf/taf.component';
import { FullComponent } from './components/full/full.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WelcomeComponent,
    MetarComponent,
    TafComponent,
    FullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports:[MatInputModule,MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
