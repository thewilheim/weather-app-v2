import React from 'react'
import Snowflake from "../images/snowflake.svg";
import Cloud from "../images/cloud.svg";
import Sunny from "../images/sun.svg";
import LocationPin from "../images/map-pin-fill.svg";
import { format, fromUnixTime, isAfter } from 'date-fns'
import TempBox from './TempBox';

function TempDetails(props) {
  const {currentData, forecastData} = props;

  const getImageByType = (type) => {
    switch (type) {
      case "Clouds":
        return Cloud
        break;
        
      case "Rain":
        return Cloud
        break;

      case "Clear":
        return Sunny
        break;

      case "Snow":
        return Snowflake
        break;
    }

  }

    const forcastInfo = [
    {
      time: "Now",
      temp: Math.round(currentData.main.temp),
      image: getImageByType(currentData.weather[0].main),
    },
  ];
  

  const dates = forecastData.list.slice(0,5).map(date => {

    if(isAfter(fromUnixTime(date.dt), new Date())) {

      return forcastInfo.push({
        time: format(fromUnixTime(date.dt), "h aaa"),
        temp: Math.round(date.main.temp),
        image: getImageByType(date.weather[0].main)
      },)

    }
  })



  const date = format(new Date(), 'EEE, d LLL');

  const regionName = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  )

  return (
      <div className="tempContainer">
        <div className="currentTemp">
          <div className="dateInfo">
            <div>
              <h2>Today</h2>
              <p>{date}</p>
            </div>
            <img src={getImageByType(currentData.weather[0].main)} alt="" />
          </div>
          <h1> {Math.round(currentData.main.temp)}&#176;</h1>
          <div className="locationInfo">
            <img src={LocationPin} alt="" />
            <h2>{currentData.name}, {regionName.of(currentData.sys.country)}</h2>
          </div>
        </div>
        <div className="hourlyTemp">
          {forcastInfo.map(info => {
            return <TempBox key={info.time} time={info.time} image={info.image} temp={info.temp}/>
          })}
        </div>
      </div>
  )
}

export default TempDetails