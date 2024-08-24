import React, { useEffect, useState } from "react";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import { useStateContext } from "../Context";

const ForecastCard = ({ time, temp, iconString }) => {
  // State to manage the weather icon
  const [icon, setIcon] = useState();
  const { unit, displayTemperature } = useStateContext();

  useEffect(() => {
    // Update the icon based on the iconString value
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
      } else {
        setIcon(wind); // Default icon if no match found
      }
    }
  }, [iconString]);

  return (
    <div className="glassCard xs:w-[10rem] lg:w-[8rem] h-[12rem] p-4">
      <p className="text-center">
        {/* Display day of the week from the time prop */}
        {
          new Date(time)
            .toLocaleTimeString("en", { weekday: "long" })
            .split(" ")[0]
        }
      </p>
      <hr />
      <div className="w-full flex justify-center items-center flex-1">
        {/* Display the weather icon */}
        <img
          src={icon}
          alt="forecast not available"
          className="w-[4rem] h-[4rem]"
        />
      </div>
      <p className="text-center font-bold">
        {/* Display the temperature with the appropriate unit */}
        {displayTemperature(temp)}&deg;{unit}
      </p>
      <div className="h-[1.5rem]">
        {/* Display the icon description */}
        <p className="w-full text-sm text-center text-blue-800 font-semibold">
          {iconString}
        </p>
      </div>
    </div>
  );
};

export default ForecastCard;
