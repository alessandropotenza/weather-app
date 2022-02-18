import React, { useState } from 'react';
import './index.css';
import SearchIcon from '@mui/icons-material/Search';
import Clear from './assets/sunny.jpg';
import Cloudy from './assets/cloudy.jpg';
import Rain from './assets/rain.jpg';
import Snow from './assets/snowing.jpg';
import Haze from './assets/haze.jpg';
import Thunderstorm from './assets/thunderstorm.jpg';
import Default from './assets/default.jpg';

const apiKey = '61f531d06489d307dfb36dc024855c88'; //used for github demonstration only

function App() {
  const [cityInput, setCityInput] = useState('');
  const [locationInfo, setLocationInfo] = useState({});

  const doFetch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(result => setLocationInfo({
      cityName: result.name,
      temp: result.main.temp,
      tempLow: result.main.temp_min,
      tempHigh: result.main.temp_max,
      condition: result.weather[0].main,
      description: result.weather[0].description,
      country: result.sys.country
    }));
    setCityInput('');
  };

  const enterSearch = e => {
    if(e.key === "Enter") {
      doFetch();
    }
  }

  return (
    <div className='app' style= {
          locationInfo.condition === 'Clear' ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${Clear})`}
        : locationInfo.condition === 'Rain' ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${Rain})`}
        : locationInfo.condition === 'Snow' ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${Snow})`}
        : locationInfo.condition === 'Haze' ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${Haze})`}
        : locationInfo.condition === 'Thunderstorm' ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${Thunderstorm})`}
        : locationInfo.condition === 'Clouds' ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${Cloudy})`}
        : {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0)), url(${Default})`}
      }>
        {Object.keys(locationInfo).length === 0 ?
          <>
            <div className='welcome-message'>
              <p>Find your local weather</p>
            </div>
          </>
         :
         <>
          <div className='top-box'>
            <div className='left-box'>
              <p className='location'>{locationInfo.cityName}, {locationInfo.country}</p>
              <p className='description'>{locationInfo.description}</p>
            </div>
            <div className='right-box'>
              <p className='temp'>{Math.round(locationInfo.temp)}°C</p>
              <div className='high-low-container'>
                <p className='temp-low'>{Math.round(locationInfo.tempLow)}</p>
                <div className='line-container'>
                  <div className='line'>
                  </div>
                </div>
                <p className='temp-high'>{Math.round(locationInfo.tempHigh)}</p>
              </div>
            </div>
          </div>
         </>
        }
        <div className='search-block'>
          <input type='text' className='search-space' placeholder='Enter your city...' onKeyPress={enterSearch} value={cityInput} onChange={e => setCityInput(e.target.value)}/>
          <SearchIcon className='search-button' onClick={doFetch} fontSize='large'/>
        </div>
    </div>
  );
}

export default App;
