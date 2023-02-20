import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { MetarComponent } from './components/metar/metar.component';
import { TafComponent } from './components/taf/taf.component';

import { WelcomeComponent } from './components/angular-welcome/welcome.component';
import { FullComponent } from './components/full/full.component';

const routes: Routes = [
  { path: "", redirectTo: "weather", pathMatch: "full" },
  { path: 'weather', component: WeatherComponent },
  { path: 'metar', component: MetarComponent },
  { path: 'taf', component: TafComponent },
  { path: 'full', component: FullComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
