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
      <main className='w-full flex flex-col lg:flex-row py-4 px-[2%] gap-2'>
        <div>
          {/* WeatherCard component displaying weather information */}
          <WeatherCard
            city={thisLocation}            
            windspeed={weather.wspd}        
            humidity={weather.humidity}     
            temperature={weather.temp}      
            heatIndex={weather.heatindex}   
            iconString={weather.conditions} 
            conditions={weather.conditions} 
            submitCity={submitCity}         
            setCity={setCity}               
            rainPercentage={weather.pop}    
          />
        </div>
        <div className='flex flex-col glassCard p-4'>
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
