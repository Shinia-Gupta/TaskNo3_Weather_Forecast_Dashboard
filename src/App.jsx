import './App.css'
import { useStateContext } from './Context'
import { AppBackground, WeatherCard, WeekCardList, WeatherHighlights } from './Components'

function App() {

  // Destructure context values: weather data, location, and setCity function
  const { weather, thisLocation, setCity } = useStateContext()

  // Function to update the city in the context when the user submits a new city
  const submitCity = (input) => {
    setCity(input)
  }

  return (
    // Main container for the app with full width and height, applying styles from Tailwind CSS
    <div className='w-full h-screen text-gray-800 px-8'>
      {/* Navigation bar at the top */}
      <nav className='w-full p-3 flex justify-between items-center'>
        {/* App title */}
        <h1 className='font-bold tracking-wide text-3xl text-gray-700'>Weather Forecast</h1>
      </nav>

      {/* Background component to render the app's background */}
      <AppBackground />

      {/* Main content area with a responsive layout using flexbox */}
      <main className='w-full md:glassCard flex flex-col lg:flex-row py-4 px-[2%] gap-2'>
        <div>
          {/* WeatherCard component displaying weather information */}
          <WeatherCard
            city={thisLocation}            // Location name
            windspeed={weather.wspd}        // Wind speed
            humidity={weather.humidity}     // Humidity level
            temperature={weather.temp}      // Current temperature
            heatIndex={weather.heatindex}   // Heat index
            iconString={weather.conditions} // Weather icon based on conditions
            conditions={weather.conditions} // Weather conditions description
            submitCity={submitCity}         // Function to handle city submission
            setCity={setCity}               // Function to update the city
            rainPercentage={weather.pop}    // Chance of rain
          />
        </div>
        <div className='flex flex-col'>
          {/* WeekCardList component displaying a 7-day forecast */}
          <WeekCardList />

          {/* WeatherHighlights component displaying additional weather highlights */}
          <WeatherHighlights />
        </div>
      </main>
    </div>
  )
}

export default App
