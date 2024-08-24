import React, { useEffect, useState } from "react";
import { useDate } from "../Hooks/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import "../index.css";
import { useStateContext } from "../Context";

const WeatherCard = ({
  temperature,
  city,
  heatIndex,
  iconString,
  conditions,
  rainPercentage,
  submitCity,
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();
  const { displayTemperature, unit } = useStateContext();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes("thunder")) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className=" w-full h-full lg:w-[25rem] glassSidebar text-gray-700 p-8 flex flex-col items-center font-bold">
      {/* Search Icon */}
      <div className="w-full flex justify-center items-center ">
        <div className="flex justify-center items-center text-gray-400 text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-[1.5rem] h-[1rem] text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                // submit the form
                submitCity(input);
                setInput("");
              }
            }}
            type="text"
            placeholder="Search for places ..."
            className=" bg-transparent border-b-2 border-gray-400 p-1 pl-4 text-[1rem] text-black w-full outline-none ml-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      {/* Weather Icon and Temperature */}
      <div className="flex flex-col items-center justify-center mt-10">
        <img src={icon} alt="weather_icon" className="w-24 h-24" />
        <p className="font-bold text-6xl mt-4">
          {displayTemperature(temperature)} &deg;{unit}
        </p>
      </div>

      {/* Location */}
      <div className="w-full mt-4">
        <p className="text-center text-3xl font-bold mt-2">{city}</p>
      </div>

      {/* Date and Time */}
      <div className="mt-4 text-center ">
        <p className="text-xl">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </p>
        <p className="text-lg text-gray-500 ">{time}</p>
      </div>

      {/* Weather Conditions */}
      <div className="mt-4 text-center ">
        <p className="text-xl ">{conditions}</p>
        <p className="text-lg mt-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block text-gray-700"
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 30 30"
          >
            <path
              fill="currentColor"
              d="M4.64 16.91c0-1.15.36-2.17 1.08-3.07a4.82 4.82 0 0 1 2.73-1.73c.31-1.36 1.02-2.48 2.11-3.36s2.34-1.31 3.75-1.31c1.38 0 2.6.43 3.68 1.28s1.78 1.95 2.1 3.29h.32c.89 0 1.72.22 2.48.65s1.37 1.03 1.81 1.78s.67 1.58.67 2.47c0 .88-.21 1.69-.63 2.44s-1 1.35-1.73 1.8s-1.53.69-2.4.71c-.13 0-.2-.06-.2-.17v-1.33c0-.12.07-.18.2-.18c.85-.04 1.58-.38 2.18-1.02s.9-1.39.9-2.26s-.33-1.62-.98-2.26s-1.42-.96-2.31-.96h-1.61c-.12 0-.18-.06-.18-.17l-.08-.58a4.08 4.08 0 0 0-1.39-2.71c-.82-.73-1.76-1.09-2.85-1.09s-2.05.36-2.85 1.09a4.02 4.02 0 0 0-1.36 2.71l-.07.53c0 .12-.07.19-.2.19l-.53.03c-.83.1-1.53.46-2.1 1.07s-.85 1.33-.85 2.16c0 .87.3 1.62.9 2.26s1.33.98 2.18 1.02c.11 0 .17.06.17.18v1.33c0 .11-.06.17-.17.17c-1.34-.06-2.47-.57-3.4-1.53s-1.37-2.1-1.37-3.43m5.35 6.69c0-.04.01-.11.04-.2l1.63-5.77a.837.837 0 0 1 1.02-.56c.24.04.42.17.54.37s.15.42.08.67l-1.63 5.73c-.12.43-.4.64-.82.64c-.04 0-.07-.01-.11-.02c-.06-.02-.09-.03-.1-.03a.83.83 0 0 1-.49-.33a.9.9 0 0 1-.16-.5m2.62 2.81l2.44-8.77c.04-.19.14-.34.3-.44s.32-.15.49-.15q.135 0 .27.03c.22.06.38.19.49.39s.13.41.07.64l-2.43 8.78c-.04.17-.13.31-.29.43s-.32.18-.51.18c-.09 0-.18-.02-.25-.05c-.2-.05-.37-.18-.52-.39c-.11-.18-.13-.39-.06-.65m4.13-2.79c0-.04.01-.11.04-.23l1.63-5.77a.83.83 0 0 1 .3-.44c.15-.1.3-.15.46-.15c.08 0 .17.01.26.03c.21.06.36.16.46.31s.15.31.15.47c0 .03-.01.08-.02.14s-.02.1-.02.12l-1.63 5.73c-.04.19-.13.35-.28.46s-.32.17-.51.17l-.24-.05a.8.8 0 0 1-.46-.32a.9.9 0 0 1-.14-.47"
            ></path>
          </svg>{" "}
          Rain - {rainPercentage}%
        </p>
      </div>

      {/* Heat Index  */}
      <div className="mt-4 text-center ">
        <p className="text-xl ">Heat Index</p>
        <p className="text-lg mt-2 text-gray-500"> {heatIndex!==null?heatIndex:"No Data Available"}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
