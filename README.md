# ForeFlight Code Challenge: Airport Weather app

## Introduction
All major airports in the world have an ICAO code; It's a 4 character string uniquly identifiying an airport that
is used in aviation to plan flights. A few examples:
 - Odense Airport has the ICAO code: "EKOD",
 - Copenhagen Airport has the ICAO code: "EKCH",
 - John F. Kennedy International Airport (New York, US) has the ICAO code: "KJFK",

The _weather_ is an important part of flight planning and airports emit a report of the current and future weather conditions at its location.
This is standardized in the format of a METAR and TAF. A METAR describes the weather for the next hour (and are thus updated once per hour),
while a TAF describes the (expected) weather for the next ~24 hours.

The weather reports describe in detail a lot of different characteristics of the weather; important ones are:
 - visibility, 
 - tempeature,
 - pressure,
 - wind conditions (speed and direction),

The _time_ that the report was emitted and/or updated is also relevant.

In the following problems we want you to create a small app that allows the user
to lookup weather reports for any airport. You are provided with a REST API
that takes the ICAO code of an airport as input and returns the weather data as JSON:

    https://api.foreflight.com/weather/report/{ICAO}

(Note: all requests must inlude in the header: `x-ff-coding-exercise=true`)

Examples:

    https://api.foreflight.com/weather/report/EKOD
    https://api.foreflight.com/weather/report/KJFK

The JSON response looks like:

    {
      "report": {
        "conditions": {
          ...
        },
        "forecast": {
          ...,
          "conditions": [
            ...
          ]
        },
        "windsAloft": {}, // not used
        "mos": {} // not used
      }
    }

The current conditions (METAR) are found under `conditions`.
The future weather conditions (TAF) are found under `forecast`. The forecast contains itself an array of `conditions`,
corresponding to the (expected) weather conditions at smaller time intervals (e.g. 6 hours).

Note that there might be cases where an airport does not emit a weather report,
or where the weather report has some data missing.
We assume that the user knows the ICAO code of the airport(s) that they want to
examine.

More examples of ICAO codes for testing: EKBI EHAM LFPG EGLL KAUS KLAX OMDB YSSY

## Problems

For this code challenge we want you to code an _Angular web app_. We have provided
a _template_ that serve as a starting point for your app/page. We recommend that you
use this to get started since we have already setup a proxy to bypass CORS
when making requests to the provided API endpoint and provided an example of how to
call the API in `weather.component.ts` (at `/weather`).

You can run the webapp by executing in the project root:

    ng serve

---

### Problem 1

#### 1.1

Create a page (e.g. at `weather/metar`) to view _current_ weather conditions at an airport (i.e. the METAR).
The page should contain an input field to enter the ICAO code.

#### 1.2

Create a _new_ page (e.g. at `weather/taf`), similar to the previous one, with the ability to view the _future_ weather conditions
at an airport (i.e. the TAF).

#### 1.3

Create yet another page (e.g. at `weather/full`) where you can view both the METAR and TAF for any airport.

### Problem 2

#### 2.1
Let's imagine that the API for fetching the weather report was rather slow and
had to query some IO internally before sending the response back to you.

We can "simulate" that by modifying the call to the HTTP Client by adding a delay of 2500 ms:

    this.http.get("/weather/report/KCPR", { headers: headers }).pipe(
      delay(2500),
    ).subscribe({
      next: result => console.log(result),
    });

It's a good idea to give users an idea that the server is doing some heavy lifting and that they should wait patiently for content.

Add some loading text/icon/animation to your app when waiting for responses.

#### 2.2
Add a _caching mechanism_ to the app to allow users to see previous (successful) airport searches and display the relevant weather immediately,
without calling the API again.

---

### Inspiration

Here's a little inspiration for how to show weather conditions.

Current app design: https://www.youtube.com/watch?v=3q5JHpb8wm0&t=302s .

Current web design:

![Weather at EKRK](/weather_ekrk.png)
