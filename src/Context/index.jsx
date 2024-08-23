import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [city, setCity] = useState('Ambala')
    const [thisLocation, setLocation] = useState('')
const [unit,setUnit]=useState('C');
   
    //fetch api
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: import.meta.env.VITE_API_URL,
            params: {
                aggregateHours: '24',
                location: city,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
            }
        }

        try {
            const response = await axios.request(options);
            console.log(response.data)
            const data = Object.values(response.data.locations)[0]
            
            
            setLocation(data.address)
            setValues(data.values)
            setWeather(data.values[0])
        } catch (e) {
            console.error(e);
            alert('This location does not exist')
        }
    }

    const toggleUnit=(unit)=>{
        const newUnit=unit==='C'?'F':'C';
        setUnit((prev)=>prev===unit?newUnit:unit);
    }
    useEffect(() => {
        fetchWeather()
    }, [city])

    // useEffect(() => {
    //     console.log(values)
    // }, [values])
    
    const convertCelsiusToFahrenheit=(celsius)=> {
        return (celsius * 9/5) + 32;
    }

    const displayTemperature = (temp=20) => {
        if (unit === 'C') {
            return `${temp.toFixed(1)}`;
        } else {
            return `${convertCelsiusToFahrenheit(temp).toFixed(1)}`;
        }
    };

    return (
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
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)