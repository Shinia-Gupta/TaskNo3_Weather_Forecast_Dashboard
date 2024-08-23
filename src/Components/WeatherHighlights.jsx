import React, { useEffect } from "react";
import { useStateContext } from "../Context";

function WeatherHighlights() {
  const { weather, unit, fetchWeather, displayTemperature } = useStateContext();
  useEffect(() => {
    fetchWeather();
  }, []);

  // Helper functions to determine text based on values
  const getHumidityStatus = (humidity) => {
    if (humidity < 30) return "Low 🟢";
    if (humidity < 60) return "Normal 👍";
    return "High 🔴";
  };

  const getVisibilityStatus = (visibility) => {
    if (visibility > 10) return "Excellent 🌟";
    if (visibility > 5) return "Good 😊";
    return "Average 😐";
  };

  const getAirQualityStatus = (airQuality) => {
    if (airQuality <= 50) return "Good 🟢";
    if (airQuality <= 100) return "Moderate 🟡";
    if (airQuality <= 150) return "Unhealthy for Sensitive Groups 🟠";
    if (airQuality <= 200) return "Unhealthy 🔴";
    return "Very Unhealthy ⚠️";
  };

  const getUVIndexText = (uvindex) => {
    if (uvindex <= 2) return "Low 🌤";
    if (uvindex > 2 && uvindex <= 5) return "Moderate ☀️";
    if (uvindex > 5 && uvindex <= 7) return "High 🌞";
    if (uvindex > 7 && uvindex <= 10) return "Very High 🕶️";
    if (uvindex > 10) return "Extreme 🚨";
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold uppercase mb-6 text-gray-700">
        Today's Highlights
      </h2>

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 font-semibold">
        {/* UV Index */}
        <div className="glassCard p-6 rounded-lg shadow-lg flex flex-col ">
          <h3 className="text-sm mb-2">UV Index</h3>
          <div className="w-20 h-20 flex ">
            <span className="absolute text-3xl font-semibold text-gray-800">
              {weather.uvindex}
            </span>
          </div>
          <p className="text-sm mt-2">{getUVIndexText(weather.uvindex)}</p>
        </div>

        {/* Wind Status */}
        <div className="glassCard p-6 rounded-lg shadow-lg">
          <h3 className="text-sm mb-2">Wind Status</h3>
          <p className="text-3xl font-semibold mb-2">
            {weather?.wspd?.toFixed(2)}&nbsp;
            <span className="text-[1rem]">km/h</span>{" "}
          </p>
          <p className="text-sm text-gray-600">
            Wind Direction - {weather.wdir}°
          </p>
        </div>

        {/* Max & Min Temperature */}
        <div className="glassCard p-6 rounded-lg shadow-md flex flex-col ">
          <h3 className="text-sm">Max & Min Temperature</h3>
          <div className="flex flex-col justify-between mt-2">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-[2.5rem] w-[2.5rem] text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                  clipRule="evenodd"
                />
              </svg>

              <div>
                <p className="text-3xl">
                  {displayTemperature(weather?.maxt)}&nbsp;
                  <span className="text-[1rem]">°{unit}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-[2.5rem] w-[2.5rem] text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-3xl">
                  {displayTemperature(weather?.mint)}&nbsp;
                  <span className="text-[1rem]">°{unit}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="glassCard p-6 rounded-lg shadow-lg">
          <h3 className="text-sm mb-2">Humidity</h3>
          <p className="text-3xl font-semibold mb-2">
            {weather.humidity}&nbsp;<span className="text-[1rem]">%</span>
          </p>
          <p className="text-sm text-gray-600">
            {getHumidityStatus(weather.humidity)}
          </p>
        </div>

        {/* Visibility */}
        <div className="glassCard p-6 rounded-lg shadow-lg">
          <h3 className="text-sm mb-2">Visibility</h3>
          <p className="text-3xl font-semibold mb-2">
            {weather?.visibility?.toFixed(1)}{" "}
            <span className="text-[1rem]">km</span>
          </p>
          <p className="text-sm text-gray-600">
            {getVisibilityStatus(weather.visibility)}
          </p>
        </div>

        {/* Air Quality */}
        <div className="glassCard p-6 rounded-lg shadow-lg">
          <h3 className="text-sm mb-2">Air Quality</h3>
          <p className="text-3xl font-semibold mb-2">
            {weather?.severerisk || 105}
          </p>
          <p className="text-sm text-gray-600">
            {getAirQualityStatus(weather.severerisk || 105)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherHighlights;
