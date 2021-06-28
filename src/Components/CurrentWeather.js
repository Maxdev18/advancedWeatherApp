import React from 'react';
import HourlyForecast from './HourlyForecast';
import '../styling/currentWeather.css';

const CurrentWeather = (props) => {

    return(
        <div className="current-weather-container">
            <div className="current-temp-container">
                <h3 className="current-location">{props.weatherData.location}</h3>
                <div className="temp-container">
                    <h1 className="current-temp">{props.weatherData.temp}</h1>
                    <div className="quick-weather-info">
                        <h3 className="high-low-temp">{props.weatherData.highTemp + '/' + props.weatherData.lowTemp}</h3>
                        <p className="weather-status">{props.weatherData.weatherStatus}</p>
                    </div>
                </div>
                <div className="hourly-forecast-container">
                    <HourlyForecast weatherData={props.weatherData}/>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;