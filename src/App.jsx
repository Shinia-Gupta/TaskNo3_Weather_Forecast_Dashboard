import { useState } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import { AppBackground, WeatherCard, ForecastCard,WeekCardList,WeatherHighlights } from './Components'

function App() {

  const { weather, thisLocation, values, setCity } = useStateContext()
  // console.log(weather)

  const submitCity = (input) => {
    setCity(input)
  }

  return (
    <div className='w-full h-screen text-gray-800 px-8  '>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl text-gray-700'>Weather Forecast</h1>
      </nav>
      <AppBackground/>
      <main className='w-full md:glassCard flex flex-col lg:flex-row  py-4 px-[2%] gap-2'>
       <div>
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
<div className='flex flex-col'>
<WeekCardList/>
<WeatherHighlights/>
</div>
      </main>
    </div>
  )
}

export default App
