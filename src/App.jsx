import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard.jsx";
import Search from "./components/Search.jsx";
import ForecastCard from "./components/ForecastCard.jsx";
import axios from "axios";
import TemperatureToggle from "./components/TemperatureToggle.jsx";
import api from "./helpers/api.js";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("metric"); // Default to Celsius
  const [fiveDayData, setFiveDayData] = useState([]);
  //to toggle between celsius and fahrenhiet
  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };
  //to fetch 5 days forecast
  const fetchWeatherForecast = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api.key}`,
        { mode: "cors" }
      );

      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch weather forecast. Status code: ${response.status}`
        );
      }
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather forecast:", error.message);
      setLoading(false);
      throw error;
    }
  };

  //to fetch 5 days details
  const getFiveDayAvgWeather = async (lat, lon, apiKey) => {
    try {
      const weatherForecastData = await fetchWeatherForecast(lat, lon, apiKey);
      const dailyForecasts = weatherForecastData.list.reduce(
        (acc, forecast) => {
          const date = forecast.dt_txt.split(" ")[0];
          if (!acc[date]) {
            acc[date] = {
              minTemp: forecast.main.temp_min,
              maxTemp: forecast.main.temp_max,
              count: 1,
              weatherDescription: forecast.weather[0].description,
              weatherIcon: forecast.weather[0].icon,
            };
          } else {
            acc[date].minTemp = Math.min(
              acc[date].minTemp,
              forecast.main.temp_min
            );
            acc[date].maxTemp = Math.max(
              acc[date].maxTemp,
              forecast.main.temp_max
            );
            acc[date].count += 1;
          }
          return acc;
        },
        {}
      );

      const calculateAverageTemperature = (minTemp, maxTemp) => {
        return (minTemp + maxTemp) / 2;
      };

      const fiveDayAvgWeather = Object.keys(dailyForecasts).map((date) => {
        const { minTemp, maxTemp, count, weatherDescription, weatherIcon } =
          dailyForecasts[date];
        const avgTemperature = calculateAverageTemperature(minTemp, maxTemp);
        return { date, avgTemperature, weatherDescription, weatherIcon };
      });

      console.log("Five-day average weather:");
      console.log(fiveDayAvgWeather);
      setFiveDayData(fiveDayAvgWeather);
    } catch (error) {
      console.error("Error getting five-day average weather:", error.message);
      setLoading(false);
      return;
    }
  };

  // to fetch weather data based on city latitude and longitude
  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=${unit}`,
        { mode: "cors" }
      );

      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch weather data. Status code: ${response.status}`
        );
      }

      const data = response.data;
      const weatherForecastData = await fetchWeatherForecast(lat, lon);
      const forecastdata = await getFiveDayAvgWeather(lat, lon, api.key);
      setWeatherData(data);
      setSearchTerm("");
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setLoading(false);
      return;
    }
  };

  //function to fetch latitude and longitude based on searched city
  const fetchLatLong = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${api.key}`,
        { mode: "no-cors" }
      );
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      await fetchWeatherData(lat, lon);
    } catch (error) {
      setError("No City found ,please  enter correct city name ");
      setIsError(true);
      setLoading(false);
    }
  };
  function handleSearch() {
    setIsError(false);
    setError("");
    setLatitude(null);
    setLongitude(null);
    fetchLatLong();
  }

  // to trigger when toggles between celcius and fehrenhiet
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchWeatherData(latitude, longitude);
    }
  }, [unit]);
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

        <TemperatureToggle unit={unit} toggleUnit={toggleUnit} />

        <div className="lg:flex sm:flex-row flex-col">
          {isError ? <h1>{error}</h1> : <></>}
          <WeatherCard
            latitude={latitude}
            longitude={longitude}
            weatherData={weatherData}
            unit={unit}
            loading={loading}
          />
          <ForecastCard
            fiveDayData={fiveDayData}
            loading={loading}
            unit={unit}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
