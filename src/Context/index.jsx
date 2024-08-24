import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

// Create a context for state management
const StateContext = createContext();

// Context provider component
export const StateContextProvider = ({ children }) => {
    // State variables to manage weather data, location, unit, etc.
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [city, setCity] = useState('Ambala');
    const [thisLocation, setLocation] = useState('');
    const [unit, setUnit] = useState('C'); // Temperature unit, default to Celsius

    // Function to fetch weather data from the API
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: import.meta.env.VITE_API_URL, // API URL from environment variables
            params: {
                aggregateHours: '24',
                location: city,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY, // API key from environment variables
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST // API host from environment variables
            }
        };

        try {
            // Make an API request using axios
            const response = await axios.request(options);
            // Extract data from the response
            const data = Object.values(response.data.locations)[0];

            // Update state with the fetched data
            setLocation(data.address);
            setValues(data.values);
            setWeather(data.values[0]);
        } catch (e) {
            console.error(e); // Log any errors
            alert('This location does not exist'); // Alert user if location is invalid
        }
    };

    // Function to toggle temperature unit between Celsius and Fahrenheit
    const toggleUnit = (unit) => {
        const newUnit = unit === 'C' ? 'F' : 'C';
        setUnit((prev) => prev === unit ? newUnit : unit);
    };

    // Fetch weather data whenever the city changes
    useEffect(() => {
        fetchWeather();
    }, [city]);

    // Helper function to convert Celsius to Fahrenheit
    const convertCelsiusToFahrenheit = (celsius) => {
        return (celsius * 9/5) + 32;
    };

    // Function to display temperature based on the selected unit
    const displayTemperature = (temp = 20) => {
        if (unit === 'C') {
            return `${temp.toFixed(1)}`;
        } else {
            return `${convertCelsiusToFahrenheit(temp).toFixed(1)}`;
        }
    };

    return (
        // Provide the state and functions to the rest of the application
        <StateContext.Provider value={{
            fetchWeather,
            weather,
            setCity,
            values,
            thisLocation,
            city,
            toggleUnit,
            unit,
            convertCelsiusToFahrenheit,
            displayTemperature
        }}>
            {children} {/* Render child components */}
        </StateContext.Provider>
    );
};

// Custom hook to use the state context in other components
export const useStateContext = () => useContext(StateContext);
