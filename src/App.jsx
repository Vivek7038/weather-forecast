import React from 'react'
import WeatherCard from "./components/WeatherCard.jsx"
import Search from "./components/Search.jsx"
const App = () => {
  return (
    <div className=''>
      <h2 className='text-center text-2xl font-bold'>
        Weather Forecast Dashboard
      </h2>
      <div className='flex flex-col pl-4 pr-4  m-0'>
      <Search />
      <WeatherCard />
     
      </div>
    </div>
  )
}

export default App