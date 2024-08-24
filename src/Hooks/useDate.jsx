import { useEffect, useState } from "react";

// Custom hook to get the current date and time, updating every minute
export const useDate = () => {
  const locale = "en"; // Locale for formatting date and time
  const [today, setDate] = useState(new Date()); // State to hold the current date and time

  useEffect(() => {
    // Set up a timer to update the date and time every minute
    const timer = setInterval(() => {
      setDate(new Date()); // Update the state with the current date and time
    }, 60 * 1000); // Update interval: 1 minute

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);
  // Format the day of the week (e.g., Monday)
  const day = today.toLocaleDateString(locale, { weekday: "long" });

  // Format the full date string (e.g., Monday, 23, August)
  const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;

  // Format the time string (e.g., 12:45 PM)
  const time = today.toLocaleDateString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  // Return the formatted date and time as an object
  return {
    date,
    time,
  };
};
