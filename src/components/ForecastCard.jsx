import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
const ForecastCard = () => {
  return (
    <>
      <div className="flex flex-row  flex-wrap gap-b-12 lg:gap-x-3 mt-8  dark:text-gray-400">
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">2 Feb</span>
                  <TiWeatherPartlySunny className="w-[60px] h-[60px]"/>

          <span>11°</span>
          <div className="flex flex-col items-center pr-8 mr-3 ml-3 pl-8 justify-between">
              <span>rainy day</span>
       </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">2 Feb</span>
                 <TiWeatherPartlySunny className="w-[60px] h-[60px]"/>

          <span>17°</span>
         <div className="flex flex-col items-center pr-8 mr-3 ml-3 pl-8 justify-between">
              <span>rainy day</span>
       </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">2 Feb</span>
                   <TiWeatherPartlySunny className="w-[60px] h-[60px]"/>

          <span>8°</span>
          <div className="flex flex-col items-center pr-8 mr-3 ml-3 pl-8 justify-between">
              <span>rainy day</span>
       </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">2 Feb</span>
                 <TiWeatherPartlySunny className="w-[60px] h-[60px]"/>
          <span>-2°</span>
          <div className="flex flex-col items-center pr-8 mr-3 ml-3 pl-8 justify-between">
              <span>rainy day</span>
       </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="uppercase">2 Feb</span>
          <TiWeatherPartlySunny className="w-[60px] h-[60px]"/>
          <span>4°</span>
       <div className="flex flex-col items-center pr-8 mr-3 ml-3 pl-8 justify-between">
              <span>rainy day</span>
       </div>
        </div>
      </div>
    </>
  );
};

export default ForecastCard;
