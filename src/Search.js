import React, { useContext} from 'react';
import { MyContext } from './WeatherDetails';
import moment from 'moment'; // Import the CSS file
import { Link } from 'react-router-dom';

const Search = () => {
  const { data,fetchData } = useContext(MyContext);

  const getDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.floor((degree % 360) / 45)];
  };
 
  return (
    <div className='search-layout'>
      {data && (
        <div className='container'>
          <p className='degree'>{Math.round(data.main.temp - 273.15)}&deg;C</p>
          <div className='city-info'>
            <h1>{data.name}, {data.sys.country}</h1>
          </div>
          <div className='weather-info'>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
            <p>Wind Direction: {getDirection(data.wind.deg)}</p>
            <ul>
              {data.weather.map((weather, index) => (
                <li key={index}>
                  <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
                  <p>{weather.description}</p>
                </li>
                
              ))}
            </ul>
           
          </div>
        </div>
      )}

    </div>
  );
};

export default Search;
