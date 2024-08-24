import React from "react";
import { useStateContext } from "../Context";
import ForecastCard from "./ForecastCard";

function WeekCardList() {
  // Destructure values, unit, and toggleUnit from the context
  const { values, unit, toggleUnit } = useStateContext();

  return (
    <div className="flex flex-col text-gray-700 items-center gap-4 rounded-r-3xl border-l-white bg-transparent">
      
      {/* Header with Week title and Unit Toggle */}
      <div className="flex justify-between w-full px-4 py-2">
        <h2 className="text-xl font-bold">WEEK</h2>
        <div className="flex items-center gap-2">
          {/* Button to toggle temperature unit to Celsius */}
          <button
            onClick={() => toggleUnit("C")}
            className={`px-2 py-1 rounded-full ${
              unit === "C" ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
          >
            °C
          </button>
          {/* Button to toggle temperature unit to Fahrenheit */}
          <button
            onClick={() => toggleUnit("F")}
            className={`px-2 py-1 rounded-full ${
              unit === "F" ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 xl:grid-cols-6">
        {/* Display the next 6 days of forecast data */}
        {values?.slice(1, 7).map((curr) => {
          return (
            <ForecastCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WeekCardList;
