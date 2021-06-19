import React, {useState, useEffect, useRef} from "react";
import CurrentWeather from './Components/CurrentWeather';
import './styling/App.css';

function App() {
  //API necessary information values
  let apiInfo = {
    city: '',
    cnt: 1
  }
  
  //Call, store and recieve API data
  const inputCity = useRef(null);
  let [apiWeatherData, setApiWeatherData] = useState({});

  function updateCity() {
    apiInfo.city = `${inputCity.current.value}`;
  }

  let fetchWeather = async () => {
    let data;

    //Just city API url information
    const API_KEY = '7b6a24eefe1c484589a203928211306';
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${apiInfo.city}&days=${apiInfo.cnt}&aqi=no&alerts=no`;

    try {
      const res = await fetch(url);
      data = await res.json();
      console.log(data);
      let weatherData = {
        temp: data.current.temp_f + "°F",
        humidity: data.current.humidity + "%",
        rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
        highTemp: data.forecast.forecastday[0].day.maxtemp_f + "°F",
        lowTemp: data.forecast.forecastday[0].day.mintemp_f + "°F",
        weatherStatus: data.current.condition.text,
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        sunset: data.forecast.forecastday[0].astro.sunrise,
        wind: data.current.wind_mph + "mph",
        wind_dir: data.current.wind_dir
      }
      setApiWeatherData(weatherData);
    } catch(err) {
        console.log(err);
      }
  }
  
  return (
    <div className="App">
      <header className="nav-container">
        <h1 className="nav-title nav-sibling">Weather</h1>
        <div className="search-bar-container">
          <input className="nav-sibling nav-search-bar" ref={inputCity} type="search" placeholder='Enter city...' />
          <button className="search-city" onClick={()=>{
            updateCity();
            fetchWeather();
            }}>Search</button>
        </div>
      </header>
      <CurrentWeather weatherData={apiWeatherData} location={apiInfo.city}/>
    </div>
  )
}

export default App;