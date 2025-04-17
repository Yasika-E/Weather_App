import React, { useContext, useRef } from 'react';
import { MyContext } from './WeatherDetails';
import moment from 'moment';

const Fivedays_Forecast = () => {
  const { forecastdata, data, handleClick } = useContext(MyContext);
  const forecastRef = useRef(null);

  const groupForecastByDay = (data) => {
    const groupedData = {};
    data.list.forEach(item => {
      const date = moment(item.dt_txt).format('YYYY-MM-DD');
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  };

  const forecastDataByDay = forecastdata ? groupForecastByDay(forecastdata) : null;

  const scroll = (direction) => {
    if (forecastRef.current) {
      const { scrollLeft, clientWidth } = forecastRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      forecastRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className='fivedays-forecast'>
      <button className='back' onClick={handleClick}>Back</button>
      <div className='city-info-fivedays'>
        <h1>{data.name}</h1>
      </div>
      {forecastDataByDay && Object.entries(forecastDataByDay).map(([dayKey, dayData], index) => (
        <div key={index}>
          <h2>{moment(dayKey).format('dddd, MMMM Do YYYY')}</h2>
          <div className={`fiveday-hour-forecast-container ${dayData.length > 5 ? 'scrollable' : ''}`}>
            <button className='scroll-button scroll-button-left' onClick={() => scroll('left')}>◀</button>
            <div className='fiveday-hour-forecast' ref={forecastRef}>
              {dayData.map((item, index) => (
                <div key={index} className='fiveday-hour-item'>
                  <p>Time: {moment(item.dt_txt).format('h:mm A')}</p>
                  <p>Temperature: {Math.round(item.main.temp - 273.15)}&deg;C</p>
                  <p>Humidity: {item.main.humidity}%</p>
                  <p>{item.weather[0].description}</p>
                  <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                </div>
              ))}
            </div>
            <button className='scroll-button scroll-button-right' onClick={() => scroll('right')}>▶</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fivedays_Forecast;
