import React, { useEffect } from "react";
import { getWindDirection } from "../helpers/helper";
import iconChanger from "../helpers/iconChanger";
import { RotatingLines } from "react-loader-spinner";
const WeatherCard = ({ weatherData,unit, loading }) => {

  const windDirection = getWindDirection(weatherData?.wind.deg);
  const unitIcon=(unit=="imperial" ? "°F" : "°C")
  
  return (
    <>
    {loading && <div className="flex flex-row items-center justify-center w-full ">
       <RotatingLines />
      </div>}
      {loading || weatherData && (
         <div className="pb-8 md:pr-8">
         <div className="flex items-center justify-center md:justify-start bg-black rounded-md w-full ">

       {loading ? (
        <RotatingLines 
        height="96"
        width="96"
        />
       ):(
        <div className="flex flex-col  rounded p-4 w-full  max-w-md flex-wrap">
        <div className="font-bold text-white text-xl">{weatherData?.name}</div>
        <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-white-400 h-24 w-24">
        {iconChanger(weatherData?.weather[0].main)}
                </div>
        <div className="flex flex-row items-center justify-center mt-6 ">
          <div className="font-medium text-6xl text-white">{`${weatherData.main.temp}${unitIcon}`}</div>
          <div className="flex flex-col items-center ml-6 text-white">
            <div>{weatherData.weather[0].description}</div>
            <div className="mt-1">
              <span className="text-sm">
                <i className="far fa-long-arrow-up"></i>
              </span>
              <span className="text-sm font-light text-gray-500">{`${weatherData.main.temp_max}${unitIcon}`}</span>
            </div>
            <div>
              <span className="text-sm">
                <i className="far fa-long-arrow-down"></i>
              </span>
              <span className="text-sm font-light text-gray-500">{`${weatherData.main.temp_min}${unitIcon}`}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-6 text-white pb-4">
          <div className="flex flex-col items-center ">
            <div className="font-medium text-sm">Wind Speed</div>
            <div className="text-sm text-gray-500">{`${weatherData.wind.speed} k/h`}</div>
            
          </div>
          <div className="flex flex-col items-center">
             <div className="font-medium text-sm">Humidity</div>
            <div className="text-sm text-gray-500">{`${weatherData.main.humidity}%`}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Wind Direction</div>
            <div className="text-sm text-gray-500">{windDirection}</div>
          </div>
        </div>
      </div>
       )}
         </div>
       </div>
      )}
   
    </>
  );
};

export default WeatherCard;
