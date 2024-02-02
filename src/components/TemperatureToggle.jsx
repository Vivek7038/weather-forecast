import React, { useState, useEffect } from "react";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";

const TemperatureToggle = ({ toggleUnit, unit }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [toggle, setToggle] = useState(true);
  const toggleClass = " transform translate-x-5";
  return (
    <>
      <div className="flex items-center pb-4">
       {isCelsius ? <RiCelsiusFill /> : <RiFahrenheitFill />}
        <div
          className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
            toggleUnit()
            setIsCelsius(!isCelsius)
          }}
        >
          <div
            className={
              "bg-black md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? null : toggleClass)
            }
          ></div>
        </div>
      </div>
    </>
  );
};

export default TemperatureToggle;
