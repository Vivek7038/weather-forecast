import React, { useEffect, useState } from 'react'
import WeatherCard from "./components/WeatherCard.jsx"
import Search from "./components/Search.jsx";
import axios from 'axios';

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState("");
  const [isError,setIsError]=useState(false)
  const [loading,setLoading]=useState(false)
  const fetchLatLong = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${api.key}`)
      if (response.data.length===0) {
         setError("City not found. Please enter a valid city name.")
         isError(true)
         console.log(error)
         setLoading(false)
         return 
      }
      console.log(response.data[0].lon);
      setLatitude(response.data[0].lat)
      setLongitude(response.data[0].lon)
      setLoading(false)
    } catch (error) {
      setLatitude(null);
      setLongitude(null);
      setError(error.message); // Set an error message
      setLoading(false)

    }
  };
  function handleSearch(){
    fetchLatLong();
  }
  return (
    <div className=''>
      <h2 className='text-center text-2xl font-bold'>
        Weather Forecast Dashboard
      </h2>{error}
      <div className='flex flex-col pl-4 pr-4  m-0'>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  
      handleSearch={handleSearch}
      />
      {isError && (
        <div>{error}</div>
      )}
      <WeatherCard />
    <div>
      </div> 
      </div>
    </div>
  )
}

export default App
