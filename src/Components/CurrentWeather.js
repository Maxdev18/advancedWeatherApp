import React from 'react';
import '../styling/currentWeather.css';

const CurrentWeather = (props) => {
    console.log(props.weatherData.temp);

    return(
        <div className="current-weather-container">
            <div className="current-temp-container">
                <h1 className="current-temp">{props.weatherData.temp}</h1>
                <p>{props.location}</p>
            </div>
            
        </div>
    )
}

export default CurrentWeather;