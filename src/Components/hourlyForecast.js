import React from 'react';
import '../styling/hourlyForecast.css';

const HourlyForecast = (props) => {
        let date = new Date();
        let currentHour = date.getHours();
        console.log(currentHour);

        let hourForecast = props.weatherData.hourlyForecast.slice(currentHour);
        console.log(hourForecast)

    return (
        <div className="hourly-weather">
            {hourForecast.map((hour, i) => (
                <div className="hour-container">
                    <div key={i} className="hour-forecast">{hour.time.split(' ').splice(1)}</div>
                    <div className="hour-temp" key={"a"+i}>{hour.temp_f}</div>
                </div>
            ))}
        </div>
    )
}

export default HourlyForecast;