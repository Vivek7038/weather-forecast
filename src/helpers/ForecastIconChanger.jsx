import React from "react";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
  BsSnow,
} from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";

const ForecastIconChanger = (weather) => {
       let iconElement;
       let iconColor="";
  switch (weather) {
    case "light rain":
      iconElement = <BsFillCloudRainFill />;
      iconColor = "#272829";
      break;

    case "clear sky":
      iconElement = <BsFillSunFill />;
      iconColor = "#ffce00";
      break;

    case "few clouds":
      iconElement = <BsCloudyFill />;
      iconColor = "#5b89a4";
      break;

    case "Moderate Snow":
      iconElement = <BsSnow />;
      iconColor = "#62929d";
      break;

    case "Light Snow":
      iconElement = <BsSnow />;
      iconColor = "#62929d";
      break;

    default:
      iconElement = <TiWeatherPartlySunny />;
      iconColor = "#ccbd33";
  }

  return (
    <span className="icon" style={{ color: iconColor }}>
      {iconElement}
    </span>
  );
};

export default ForecastIconChanger;