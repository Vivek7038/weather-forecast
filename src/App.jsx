import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard.jsx";
import Search from "./components/Search.jsx";
import ForecastCard from "./components/ForecastCard.jsx";
import axios from "axios";
import TemperatureToggle from "./components/TemperatureToggle.jsx";

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null); 
  const [unit, setUnit] = useState('metric'); // Default to Celsius

  //to toggle between celsius and fahrenhiet
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };
  //to fetch 5 days forecast
  const fetchWeatherForecast = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api.key}`
      );
  
      if (response.status !== 200) {
        throw new Error(`Failed to fetch weather forecast. Status code: ${response.status}`);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching weather forecast:', error.message);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };
  
  // to fetch weather data based on city latitude and longitude
  const fetchWeatherData = async (lat , lon) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=${unit}`
      );

      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch weather data. Status code: ${response.status}`
        );
      }

      const data = response.data;
      // const weatherForecastData = await fetchWeatherForecast(lat, lon)
      setWeatherData(data);
      setLoading(false)
      setSearchTerm("")
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      return 
    }
  };
  const fetchLatLong = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${api.key}`
      );
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      await fetchWeatherData(lat, lon);
      
    } catch (error) {
      setError(error.message); 
      setLoading(false);
    }
  };
  function handleSearch() {
    fetchLatLong();
  }
  useEffect(()=>{
    if(latitude!==null && longitude!==null){
      return 
      fetchWeatherData(latitude,longitude);
    }
  },[unit])
  return (
    <div className="h-full">
      <h2 className="text-center text-2xl font-bold">
        Weather Forecast Dashboard
      </h2>
      <div className="flex flex-col pl-4 pr-4  m-0">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      <TemperatureToggle unit={unit} toggleUnit={toggleUnit}/>
        <div className="lg:flex sm:flex-row flex-col">
        <WeatherCard
         latitude={latitude}
         longitude={longitude}
         weatherData={weatherData}
         unit={unit}
         loading={loading}
        />
        <ForecastCard />
        </div>
      </div>

    </div>
  );
};

export default App;
