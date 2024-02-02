import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import ForecastIconChanger from "../helpers/ForecastIconChanger";
import formatDate from "../helpers/dateFormat";
import fahrenheitToCelsius from "../helpers/TempConverter";
const ForecastCard = ({ fiveDayData, loading, unit }) => {
  const unitIcon = unit == "imperial" ? "°F" : "°C";

  return (
    <>
      {fiveDayData && !loading && (
        <div className="flex flex-row  flex-wrap gap-b-12 lg:gap-x-3 mt-8  dark:text-gray-400">
          {fiveDayData.slice(1).map((data, index) => (
            <div className="flex flex-col items-center space-y-1" key={index}>
              <span className="uppercase">{formatDate(data.date)}</span>
              <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-white-400 h-24 w-24">
                {ForecastIconChanger(data.weatherDescription)}
              </div>
              {unit === "metric" ? (
                <span>{`${fahrenheitToCelsius(data.avgTemperature).toFixed(
                  2
                )} ${unitIcon}`}</span>
              ) : (
                <span>{`${data.avgTemperature.toFixed(2)} ${unitIcon}`}</span>
              )}

              <div className="flex flex-col items-center pr-8 mr-3 ml-3 pl-8 justify-between">
                <span>{data.weatherDescription}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ForecastCard;
