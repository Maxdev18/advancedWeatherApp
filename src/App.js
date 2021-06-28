import React, {useState, useRef} from "react";
import CurrentWeather from './Components/CurrentWeather';
import './styling/App.css';

function App() {
  //API necessary information values
  let apiInfo = {
    city: '',
    cnt: 3
  }

  //Initial values for weather data
  //Wanted to use API with latitude and longitude to get instant data but this website doesn't support it
  //...So you have to make initial fake/dummy text values
  let weatherData = {
    temp: "76°F",
    humidity: "40%",
    rain: "17%",
    highTemp: "78°",
    lowTemp: "65°",
    weatherStatus: "Sunny",
    sunrise: "5:45 AM",
    sunset: "6:13 PM",
    wind: "8 mph",
    wind_dir: "SW",
    hourlyForecast: [],
    threeDayForecast: {
      currentDay: {
        highTemp: 78,
        lowTemp: 65,
        chanceOfRain: "17%"
      },
      nextDay: {
        highTemp: 76,
        lowTemp: 63,
        chanceOfRain: "24%"
      },
      afterNextDay: {
        highTemp: 81,
        lowTemp: 67,
        chanceOfRain: "4%"
      }
    }
  }
  
  //Call, store and recieve API data
  const inputCity = useRef(null);
  let [apiWeatherData, setApiWeatherData] = useState(weatherData);
  let [apiCity, setApiCity] = useState(apiInfo.city);

    let fetchWeather = async () => {
      //Reset search bar
      inputCity.current.value = '';
      inputCity.current.focus();

      //Just city API url information
      const API_KEY = '7b6a24eefe1c484589a203928211306';
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${apiCity}&days=${apiInfo.cnt}&aqi=no&alerts=no`;
      
      try {
        const res = await fetch(url);
        let data = await res.json();
      
        weatherData = {
          location: data.location.name,
          temp: data.current.temp_f + "°F",
          humidity: data.current.humidity + "%",
          rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
          highTemp: data.forecast.forecastday[0].day.maxtemp_f + "°",
          lowTemp: data.forecast.forecastday[0].day.mintemp_f + "°",
          weatherStatus: data.current.condition.text,
          sunrise: data.forecast.forecastday[0].astro.sunrise,
          sunset: data.forecast.forecastday[0].astro.sunrise,
          wind: data.current.wind_mph + "mph",
          wind_dir: data.current.wind_dir,
          hourlyForecast: data.forecast.forecastday[0].hour,
          threeDayForecast: {
            currentDay: {
              highTemp: data.forecast.forecastday[0].day.maxtemp_f,
              lowTemp: data.forecast.forecastday[0].day.mintemp_f,
              chanceOfRain: data.forecast.forecastday[0].day.daily_chance_of_rain
            }
          }
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
          <input className="nav-sibling nav-search-bar" ref={inputCity} type="search" placeholder='Enter city...' onChange={(e)=> setApiCity(e.target.value)} />
          <button className="search-city" onClick={()=>{
            fetchWeather();
            }}>Search</button>
        </div>
      </header>
      <CurrentWeather weatherData={apiWeatherData} />
    </div>
  )
}

export default App;