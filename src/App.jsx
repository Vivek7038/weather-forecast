import React, { useEffect, useState } from 'react'
import WeatherCard from "./components/WeatherCard.jsx"
import Search from "./components/Search.jsx";
import axios from 'axios';

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};


const App = () => {
  const [searchTerm, setSearchTerm] = useState("aurangabad");
  const [cityName, setCityName] = useState('aurangabad');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const fetchLatLong = async () => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api.key}`)
      console.log(response)
      if (response.data.length === 0) {
        throw new Error('City not found. Please enter a valid city name, state code, and country code.');
      }
        console.log(response.data, "data is here ")
      setError(null); // Clear any previous errors
    } catch (error) {
      setLatitude(null);
      setLongitude(null);
      setError(error.message); // Set an error message
    }
  };
  useEffect(()=>{fetchLatLong()},[fetchLatLong])
  return (
    <div className=''>
      <h2 className='text-center text-2xl font-bold'>
        Weather Forecast Dashboard
      </h2>
      <div className='flex flex-col pl-4 pr-4  m-0'>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
      <WeatherCard />
     
      </div>
    </div>
  )
}

export default App
