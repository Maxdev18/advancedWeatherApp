import React from 'react';
import '../styling/hourlyForecast.css';

const HourlyForecast = (props) => {
    
        let date = new Date();
        let currentHours = date.getHours();
        console.log(currentHours);

        return props.weatherData.hourlyForecast.map((hour) => {
            return (
                <div>
                    {props.weatherData.hourlyForecast[hour]}
                </div>
            )
        });
}

export default HourlyForecast;