import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface WeatherData {
    ICAO :            string,
    timestamp :       string,
    wind :            string,
    visibility :      string,
    temperature :     string,
    dewpoint :        string,
    humidity :        string,
    densityAltitude : string,
  }