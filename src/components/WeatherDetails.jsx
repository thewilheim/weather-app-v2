import React from 'react'
import Sunrise from "../images/sunrise.svg";
import Sunset from "../images/sunset.svg"
import Pressure from "../images/pressure.svg"
import Wind from "../images/wind.svg"
import Temp from "../images/temp.svg"
import Visibility from "../images/visibility.svg"
import Humidity from "../images/rain-chance.svg"
import Rain from "../images/raindrop.svg"
import DetailsBox from "./DetailsBox.jsx";
import { format, fromUnixTime, differenceInHours,startOfHour } from "date-fns"

function WeatherDetails(props) {
    const {currentData, forecastData} = props

      const timeNow = startOfHour(new Date());
      const precipitationData = forecastData.list.filter(info => {
        if(differenceInHours(timeNow, startOfHour(fromUnixTime(info.dt))) > -5) {
          return info;
        }
      });

      const precipitation = Math.round(precipitationData[0].pop * 100) / 1;


    const weatherData = [
      {
        title: "Sunrise",
        data: format(new Date(fromUnixTime(currentData.sys.sunrise)), "p" ),
        image: Sunrise,
      },
      {
        title: "Sunset",
        data: format(new Date(fromUnixTime(currentData.sys.sunset)), "p" ),
        image: Sunset,
      },
      {
        title: "precipitation",
        data:`${precipitation}%`,
        image: Rain,
      },
      {
        title: "humidity",
        data: `${currentData.main.humidity}%`,
        image: Humidity,
      },
      {
        title: "wind",
        data:`${currentData.wind.speed} km/h`,
        image: Wind
      },
      {
        title: "pressure",
        data: `${currentData.main.pressure} hPa`,
        image: Pressure
      },
      {
        title: "feels like",
        data:`${Math.round(currentData.main.feels_like)}`,
        image: Temp
      },
      {
        title: "visibility",
        data:`${currentData.visibility / 100} KM`,
        image: Visibility,
      },
      
    ];
  return (
      <div className="weatherDetails">
        <h1>Weather Details</h1>
        <div className="detailsContainer">
          {weatherData.map(info => {
            return <DetailsBox key={info.title} title={info.title} data={info.data} image={info.image} a/>
          })}
        </div>
      </div>
  )
}

export default WeatherDetails