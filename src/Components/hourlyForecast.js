import React from 'react';
import '../styling/hourlyForecast.css';

const HourlyForecast = (props) => {
        //Get cuurent hours in order to display the weather
        //for the remaining hours left for the day
        let date = new Date();
        let currentHour = date.getHours();
        let hourForecast = props.weatherData.hourlyForecast.slice(currentHour);

    return (
        <div className="hourly-weather">
            {hourForecast.map((hour, i) => (
                <div className="hour-container" key={"a" + i}>
                    <div key={i} className="hour-forecast">{hour.time.split(' ').splice(1)}</div>
                    <div className="hour-temp" key={"b"+i}>{Math.floor(hour.temp_f)}</div>
                </div>
            ))}
        </div>
    )
}

export default HourlyForecast;